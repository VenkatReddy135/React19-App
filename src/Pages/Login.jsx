import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import UseForm from "../Hooks/UseForm";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const Validate = useCallback((name, value) => {
    if (!value) return `${name} is required`;
    if (name === "pass" && value.length < 6) return "Min 6 characters";
    return "";
  }, []);

  const initialValues = useMemo(() => ({ email: "", pass: "" }), []);
  const { Values, Errors, handleChange, handleReset } = UseForm(
    initialValues,
    Validate
  );

  const fakeLoginApi = (email, pass) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@example.com" && pass === "admin123")
          resolve(generateFakeJWT("admin", 1)); // userId = 1
        else if (email === "user@example.com" && pass === "user123")
          resolve(generateFakeJWT("user", 2)); // userId = 2
        else reject("Invalid credentials");
      }, 1000);
    });

  const generateFakeJWT = (role, userId) => {
    const payload = {
      email: `${role}@example.com`,
      role,
      userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
    };
    return (
      btoa(JSON.stringify({ typ: "JWT" })) +
      "." +
      btoa(JSON.stringify(payload)) +
      ".sig"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = Validate("email", Values.email);
    const passError = Validate("pass", Values.pass);
    if (emailError || passError) return;

    setLoading(true);
    setAuthError("");

    try {
      const token = await fakeLoginApi(Values.email, Values.pass);
      login(token);
      navigate("/list");
    } catch (err) {
      setAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-3">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    value={Values.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Email"
                  />
                  {Errors.email && (
                    <div className="text-danger">{Errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="pass"
                    value={Values.pass}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Password"
                  />
                  {Errors.pass && (
                    <div className="text-danger">{Errors.pass}</div>
                  )}
                </div>
                {authError && (
                  <div className="text-danger mb-2">{authError}</div>
                )}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>
              <div className="text-muted mt-3" style={{ fontSize: "0.9rem" }}>
                <strong>Admin:</strong> admin@example.com / admin123 <br />
                <strong>User:</strong> user@example.com / user123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
