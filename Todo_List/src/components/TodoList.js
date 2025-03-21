import React, {useState} from 'react'
import TodoFrom from './TodoFrom' 
import Todo from './Todo'

function TodoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)){
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    };

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    };


    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr)
    };


    

    const completeTodo = id => {
        let updateTodos = todos.map(todo => {
            if(todo.id === id){
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updateTodos);
    };


    return (
        <div>
        <h1>Todo List</h1>
        <h2>คลิกที่ข้อความ เมื่อคุณทำกิจกรรมนั้นเสร็จสิ้น</h2>
        <TodoFrom onSubmit={addTodo} />
        <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
        </div>
    );
}

export default TodoList