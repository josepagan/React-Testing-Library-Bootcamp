import React, { useState }from "react";
import "./App.css";

function App() {
  const handleChange = (e) => {
    console.log("fuck eslint now with double quotes", e.target);
  };
    const [state, setState] = useState({email:"",password:"", confirmPassword:""})
  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
            <input type="email" id="email" name="email" className="form-control" onChange={handleChange} />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
            <input type="password" id="password" name="password" className="form-control" onChange={handleChange} />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="form-control"
              onChange={handleChange}
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default App;
