import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './components/TaskItem';
import './index.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  const handleAdd = async () => {
    if (text.trim() === '') return;
    await axios.post(API_URL, { text, description });
    setText('');
    setDescription('');
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  const handleUpdate = async (id, newText, newDescription) => {
    await axios.put(`${API_URL}/${id}`, { text: newText, description: newDescription });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Task Manager</h1>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Task Title"
          />
          <input
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Task Description"
          />
          <button
            onClick={handleAdd}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-all"
          >
            Add
          </button>
          
        </div>

        <div className="mb-4">
            {tasks.length > 0 ? (
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">Your Tasks</h2>
            ) : (
              <h2 className="text-xl font-medium text-gray-400 text-center mt-6">🚫 No tasks yet!</h2>
            )}
          </div>

        <ul className="space-y-4">
          {tasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
