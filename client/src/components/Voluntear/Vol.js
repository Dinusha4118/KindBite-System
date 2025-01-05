import React, { useState, useEffect } from "react";
import "../Voluntear/VolunteerTask.css";

const VolunteerTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks (replace with your API call)
  useEffect(() => {
    // Example data
    const fetchedTasks = [
      {
        id: 1,
        pickupLocation: "Green Bites, Main St.",
        dropOffLocation: "Helping Hands, Elm Ave.",
        foodItems: "20 sandwiches",
        pickupTime: "6:30 PM",
        deliveryTime: "7:00 PM",
        status: "Pending",
      },
      {
        id: 2,
        pickupLocation: "Grocery Mart, Oak St.",
        dropOffLocation: "Community Shelter, Maple Blvd.",
        foodItems: "15 packed meals",
        pickupTime: "5:00 PM",
        deliveryTime: "5:45 PM",
        status: "Pending",
      },
    ];
    setTasks(fetchedTasks);
  }, []);

  // Handle task acceptance
  const acceptTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: "Accepted" } : task
      )
    );
  };

  // Handle task completion
  const completeTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: "Completed" } : task
      )
    );
  };

  return (
    <div className="volunteer-tasks-container">
      <h1>Volunteer Tasks</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <div
            className={`task-card ${
              task.status === "Accepted" ? "accepted" : ""
            }`}
            key={task.id}
            onClick={() => setSelectedTask(task)}
          >
            <h3>Pickup: {task.pickupLocation}</h3>
            <p>Drop Off: {task.dropOffLocation}</p>
            <p>Items: {task.foodItems}</p>
            <p>Status: {task.status}</p>
          </div>
        ))}
      </div>
      {selectedTask && (
        <div className="task-details">
          <h2>Task Details</h2>
          <p><strong>Pickup Location:</strong> {selectedTask.pickupLocation}</p>
          <p><strong>Drop-Off Location:</strong> {selectedTask.dropOffLocation}</p>
          <p><strong>Food Items:</strong> {selectedTask.foodItems}</p>
          <p><strong>Pickup Time:</strong> {selectedTask.pickupTime}</p>
          <p><strong>Delivery Time:</strong> {selectedTask.deliveryTime}</p>
          <p><strong>Status:</strong> {selectedTask.status}</p>
          <div className="actions">
            {selectedTask.status === "Pending" && (
              <button
                className="accept-btn"
                onClick={() => acceptTask(selectedTask.id)}
              >
                Accept Task
              </button>
            )}
            {selectedTask.status === "Accepted" && (
              <button
                className="complete-btn"
                onClick={() => completeTask(selectedTask.id)}
              >
                Mark as Completed
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerTasks;
