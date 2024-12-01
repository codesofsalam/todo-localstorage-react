import React, { useEffect, useState } from "react";
import todolist from "../images/todolist.png";
import "../App.css";

const getlocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInput] = useState("");
  const [items, setItems] = useState(getlocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("Please Fill Data...");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInput("");

      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInput("");
    }
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });

    setItems(updatedItems);
  };

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);

    setToggleSubmit(false);
    setInput(newEditItem.name);

    setIsEditItem(id);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="main-div">
        <div className="child-main">
          <figure>
            <img src={todolist} alt="todoicon" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items..."
              value={inputData}
              onChange={(e) => setInput(e.target.value)}
            />
            {toggleSubmit ? (
              <i
                className="fa fa-plus add-btn "
                title="Add Item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="fa fa-edit add-btn  "
                title="Update Item"
                onClick={addItem}
              ></i>
            )}
          </div>

          <div className="showItems">
            {items.map((elem) => {
              return (
                <div className="eachItem" key={elem.id}>
                  <h3>{elem.name}</h3>
                  <div>
                    <i
                      className="fa fa-edit add-btn "
                      title="Edit Item"
                      onClick={() => editItem(elem.id)}
                    ></i>
                    <i
                      className="fa fa-trash-alt add-btn "
                      title="Delete Item"
                      onClick={() => deleteItem(elem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              onClick={removeAll}
              data-sm-link-text="Remove All"
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
