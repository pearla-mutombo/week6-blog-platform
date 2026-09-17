import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useAuthContext } from "../hooks/useAuthContext";

function Login() {
  const { user, loading, login } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const fields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      value: email,
      onChange: (event) => setEmail(event.target.value),
      required: true,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      value: password,
      onChange: (event) => setPassword(event.target.value),
      required: true,
    },
  ];

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (authError) {
      setError(authError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-page__card">
        <div className="auth-page__header">
          <p className="auth-page__eyebrow">&gt;_ AUTHENTICATION</p>

          <h1>Welcome Back</h1>

          <p>Log in to manage your blogs.</p>
        </div>

        <AuthForm
          fields={fields}
          error={error}
          submitting={submitting}
          submitLabel="Log In"
          submittingLabel="Logging in..."
          onSubmit={handleSubmit}
        />

        <p className="auth-page__switch">
          Need an account? <Link to="/register">Register</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
