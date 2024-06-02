
import React, { useState } from "react";
import Input from "./Components/Input";
//import Card from './Components/Card';

const App = () => {
  //   //add todo
  // const[todo,setTodo] =useState([]) //[{},{},{}]
  // const addTodo =(newTitle,newDesc)=>{
  //   let data = {
  //     id:todo.length+1,
  //     title: newTitle,
  //     description:newDesc,
  //     completed:"false"
  //   }
  //   setTodo([...todo,data])
  //   console.log("added");
  // }
  // console.log(todo);

  // //delete part
  // const deleteTodo=(id)=>{
  //   setTodo(todo.filter((ele)=>ele.id !== id))
  // }

  return (
    <div className="App">
      <header className="App-header">
        <Input />
      </header>
    </div>
  );
};

export default App;