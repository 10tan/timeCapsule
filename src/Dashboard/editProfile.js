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
      setTask("");
      navigate('/upload');
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

        <div style={{ marginTop: "20px" }}></div>

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

      <style>
        {`
          .sand-clock-container {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            font-weight: 600;
            margin-bottom: 15px;
          }

          .sand-clock {
            font-size: 2.5rem;
            margin-left: 10px;
            display: inline-block;
            animation: sandFlow 3s infinite ease-in-out;
          }

          @keyframes sandFlow {
            0% { content: "⌛"; transform: rotate(0deg); }
            50% { content: "⏳"; }
            100% { content: "⌛"; transform: rotate(180deg); }
          }

          .locker-task {
            background: linear-gradient(135deg, #d8c49e, #b8a178);
            border: 3px solid #a39e9e;
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
            color: #5a4632;
            font-weight: bold;
            padding: 12px;
            margin-bottom: 10px;
            border-radius: 8px;
            position: relative;
            transition: 0.3s ease-in-out;
          }

          .locker-task::before {
            content: "";
            position: absolute;
            top: 10px;
            left: 15px;
            width: 60px;
            height: 8px;
            background: #777;
            border-radius: 4px;
          }

          .locker-task:hover {
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
            transform: scale(1.05);
          }

          .delete-btn {
            transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
          }

          .delete-btn:hover {
            transform: scale(1.3);
            color: red;
          }

          .delete-btn:active {
            transform: scale(0.9);
          }
        `}
      </style>
    </div>
  );
}

export default Profile;
