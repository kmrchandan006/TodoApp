import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

export const TodoItem = ({ task, index, deleteTodo, openEditModal, moveTodo }) => {
    const ref = React.useRef(null);

    const [, drop] = useDrop({
        accept: 'TODO',
        hover(item) {
            if (item.index !== index) {
                moveTodo(item.index, index);
                item.index = index;
            }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'TODO',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="bg-white shadow-md rounded p-4 mb-4 flex flex-col justify-between"
        >
            <h3 className="text-lg font-bold">{task.title || "Untitled Task"}</h3>
            <p className="text-gray-700">{task.description || "No description"}</p>
            <p className="text-sm text-gray-500">{task.dueDate || "No due date"}</p>
            <p className="text-sm text-gray-500">{task.priority || "No priority"}</p>
            <div className="mt-4 flex justify-between">
                <button
                    onClick={() => deleteTodo(task.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                    Delete
                </button>
                <button
                    onClick={() => openEditModal(task)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                    Edit
                </button>
            </div>
        </div>
    );
};
