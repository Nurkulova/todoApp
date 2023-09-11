import React, { createContext, useContext, useReducer } from 'react';

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

const initialState = {
  todos: [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, { text: action.text, completed: false }],
      };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map((todo, index) =>
          index === action.index
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter((_, index) => index !== action.index),
      };
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
