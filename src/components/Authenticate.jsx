import { useState } from "react"

export default function Authenticate({ token }) {
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState(null)

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const result = await response.json();
      console.log(result);
      if (result.data && result.data.username) {
        setUsername(result.data.username)
      }

      setSuccessMessage(result.message)
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div className="auth-container">
      <h2>Authenticate</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      {username && <p className="username-display">Logged In User: {username}</p>}
      {error && <p className="error">{error}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </div>
  );
}