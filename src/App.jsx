import React, { useEffect, useState } from "react";
import List from "./components/List";
import Form from "./components/Form";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { api } from "./api/apiResoursce";
import uuid from "react-uuid";

const App = () => {
  const [task, setTask] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/todolist");

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data;
      setTask(data);
      
    } catch (error) {
      console.error("Error fetching data:", error.message);

      if (error.response) {
        console.error("Raw response:", error.response);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [task]);
  const submitTask = async (userTask) => {
    const data = {
      id: uuid(), 
      task: userTask, 
      complete: false };
      
      const res= await api.post('todolist',data)
      setTask([...task, res.data]);

  };

  const deleteTask = async (task_id) => {
    try {
      const res = await api.delete(`/todolist/${task_id}`);
      
      // Check if the deletion was successful (status code 200)
      if (res.status === 200) {
        // Filter out the deleted task from the current state
        const updatedTasks = task.filter((item) => item.id !== task_id);
        // Update the state to trigger a re-render
        setTask(updatedTasks);
      } else {
        console.error(`Failed to delete task with ID ${task_id}. Status: ${res.status}`);
      }
    } catch (error) {
      console.error(`Error deleting task with ID ${task_id}:`, error.message);
    }
  };
  
  const updateTask = async (task_id, complete) => {
    await api.patch(`/todolist/${task_id}`, { complete });
  };
  
  return (
    <div className="mx-auto w-50">
      <Form submitTask={submitTask} />
      <List tasks={task} deleteTask={deleteTask} updateTask={updateTask} />
    </div>
  );
};

export default App;
