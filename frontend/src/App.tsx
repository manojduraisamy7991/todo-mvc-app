import './App.css';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const CREATE_TASK = 'http://localhost:5000/api/todo/create';

function App() {
  const [task, setTask] = useState({ task: '' });

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(CREATE_TASK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();
      setTask({ task: '' });
      toast('🦄 Wow so easy!', {
        position: 'top-right',
        autoClose: 1000,

        theme: 'dark',
      });
      console.log('Response:', data);
    } catch (err) {
      console.error('Frontend fetch error:', err);
    }
  };
  return (
    <>
      <div>
        <h3>Todo Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={task.task}
            placeholder="task"
            name="task"
            onChange={onChangeHandle}
            required
          />
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer position="top-right" newestOnTop={true} theme="dark" />
    </>
  );
}

export default App;
