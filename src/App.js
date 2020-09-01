import React from 'react';
import {useReducer} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';

import './App.css';


//USE_STATE PART_1

const INITTIAL_STATE = [
  {
    id: '0',
    title: 'React Concepts',
    url:
      'https://www.google.com/',
  },
  {
    id: '1',
    title: 'Javascript Concepts',
    url: 'https://www.yahoo.com',
  }
]

const App = () => {

  const [ list,setList ] = useState(INITTIAL_STATE);

  function onRemoveItem(id){
      const updatedList = list.filter((item)=> item.id !== id)  
      setList(updatedList); 
  }

  return (
     <div>
       <ul>
         {list.map((item)=>{
         return(
           <div key={item.id}>
            <li><a href={item.url}>{item.title}</a></li>
            <button type="button" onClick={() => onRemoveItem(item.id)}>Remove Item</button>
            </div>
         );
         })}
       </ul>
       </div>
  );
}

//USE_STATE_PART_2

const App = () => {
  const [count, setCount] = React.useState(0);
  const handleIncrease = () => {
    setTimeout(() => setCount(state => state + 1), 5000);
  };
  const handleDecrease = () => {
    setTimeout(() => setCount(state => state - 1), 5000);
  };
  return (
    <div>
      Count: {count}
      <hr />
      <div>
        <button type="button" onClick={handleIncrease}>
          Increase
        </button>
        <button type="button" onClick={handleDecrease}>
          Decrease
        </button>
      </div>
    </div>
  );
};

//USE_REDUCER

const initialTodos = [
  {
    id: 'a',
    task: 'Learn React',
    complete: false,
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    complete: false,
  },
];


const todoReducer = (state,action) => {

  switch(action.type){
     case 'DO_TODO':
       return state.map((todo)=>{
         if(todo.id === action.id){
            return {...todo,complete: true}
         }
         else{
           return todo
         }
      });
     
     case 'UNDO_TODO':
       return state.map((todo)=>{
         if(todo.id === action.id){
           return {...todo,complete : false}
         }
         else{
           return todo;
         }
       })
      default:
        return state;
  }


}


const App = () => {
  

  const [ todos , dispatch ] = useReducer(todoReducer,initialTodos);

  const handleChange = (todo) => {
    
      dispatch({
        type: todo.complete ? 'UNDO_TODO' : 'DO_TODO' ,
       id: todo.id})
  }

  return (
    <div>
      <ul>
        {
          todos.map((todo)=>
            <li key={todo.id}>
              <label>
                <input type="checkbox" 
                checked={todo.complete} 
                onChange={() => handleChange(todo)}/>
                {todo.task}
                </label>
              </li>
          )
        }
      </ul>
      </div>
  );
}

//USE_EFFECT

  function App(){

    const [isOn , setIsOn ] = useState(false);
    const [timer, setTimer ] = useState(0);

    useEffect(() => {
     let interval;
     console.log("Effect runs");
     if(isOn){
      interval = setInterval(()=>setTimer((timer) =>timer +1),1000);
     }

      return () => clearInterval(interval);
    },[isOn]);

    const onReset = () => {setTimer(0); setIsOn(false);}
    

    return (
      <div>
        {timer}
        {!isOn && <button type="button" onClick={() =>setIsOn(true)}>Start</button>}
        {isOn && <button type="button" onClick= {() => setIsOn(false)}>Stop</button>}
        <button type="button" onClick={() => onReset()}>Reset</button>

        </div>
    );
}

export default App;