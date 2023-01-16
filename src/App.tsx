import React from 'react';
import InputField from "./components/InputField";
import TodoList from './components/TodoList';
import { Todo } from './model';
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import './App.css';

const App: React.FC = () => { // React.FC - functional component

  const [todo, setTodo] = React.useState<string>(""); // type of this state is string
  const [todos, setTodos] = React.useState<Todo[]>([]); // type of this state is Todo (interface or basically an object with keys)
  const [completedTodos, setCompletedTodos] = React.useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (todo) {
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);

  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList 
        todos={todos} 
        setTodos={setTodos} 
        completedTodos={completedTodos}
        setCompletedTodos={setCompletedTodos}
        />
    </div>
    </DragDropContext>
    
  );
}

export default App;
