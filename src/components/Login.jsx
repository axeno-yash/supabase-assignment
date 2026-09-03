import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login({ goToHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setMessage("");
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        goToHome();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleLogin}>
        <h1 className="auth__title">Sign In</h1>

        <div className="auth__field">
          <label className="auth__label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="input-tag"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth__field">
          <label className="auth__label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input-tag"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button type="submit" className="auth__button" disabled={isSubmitting}>
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
        {message && <p className="auth__message">{message}</p>}

        <button type="button" onClick={goToHome}>
          Back to Home
        </button>
      </form>
    </div>
  );
}
