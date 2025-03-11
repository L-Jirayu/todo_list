import React, {useState} from 'react'
import TodoFrom from './TodoFrom';
import { AiFillCloseSquare } from 'react-icons/ai'
import { RiEditBoxFill } from 'react-icons/ri'


function Todo({todos, completeTodo, removeTodo, updateTodo}) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        });
    };

    if(edit.id){
        return <TodoFrom edit={edit} onSubmit={submitUpdate} />
    };

    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 
        'todo-row complete' : 'todo-row'} key={index}>

            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>

            <div className='icons'>
                <AiFillCloseSquare onClick={() => removeTodo(todo.id)}
                className='delte-icon'/>
                <RiEditBoxFill onClick={() => setEdit({id: todo.id, value: todo.text})}
                className='edit-icon'/>
            </div>
        </div>

    ));
};

export default Todo
