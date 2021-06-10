import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Form } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
      marginLeft: "10ch",
    },
  },
}));
const Bookform = (props) => {
  const Bookdata = {
    ISBN: "",
    bookName: "",
    author: "",
    quantity: "",
  };

  const [values, setValues] = useState(Bookdata);

  useEffect(() => {
    if (props.Currentid === "") {
      setValues({
        ...Bookdata,
      });
    } else {
      setValues({
        ...props.Bookobj[props.Currentid],
      });
    }
  }, [props.Currentid, props.Bookobj]);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (
      values.ISBN !== "" &&
      values.bookName !== "" &&
      values.author !== "" &&
      values.quantity !== ""
    ) {
      props.add(values);
    } else {
      alert("Error: Empty fields");
    }
  };

  const classes = useStyles();

  return (
    <Form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={HandleSubmit}
    >
      <TextField
        id="outlined-basic"
        variant="outlined"
        type="text"
        inputmode="numeric"
        label="ISBN"
        name="ISBN"
        value={values.ISBN}
        onChange={HandleChange}
      />
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Book name"
        name="bookName"
        value={values.bookName}
        onChange={HandleChange}
      />
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="author"
        name="author"
        value={values.author}
        onChange={HandleChange}
      />
      <TextField
        id="outlined-basic"
        variant="outlined"
        type="text"
        inputmode="numeric"
        label="Quantity"
        name="quantity"
        value={values.quantity}
        onChange={HandleChange}
      />

      <div className={classes.root}>
        <Button
          variant="outlined"
          color="primary"
          onClick={HandleSubmit}
          className="m-3"
        >
          {props.Currentid === "" ? "Save" : "Update"}
        </Button>
      </div>
    </Form>
  );
};

export default Bookform;
