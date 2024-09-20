import React from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 m-2 rounded-lg cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${getColorForPriority(task.priority)}`}
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p>Priority: {task.priority}</p>
    </div>
  );
};

const getColorForPriority = (priority) => {
  switch (priority) {
    case 'HIGH':
      return 'bg-red-500 text-white';
    case 'MEDIUM':
      return 'bg-orange-500 text-white';
    case 'LOW':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-200 text-black';
  }
};

export default Task;
