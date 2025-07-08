import React from 'react';

const FilterButtons = ({ filter, onFilterChange, darkMode }) => {
  const filters = [
    { key: 'all', label: 'All'},
    { key: 'active', label: 'Active'},
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {filters.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
            filter === key
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
              : darkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span>{icon}</span>
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
