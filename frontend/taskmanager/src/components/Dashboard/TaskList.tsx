import React from "react";
import api from "../../services/api";

const TaskList = ({ tasks, fetchTasks }: any) => {
  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <ul>
      {tasks.map((task: any) => (
        <li key={task.id}>
          {task.title} - {task.status}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
