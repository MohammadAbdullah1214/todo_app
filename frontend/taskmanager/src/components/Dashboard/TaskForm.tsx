import React from "react";
import { useForm } from "react-hook-form";
import api from "../../services/api";

interface TaskFormProps {
  fetchTasks: () => void;
}

const TaskForm = ({ fetchTasks }: TaskFormProps) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    await api.post("/tasks", data);
    fetchTasks();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="Task Title" required />
      <select {...register("status")} required>
        <option value="Pending">Pending</option>
        <option value="InProgress">InProgress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
