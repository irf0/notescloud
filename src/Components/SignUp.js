import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        cpassword: credentials.cpassword,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken); //->Saves the token in local storage and redirect
      navigate("/");
      props.showAlert("Signup Successfull", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            value={credentials.name}
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            value={credentials.email}
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={credentials.password}
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            minLength={5}
            required
          />

          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            value={credentials.cpassword}
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={handleChange}
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
