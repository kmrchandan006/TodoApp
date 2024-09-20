import React, { useState, useEffect } from 'react';
import { auth, db } from '../Config/Config';
import { Modal } from './Modal';
import DragDropContext from './DragDropContext';
import { useHistory } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const Home = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [todos, setTodos] = useState([]);
    const [editTodoValue, setEditTodoValue] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [todoError, setTodoError] = useState('');
    const history = useHistory();

    // Fetch Todos
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                return db.collection('todos of ' + user.uid).orderBy('order').onSnapshot(snapshot => {
                    const fetchedTodos = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setTodos(fetchedTodos);
                });
            } else {
                alert('User not signed in');
                history.push('/login');
            }
        });
        return () => unsubscribe();
    }, [history]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (taskTitle && taskDescription && taskDueDate && taskPriority) {
            auth.onAuthStateChanged(user => {
                if (user) {
                    const newOrder = todos.length; // Setting order to be the last item
                    db.collection('todos of ' + user.uid).add({
                        title: taskTitle,
                        description: taskDescription,
                        dueDate: taskDueDate,
                        priority: taskPriority,
                        order: newOrder
                    });
                    setTaskTitle('');
                    setTaskDescription('');
                    setTaskDueDate('');
                    setTaskPriority('');
                } else {
                    alert('User not signed in');
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
                alert('User signed out');
                history.push('/login');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded mb-4">Logout</button>
                <form onSubmit={handleAddTask} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                    <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
                    <input 
                        type="text" 
                        value={taskTitle} 
                        onChange={e => setTaskTitle(e.target.value)} 
                        placeholder="Task Title" 
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                    />
                    <textarea 
                        value={taskDescription} 
                        onChange={e => setTaskDescription(e.target.value)} 
                        placeholder="Task Description" 
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                    ></textarea>
                    <input 
                        type="date" 
                        value={taskDueDate} 
                        onChange={e => setTaskDueDate(e.target.value)} 
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                    />
                    <select 
                        value={taskPriority} 
                        onChange={e => setTaskPriority(e.target.value)} 
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                    >
                        <option value="">Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">Add Task</button>
                </form>

                {todoError && <p className="text-red-500 mt-4">{todoError}</p>}

                {/* Render DragDropContext for reordering tasks */}
                <DragDropContext 
                    todos={todos} 
                    setTodos={setTodos} 
                    deleteTodo={deleteTodo} 
                    openEditModal={openEditModal} 
                />

                {isEditModalOpen && (
                    <Modal
                        editTodoValue={editTodoValue}
                        closeModal={() => setIsEditModalOpen(false)}
                        updateTodoHandler={updateTodoHandler}
                    />
                )}
            </div>
        </DndProvider>
    );
};
