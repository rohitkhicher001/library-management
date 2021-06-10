import React, { useState, useEffect } from "react";
import Authorform from "./Authorform";
import firebasedb from "../firebase";
const Authors = () => {
  const [Authorobj, setAuthorobj] = useState({});
  const [Currentid, setCurrentid] = useState("");

  useEffect(() => {
    firebasedb.child("authors").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setAuthorobj({
          ...snapshot.val(),
        });
      } else {
        setAuthorobj({});
      }
    });
  }, []);

  const add = (obj) => {
    if (Currentid === "")
      firebasedb.child("authors").push(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentid("");
        }
      });
    else
      firebasedb.child(`authors/${Currentid}`).set(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentid("");
        }
      });
  };

  const onDelete = (key) => {
    if (window.confirm("Delete this Author?")) {
      firebasedb.child(`authors/${key}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentid("");
        }
      });
    } else {
    }
  };

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1>Author Register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <Authorform {...{ add, Currentid, Authorobj }} />
        </div>
        <div className="col-md-7">
          <table>
            <thead>
              <tr>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(Authorobj).map((id) => {
                return (
                  <tr key={id}>
                    <td>{Authorobj[id].author}</td>

                    <td>
                      <button
                        onClick={() => {
                          setCurrentid(id);
                        }}
                      >
                        edit
                      </button>
                      <button
                        onClick={() => {
                          onDelete(id);
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Authors;
