import React, { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { xCircle } from 'react-icons-kit/feather/xCircle';

export const Modal = ({ editTodoValue, closeModal, updateTodoHandler }) => {
    const [editTodo, setEditTodo] = useState(editTodoValue.title || '');
    const [editDescription, setEditDescription] = useState(editTodoValue.description || '');
    const [editDueDate, setEditDueDate] = useState(editTodoValue.dueDate || '');
    const [editPriority, setEditPriority] = useState(editTodoValue.priority || '');

    useEffect(() => {
        setEditTodo(editTodoValue.title || '');
        setEditDescription(editTodoValue.description || '');
        setEditDueDate(editTodoValue.dueDate || '');
        setEditPriority(editTodoValue.priority || '');
    }, [editTodoValue]);

    const handleEditTodoSubmit = (e) => {
        e.preventDefault();
        const updatedTask = {
            title: editTodo,
            description: editDescription,
            dueDate: editDueDate,
            priority: editPriority
        };
        updateTodoHandler(editTodoValue.id, updatedTask);
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Update your todo</h2>
                    <button onClick={closeModal}>
                        <Icon size={28} icon={xCircle} style={{ color: 'rgb(165, 2, 2)' }} />
                    </button>
                </div>
                <form autoComplete="off" className="space-y-4" onSubmit={handleEditTodoSubmit}>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        required
                        placeholder="Update your todo"
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                    />
                    <textarea
                        className="border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Update description"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                    />
                    <select
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                    >
                        <option value="">Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <button type="submit" className="bg-green-500 text-white py-2 rounded-md w-full hover:bg-green-600">
                        UPDATE
                    </button>
                </form>
            </div>
        </div>
    );
};
