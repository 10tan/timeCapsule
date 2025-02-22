import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const result = await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (result.success) {
        alert("Signup Successful! Welcome");
        navigate("../internal/Dashboard");
      } else {
        throw new Error(result.message || "Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h5 className="text-center mb-3">Create an Account</h5>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label">Password</label>
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

          {/* Signup Button */}
          <button type="submit" className="btn btn-success w-100">
            Sign up
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-3 text-center">
          <span>Already have an account? </span>
          <Link to="/login" className="text-primary">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
