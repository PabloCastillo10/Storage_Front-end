import React, {  useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./Login.css";
import { useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useLogin } from "../shared/hooks/useLogin";


export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  
  const { handleLogin, loginError } = useLogin();

  const location = useLocation();
  const message = location.state?.message;

  useEffect(() => {
    if (location.state?.message) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-background">
      <div
        className="dropdown-menu show p-4 rounded"
        style={{
          position: "static",
          display: "block",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          width: "100%",
          maxWidth: "400px"
        }}
      >
        {message && (
          <Alert severity="success" style={{ marginBottom: "1rem" }}>
            {message}
          </Alert>
        )}
        
       
        {loginError && (
        <Alert severity="error" style={{ marginBottom: "1rem" }}>
          {loginError}
        </Alert>
)}
        
        <form className="px-2 py-2" onSubmit={handleSubmit(handleLogin)} noValidate>
          <h3 className="text-center mb-4">Sign In</h3>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="email@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              placeholder="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="dropdownCheck" />
            <label className="form-check-label" htmlFor="dropdownCheck">Remember me</label>
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign in</button>
        </form>

        <hr style={{ background: 'black' }} />
        <Link className="dropdown-item text-black text-center" to="/register">
          New around here? Sign up
        </Link>
      </div>
    </div>
  );
}
