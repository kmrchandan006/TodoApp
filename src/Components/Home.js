import React, { useState, useEffect } from 'react';
import { auth, db } from '../Config/Config';
import { Modal } from './Modal';
import { useHistory } from 'react-router-dom'; // Import useHistory
import './Home.css';

export const Home = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [todos, setTodos] = useState([]);
  const [editTodoValue, setEditTodoValue] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [todoError, setTodoError] = useState('');
  const history = useHistory(); // Initialize useHistory

  // Fetch Todos
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        return db.collection('todos of ' + user.uid).onSnapshot(snapshot => {
          const fetchedTodos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTodos(fetchedTodos);
        });
      } else {
        console.log('User not signed in');
        history.push('/login'); // Redirect to login page if user is not signed in
      }
    });
    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, [history]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskTitle && taskDescription && taskDueDate && taskPriority) {
      auth.onAuthStateChanged(user => {
        if (user) {
          db.collection('todos of ' + user.uid).add({
            title: taskTitle,
            description: taskDescription,
            dueDate: taskDueDate,
            priority: taskPriority
          });
          setTaskTitle('');
          setTaskDescription('');
          setTaskDueDate('');
          setTaskPriority('');
        } else {
          console.log('User not signed in');
        }
      });
    } else {
      setTodoError('Please fill out all fields before submitting.');
    }
  };

  const deleteTodo = (id) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('todos of ' + user.uid).doc(id).delete();
      }
    });
  };

  const updateTodoHandler = (id, updatedTask) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('todos of ' + user.uid).doc(id).update(updatedTask);
      }
    });
  };

  const openEditModal = (task) => {
    setEditTodoValue(task);
    setIsEditModalOpen(true);
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out');
        history.push('/login'); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div>
      <button onClick={handleLogout} className="logout-button">Logout</button>

      <form onSubmit={handleAddTask}>
        <input type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="Task Title" />
        <textarea value={taskDescription} onChange={e => setTaskDescription(e.target.value)} placeholder="Task Description"></textarea>
        <input type="date" value={taskDueDate} onChange={e => setTaskDueDate(e.target.value)} />
        <select value={taskPriority} onChange={e => setTaskPriority(e.target.value)}>
          <option value="">Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      {todoError && <p>{todoError}</p>}

      <div>
        {todos.map(task => (
          <div key={task.id}>
            <h3>{task.title || "Untitled Task"}</h3>
            <p>{task.description || "No description"}</p>
            <p>{task.dueDate || "No due date"}</p>
            <p>{task.priority || "No priority"}</p>
            <button onClick={() => deleteTodo(task.id)}>Delete</button>
            <button onClick={() => openEditModal(task)}>Edit</button>
          </div>
        ))}
      </div>

      {isEditModalOpen && (
        <Modal
          editTodoValue={editTodoValue}
          closeModal={() => setIsEditModalOpen(false)}
          updateTodoHandler={updateTodoHandler}
        />
      )}
    </div>
  );
};
