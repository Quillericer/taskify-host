import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineFileDone } from "react-icons/ai"
import { Todo } from '../model';

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    index: number
}

const SingleTodo: React.FC<Props> = ({todo, todos, setTodos, index}) => { // functional component; type of props inside is Props
  
    const [edit, setEdit] = React.useState<boolean>(false); // boolean type
    const [editTodo, setEditTodo] = React.useState<string>(todo.todo); // string type

    const handleDone = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone} : todo));
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map(todo => (
            todo.id === id ? {...todo, todo: editTodo} : todo
        )));
        setEdit(false);
    };

    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    

    return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided) => (
            <form 
                className="todos__single" 
                onSubmit={e => handleEdit(e, todo.id)} 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                >
            {
                edit ? (
                    <input value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className="todos__single-text"/>
                ) : (
                    
                        todo.isDone ? (
                            <s className="todos__single-text">
                                {todo.todo}
                            </s>
                        ) : (
                            <span className="todos__single-text">
                                {todo.todo}
                            </span>
                        )
                    
                )
            }
            <div>
                <span className="icon" onClick={() =>{if (!edit && !todo.isDone) {
                        setEdit(!edit);
                    }
                }}
                    >
                    <AiOutlineEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(todo.id)}>
                    <AiOutlineDelete />
                </span>
                <span className="icon" onClick={() => handleDone(todo.id)}>
                    <AiOutlineFileDone />
                </span>
            </div>
        </form>
        )}
        
    </Draggable>
    
  )
};

export default SingleTodo;