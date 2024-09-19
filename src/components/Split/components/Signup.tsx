import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/user";
import axios from "axios";
import { tokenAtom } from "../store/token";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const setUser = useSetRecoilState(userAtom);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useSetRecoilState(tokenAtom);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Validate input

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          username: username,
          email: email,
          firstname: firstName,
          lastname: lastName,
          password,
        }
      );
      setToken(response.data.token);
      setUser(response.data);
      localStorage.setItem("token", response.data.token);
      // Store the token (e.g., using localStorage or a state management library)
      // Redirect to the login page or another appropriate route
      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle errors (e.g., display an error message)
    }
  };

  function redirectToLogin() {
    navigate("/login");
  }

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <div className="signup-form-item">
          <label htmlFor="username">Username</label>

          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="signup-form-item">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-item">
          <label htmlFor="firstName">First Name</label>

          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-item">
          <label htmlFor="lastName">Last Name</label>

          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-item">
          <label htmlFor="password">Password</label>

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-item">
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <div>
        Already a user <button onClick={redirectToLogin}>Login Here</button>
      </div>
    </div>
  );
}

export default Signup;
