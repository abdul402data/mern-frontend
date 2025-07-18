import React, { useState } from 'react';

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newDesc, setNewDesc] = useState(task.description);

  return (
    <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      {isEditing ? (
        <div className="flex flex-col md:flex-row gap-3 items-start">
          <input
            className="flex-1 border px-3 py-2 rounded-md"
            value={newText}
            onChange={e => setNewText(e.target.value)}
          />
          <input
            className="flex-1 border px-3 py-2 rounded-md"
            value={newDesc}
            onChange={e => setNewDesc(e.target.value)}
          />
          <button
            onClick={() => {
              onUpdate(task._id, newText, newDesc);
              setIsEditing(false);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{task.text}</h3>
            <p className="text-sm text-gray-500">{task.description}</p>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
