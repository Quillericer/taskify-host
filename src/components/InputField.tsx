import React from "react";
import "./styles.css";

interface Props {
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e: React.FormEvent) => void
}

const InputField = ({todo, setTodo, handleAdd}: Props) => { // type of these arguments is Props (todo prop is a string and setTodo is a function)
    const inputRef = React.useRef<HTMLInputElement>(null); // type of this argument is an input element that we checked from hovering on it
    return (
        <form className="input" onSubmit={(e) => {
            handleAdd(e);
            inputRef.current?.blur(); // optional
        }}>
            <input ref={inputRef} type="input" value={todo} onChange={e => setTodo(e.target.value)} placeholder="Enter a task" className="input__box" />
            <button className="input__submit" type="submit">Go</button>
        </form>
    )
}

export default InputField;