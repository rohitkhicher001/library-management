import React, { useState, useEffect, useContext } from "react";
const Authorform = (props) => {
  const Authordata = {
    author: "",
  };

  const [values, setValues] = useState(Authordata);

  useEffect(() => {
    if (props.Currentid === "") {
      setValues({
        ...Authordata,
      });
    } else {
      setValues({
        ...props.Authorobj[props.Currentid],
      });
    }
  }, [props.Currentid, props.Authorobj]);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (values.author !== "") {
      props.add(values);
    } else {
      alert("Error: Empty fields");
    }
  };
  return (
    <form autoComplete="off" onSubmit={HandleSubmit}>
      <div className="form group">
        <input
          placeholder="author"
          name="author"
          value={values.author}
          onChange={HandleChange}
        />

        <div />
      </div>
      <div>
        <input
          type="submit"
          value={props.Currentid === "" ? "Save" : "Update"}
        />
      </div>
    </form>
  );
};

export default Authorform;
