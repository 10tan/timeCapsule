import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Button, TextField, List, ListItem, ListItemText, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Profile() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const navigate = useNavigate();

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      localStorage.setItem("profileInput", task);  // Store in localStorage
      setTask("");
      navigate('/upload');  // Redirect to FileUploader.js
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      
      <Navbar />

      <div className="container mt-5">
        <h2 className="text-center sand-clock-container">
          Add New
          <span className="sand-clock">⌛</span>
        </h2>

        <div className="d-flex justify-content-center mb-3">
          <TextField
            label="New Task"
            variant="outlined"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={handleKeyPress}
            className="me-2"
            style={{ fontSize: "1.5rem" }}
          />
          <Button variant="contained" color="primary" onClick={addTask} style={{ fontSize: "1.2rem" }}>
            Add
          </Button>
        </div>
        
        <List>
          {tasks.map((t, index) => (
            <Paper
              key={index}
              elevation={3}
              className="locker-task"
            >
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => removeTask(index)}
                    className="delete-btn"
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={t}
                  primaryTypographyProps={{ style: { fontSize: "1.5rem", fontWeight: "500" } }}
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      </div>
    </div>
  );
}

export default Profile;
