import React, { useState, useEffect } from "react";
import Bookform from "./Bookform";
import firebasedb from "../firebase";
import "./Bookform.css";

import { Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ButtonBase } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Books = () => {
  const [Bookobj, setBookobj] = useState({});
  const [Currentid, setCurrentid] = useState("");
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  useEffect(() => {
    firebasedb.child("books").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setBookobj({
          ...snapshot.val(),
        });
      } else {
        setBookobj({});
      }
    });
  }, []);

  const add = (obj) => {
    if (Currentid === "")
      firebasedb.child("books").push(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentid("");
        }
      });
    else
      firebasedb.child(`books/${Currentid}`).set(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentid("");
        }
      });
  };

  const onDelete = (key) => {
    if (window.confirm("Delete this Book?")) {
      firebasedb.child(`books/${key}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentid("");
        }
      });
    } else {
    }
  };

  const classes = useStyles();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className="row">
            <Typography variant="p" align="center" className="col-4">
              <strong>Email:</strong> {currentUser.email}
            </Typography>
            {error && <Alert variant="danger">{error}</Alert>}

            <Link to="/update-profile" className="text-light col-1">
              UpdateProfile
            </Link>
            <Typography
              variant="h6"
              className={classes.title}
              align="center"
              className="col-6"
            >
              Books Register
            </Typography>
            <div className="col-1">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-light"
              >
                LogOut
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-10">
          <Bookform {...{ add, Currentid, Bookobj }} />
        </div>
        <div className="col-lg-8 col-md-12 col-sm-12">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ISBN</TableCell>
                  <TableCell align="right">Book Name</TableCell>
                  <TableCell align="right">Author</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(Bookobj).map((id) => {
                  return (
                    <TableRow key={id}>
                      <TableCell align="right">{Bookobj[id].ISBN}</TableCell>
                      <TableCell align="right">
                        {Bookobj[id].bookName}
                      </TableCell>
                      <TableCell align="right">{Bookobj[id].author}</TableCell>
                      <TableCell align="right">
                        {Bookobj[id].quantity}
                      </TableCell>

                      <TableCell align="right">
                        <EditIcon
                          onClick={() => {
                            setCurrentid(id);
                          }}
                        />

                        <DeleteIcon
                          onClick={() => {
                            onDelete(id);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Books;
