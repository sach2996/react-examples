import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/user";
import axios from "axios";
import { tokenAtom } from "../store/token";
import { useNavigate } from "react-router-dom";
import config from "../../../../config";
function Login() {
  const navigate = useNavigate();

  const setUser = useSetRecoilState(userAtom);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useSetRecoilState(tokenAtom);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Validate input

    try {
      const response = await axios.post(`${config.backendUrl}/api/auth/login`, {
        username: username,
        password,
      });
      setToken(response.data.user.token);
      setUser(response.data.user.user);
      localStorage.setItem("token", response.data.user.token);
      localStorage.setItem("user", response.data.user.user);
      localStorage.setItem("username", response.data.user.user.username);
      localStorage.setItem("firstname", response.data.user.user.firstname);
      localStorage.setItem("lastname", response.data.user.user.lastname);
      // Store the token (e.g., using localStorage or a state management library)
      // Redirect to the login page or another appropriate route
      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle errors (e.g., display an error message)
    }
  };

  function redirectToSignup() {
    navigate("/signup");
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
          <button type="submit">Login</button>
        </div>
      </form>
      <div>
        New to Splitexpense{" "}
        <button onClick={redirectToSignup}>Register Here</button>
      </div>
    </div>
  );
}

export default Login;
