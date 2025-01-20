import { useForm } from "react-hook-form";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
  username: string;
  password: string;
}

const Register = () => {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await api.post("/auth/register", data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} placeholder="Username" required />
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
