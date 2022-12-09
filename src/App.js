import logo from "./logo.svg";
import "./App.css";
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Addtodo } from "./MyComponents/Addtodo";
import { Footer } from "./MyComponents/Footer";
import { Todoitems } from "./MyComponents/Todoitems";
import { About } from "./MyComponents/About";
import React, { useState, useEffect  } from "react";
import {
  BrowserRouter as Router,
  Switch, 
  Route
} from "react-router-dom";

function App() {
  let initTodo;
  if (localStorage.getItem("todos")===null) {
    initTodo = [];
  }
   else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    console.log("i am on delete of todo", todo);
    // deleting this way will not work
    // let index= todos.indexOf(todo)
    // todos.splice(index, 1);
   
    setTodos(todos.filter((e) => {
        return e !== todo;
      }));
      console.log("deleted", todos)
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo = (title, desc) => {
    console.log("i am adding this todo", title, desc)
    let sno;
    if (todos.length===0){
      sno = 0;
    }
     else{
      sno = todos[todos.length-1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
    // localStorage.setItem("todos",JSON.stringify(todos));
  }                                 

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
    <Router>
      <Header title="MyTodosList"  searchBar={false} />
      
      <Switch>
          <Route  exact path="/" render={()=>{
             return(
            <>  
            <Addtodo addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} />
            </>)
          }}>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
       <Footer/>
      </Router>
    </> 
  );
}

export default App;
