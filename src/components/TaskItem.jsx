import React, { useState } from 'react';
import { Edit2, Trash2, Check, X, Calendar, AlertCircle } from 'lucide-react';

const TaskItem = ({ task, onToggle, onDelete, onEdit, darkMode }) => {
 const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
  const [editPriority, setEditPriority] = useState(task.priority);

  const handleSave = () => {
    onEdit(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      dueDate: editDueDate || null,
      priority: editPriority,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate || '');
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-400';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`p-4 rounded-xl shadow-md backdrop-blur-sm border-l-4 ${getPriorityColor(task.priority)} transition-all duration-300 transform hover:scale-105 ${
      darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/70 border border-white/20'
    } ${task.completed ? 'opacity-70' : ''}`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            rows="2"
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className={`flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className={`flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1"
            >
              <Check size={16} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-1"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <button
                onClick={() => onToggle(task.id)}
                className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  task.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : darkMode
                    ? 'border-gray-500 hover:border-green-500'
                    : 'border-gray-300 hover:border-green-500'
                }`}
              >
                {task.completed && <Check size={12} />}
              </button>
              
              <div className="flex-1">
                <h3 className={`font-semibold text-lg ${task.completed ? 'line-through' : ''} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm mt-1 ${task.completed ? 'line-through' : ''} ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {task.description}
                  </p>
                )}
                
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                  {task.dueDate && (
                    <span className={`flex items-center gap-1 ${
                      isOverdue ? 'text-red-500' : darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Calendar size={12} />
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                      {isOverdue && <AlertCircle size={12} />}
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-red-900 text-red-400' : 'hover:bg-red-100 text-red-600'}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default TaskItem;
