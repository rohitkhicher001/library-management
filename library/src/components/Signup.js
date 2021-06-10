import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "bootstrap";
import "./signup.css";
import { Card } from "@material-ui/core";

function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();

  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmpasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit} className="signupform">
        <Form.Group id="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" ref={nameRef} required />
        </Form.Group>
        <Form.Group id="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" ref={phoneRef} required />
        </Form.Group>

        <Form.Group id="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>
        <Form.Group id="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} required />
        </Form.Group>

        <Form.Group id="confirmpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" ref={confirmpasswordRef} required />
        </Form.Group>
        <button
          disabled={loading}
          className="btn btn-primary w-100 mt-4"
          type="submit"
        >
          Signup
        </button>
      </Form>
    </div>
  );
}
export default Signup;
