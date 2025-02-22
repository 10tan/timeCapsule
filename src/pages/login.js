import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const result = await loginUser({ contact: data.username, password: data.password });

      if (result.token) {
        localStorage.setItem("token", result.token);
        alert("Login Successful!");
        navigate("../internal/Dashboard");
      } 
      else {
        throw new Error(result.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h5 className="text-center mb-3">Sign in to TIME</h5>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username/Email Field */}
          <div className="mb-3">
            <label className="form-label">Username or email address</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
          </div>

          {/* Password Field */}
          <div className="mb-2 d-flex justify-content-between">
            <label className="form-label">Password</label>
            <Link to="/forgot-password" className="text-primary small">Forgot password?</Link>
          </div>
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-success w-100">
            Sign in
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-3 text-center">
          <Link to="/passkey-login" className="text-primary d-block">Sign in with a passkey</Link>
        </div>
        <div className="mt-3 p-3 bg-light rounded text-center border">
          <span>New to TIME? </span>
          <Link to="/signup" className="text-primary">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
