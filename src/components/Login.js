import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credential.email, password: credential.password }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      //save the auth token and redirect

      localStorage.setItem("token", json.authtoken);
      props.showAlert("Successfully Login", "success");
      history.push("/");
    } else {
      props.showAlert("Invalid credential", "warning");
    }
  };
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credential.email}
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={credential.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
