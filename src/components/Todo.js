import React, { useState } from "react";
import "./Todo.css";


const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [todos, setTodos] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("please fill data");
    } else if (inputData && !toggleSubmit) {
      setTodos(
        todos.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);

      setInputData("");

      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
        completed: false,
      };
      setTodos([...todos, allInputData]);
      setInputData("");
    }
  };

  const deleteItem = (index) => {
    const updatedTodos = todos.filter((elem) => {
      return index !== elem.id;
    });

    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = [...todos].map((elem) => {
      if (elem.id === id) {
        elem.completed = !elem.completed;
      }
      return elem;
    });
    setTodos(updatedTodos);
  };

  
  const editItem = (id) => {
    let newEditItem = todos.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);

    setToggleSubmit(false);

    setInputData(newEditItem.name);

    setIsEditItem(id);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <div className="addItems">
            <input
              type="text"
              placeholder=" Add Todos..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="todoInputField"
            />
            {toggleSubmit ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="far fa-edit add-btn"
                title="Update Item"
                onClick={addItem}
              ></i>
            )}
          </div>

          <div className="showItems">
            {todos.map((elem) => {
              return (
                <div className="eachItem" key={elem.id}>
                  <div className="todo-text">
                    <h3>{elem.name}</h3>
                  </div>
                  
                  <div className="todo-btn">
                    <input
                      type="checkbox"
                      onChange={() => toggleComplete(elem.id)}
                      checked={elem.completed}
                      className="checkbox"
                    />
                    <i
                      className="far fa-edit add-btn"
                      title="Edit Item"
                      onClick={() => editItem(elem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Item"
                      onClick={() => deleteItem(elem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
