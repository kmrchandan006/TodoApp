import React from 'react';
import { TodoItem } from './TodoItem';
import { useDrop } from 'react-dnd';
import { db, auth } from '../Config/Config'; // Import Firebase config

const DragDropContext = ({ todos, setTodos, deleteTodo, openEditModal }) => {
    const moveTodo = (dragIndex, hoverIndex) => {
        const draggedTodo = todos[dragIndex];
        const updatedTodos = [...todos];
        updatedTodos.splice(dragIndex, 1); // Remove from original position
        updatedTodos.splice(hoverIndex, 0, draggedTodo); // Insert in new position

        // Update order in database
        updatedTodos.forEach((todo, index) => {
            todo.order = index;
            db.collection('todos of ' + auth.currentUser.uid).doc(todo.id).update({ order: todo.order });
        });

        setTodos(updatedTodos); // Update local state
    };

    const [{ isOver }, drop] = useDrop({
        accept: 'TASK',
        drop: (item, monitor) => {
            const hoverIndex = todos.length; // or some logic to determine where to insert
            moveTodo(item.index, hoverIndex);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} className={`todos-container mt-6 w-full max-w-md ${isOver ? 'bg-gray-200' : ''}`}>
            {todos.map((task, index) => (
                <TodoItem
                    key={task.id}
                    task={task}
                    index={index}
                    deleteTodo={deleteTodo}
                    openEditModal={openEditModal}
                    moveTodo={moveTodo} // Pass the moveTodo function for drag-and-drop
                />
            ))}
        </div>
    );
};

export default DragDropContext;
