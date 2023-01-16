import React from 'react';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';
import "./styles.css";

interface Props {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    completedTodos: Todo[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}


const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => { // functional component
  return (
    <div className="container">
      <Droppable droppableId='TodosList'>
        {(provided) => (
          <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
          <span className="todos__heading">
            Active Tasks
          </span>
          {
            todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={completedTodos}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))
          }
          {provided.placeholder}
        </div>
        )}
      </Droppable>
      <Droppable droppableId='TodosRemove'>
          {(provided) => (
            <div className="todos remove" ref={provided.innerRef} {...provided.droppableProps}>
                <span className="todos__heading">
                  Completed Tasks
                </span>
                {
                  completedTodos.map((todo, index) => (
                    <SingleTodo
                      index={index}
                      todo={todo}
                      todos={completedTodos}
                      key={todo.id}
                      setTodos={setCompletedTodos}
                    />
                  ))
                }
                {provided.placeholder}
            </div>
          )}
      </Droppable>
      
    </div>
  )
};

export default TodoList;