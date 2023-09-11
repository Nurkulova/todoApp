import React, { useState } from 'react';
import './TodoList.css';
import { useTodoContext } from '../store/todo-context';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TodoList() {
  const { state, dispatch } = useTodoContext();
  const { todos } = state;
  const [newTodo, setNewTodo] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      dispatch({ type: 'ADD_TODO', text: newTodo });
      setNewTodo('');
    }
  };

  const handleCheckboxChange = (index) => {
    dispatch({ type: 'TOGGLE_TODO', index });
  };

  const handleTodoDelete = (index) => {
    dispatch({ type: 'DELETE_TODO', index });
  };

  const totalTasks = todos.length;
  const uncompletedTasks = todos.filter((todo) => !todo.completed).length;
  const completedTasks = todos.filter((todo) => todo.completed).length;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`box ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="status">
          <p>Total: {totalTasks}</p>
          <p>Uncompleted: {uncompletedTasks}</p>
          <p>Completed: {completedTasks}</p>
          <button className="mode-btn" onClick={toggleDarkMode}>
          {isDarkMode ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )}
        </button>
        </div>
        <div className='inner-box'>
        <h2>TODO-LIST</h2>
       <form className='todo-container' onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        <button className='btn' type="submit">ADD</button>
       </form>
      <ul id='taskList' className='todo-list'>
        {todos.map((todo, index) => (
          <li className='todo-item'
           key ={index}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckboxChange(index)}
            />
            <button onClick={() => handleTodoDelete(index)}>DELETE</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default TodoList;
