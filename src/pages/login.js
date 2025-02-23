import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../AuthContext";

const Login = () => {
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Get login function from AuthContext
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(""); // Reset errors

    try {
      const result = await loginUser({ username: data.username, password: data.password });

      if (result.token) {
        login(result.token); // ✅ Call login function to update auth state
        alert("Login Successful!");
        navigate("/profile");
      } else {
        throw new Error(result.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage(error.message);
      setError("username", { type: "manual", message: "Invalid username or password" });
      setError("password", { type: "manual", message: "Invalid username or password" });
    } finally {
      setLoading(false);
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
            <input type="text" className={`form-control ${errors.username ? "is-invalid" : ""}`}
              {...register("username", { required: "Username is required" })} onChange={() => clearErrors("username")} />
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
          </div>

          {/* Password Field */}
          <div className="mb-2 d-flex justify-content-between">
            <label className="form-label">Password</label>
            <Link to="/forgot-password" className="text-primary small">Forgot password?</Link>
          </div>
          <div className="mb-3">
            <input type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              onChange={() => clearErrors("password")} />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          {/* Login Button with Loading State */}
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-3 p-3 bg-light rounded text-center border text-body">
          <span>New to TIME? </span>
          <Link to="/signup" className="text-primary">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
