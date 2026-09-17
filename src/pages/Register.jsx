import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useAuthContext } from "../hooks/useAuthContext";

function Register() {
  const { user, loading, register } = useAuthContext();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const fields = [
    {
      id: "displayName",
      label: "Display Name",
      type: "text",
      value: displayName,
      onChange: (event) => setDisplayName(event.target.value),
      required: true,
      minLength: 2,
      maxLength: 80,
    },
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
      minLength: 6,
    },
  ];

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const data = await register(email, password, displayName);

      if (data.session) {
        navigate("/");
      } else {
        setSuccess(
          "Registration successful. Please check your email to confirm your account.",
        );
      }
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
          <p className="auth-page__eyebrow">&gt;_ NEW USER</p>

          <h1>Create Your Account</h1>

          <p>Register to create and manage your blog posts.</p>
        </div>

        <AuthForm
          fields={fields}
          error={error}
          success={success}
          submitting={submitting}
          submitLabel="Register"
          submittingLabel="Creating Account..."
          onSubmit={handleSubmit}
        />

        <p className="auth-page__switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
