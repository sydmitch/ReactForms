import { useState } from "react"

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.length < 8) {
      setValidationError("Username must be at least 8 characters long.")
      return;
    }
    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters long.")
      return;
    }
    setValidationError("");
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
          "Content-type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();
      console.log(result);
      setToken(result.token);
    } catch (error) {
      setError(error.message);
    };
  }

  return (
    <>
      <h2>Sign Up!</h2>
      {error && <p className="error">{error}</p>}
      {validationError && <p className="error">{validationError}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username: 
          <input 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </label>
        <label>
          Password: 
          <input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  )
}