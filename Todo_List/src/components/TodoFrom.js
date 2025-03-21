import React, {useState, useEffect, useRef} from 'react'

function TodoFrom(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  })

  const handleChange = e => {
    setInput(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    
    setInput('')
  };


  return (
    <form className="todo-form" onSubmit={handleSubmit}>
        {props.edit ? (
            <>
          <input type='text' 
          placeholder='แก้ไขกิจกรรมที่คุณทำ' 
          value={input}
          name='text'
          className='todo-input edit'
          onChange={handleChange}
          ref={inputRef}/>
  
          <button className='todo-button edit'>แก้ไช</button>
            </>
          ) : ( 
            <>
          <input type='text' 
            placeholder='เพิ่มกิจกรรมที่คุณทำ' 
            value={input}
            name='text'
            className='todo-input'
            onChange={handleChange}
            ref={inputRef}/>
    
            <button className='todo-button'>เพิ่มกิจกรรม</button>
            </>
          )}



        
    </form>
  )
}

export default TodoFrom