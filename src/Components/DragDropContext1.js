import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Task from './Task';
import PrioritySection from './PrioritySection';

const DragDropContext1 = ({ tasks, setTasks }) => {
  const moveTask = (taskId, newPriority) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, priority: newPriority } : task
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex space-x-4">
        {['HIGH', 'MEDIUM', 'LOW'].map(priority => (
          <PrioritySection
            key={priority}
            priority={priority}
            tasks={tasks.filter(task => task.priority === priority)}
            moveTask={moveTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DragDropContext1;
