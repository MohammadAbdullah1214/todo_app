import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await api.post("/auth/login", data);
      setToken(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} placeholder="Username" required />
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
