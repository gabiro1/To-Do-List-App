import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import generateId from '../utils/generateId';

const TaskForm = ({ onAddTask, darkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newTask = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
  };

  return (
    <div className={`p-6 rounded-2xl shadow-lg backdrop-blur-sm ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/70 border border-white/20'} transition-all duration-300`}>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'}`}
          />
        </div>
        
        <div>
          <textarea
            placeholder="Add a description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'}`}
            rows="3"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
            />
          </div>
          
          <div className="flex-1">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>
    </div>
  );
};


export default TaskForm;
