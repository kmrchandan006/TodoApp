import React, { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { xCircle } from 'react-icons-kit/feather/xCircle';
import { auth, db } from '../Config/Config';

export const Modal = ({ editTodoValue, closeModal, updateTodoHandler }) => {
    const [editTodo, setEditTodo] = useState(editTodoValue.title || '');

    useEffect(() => {
        setEditTodo(editTodoValue.title || '');
    }, [editTodoValue]);

    const handleEditTodoSubmit = (e) => {
        e.preventDefault();
        updateTodoHandler(editTodoValue.id, { title: editTodo });
        closeModal();
    };

    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='header'>
                    <div className='update-text'>
                        Update your todo
                    </div>
                    <div className='close-btn' onClick={closeModal}>
                        <Icon size={28} icon={xCircle} style={{ color: 'rgb(165, 2, 2)' }} />
                    </div>
                </div>
                <div className='container-fluid'>
                    <form autoComplete="off" className='form-group' onSubmit={handleEditTodoSubmit}>
                        <input
                            type="text"
                            className='form-control'
                            required
                            placeholder="Update your todo"
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                        />
                        <br />
                        <button type="submit" className='btn btn-success btn-lg'>
                            UPDATE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
