import React from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';

const PrioritySection = ({ priority, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, priority),
  });

  return (
    <div ref={drop} className="border-2 border-gray-300 p-4 m-2 min-h-[150px] w-1/3 rounded-lg">
      <h2 className="text-xl font-bold mb-2">{priority} Priority</h2>
      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default PrioritySection;
