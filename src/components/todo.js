import React, { useEffect, useState } from 'react'
import todolist from '../images/todolist.png';
import "../App.css";



const getlocalItems=()=>{
  let list =localStorage.getItem('lists');
  console.log(list);

  if(list){
    return JSON.parse(localStorage.getItem('lists'));
  } else{
    return [];
  }
}


const Todo = () => {
  const[inputData, setInput]=useState('');
  const [items, setItems]=useState(getlocalItems());

  const addItem=() => {
    if(!inputData){

    } else {
      setItems([...items, inputData]);
      setInput('');
    }
   
  }

  const deleteItem=(id)=>{
console.log(id);
const updatedItems=items.filter((elem, ind)=>{
return ind !== id;
});

setItems(updatedItems);


  }
  const removeAll=()=>{
    setItems([]);
  }

  useEffect(()=>{
localStorage.setItem('lists', JSON.stringify(items));  
  },[items]);
  return (
    <>
    <div className='main-div'>
      <div className='child-main'>
        <figure>
            <img src={todolist} alt='todoicon'/>
            <figcaption>Add Your List Here</figcaption>
        </figure>
  <div className='addItems'>
    <input type='text' placeholder='Add Items...'  value={inputData} onChange={(e) => setInput(e.target.value)}/>
    <i className="fa fa-plus add-btn " title='Add Item' onClick={addItem}></i>
  </div>

<div className='showItems'>
{
  items.map((elem, ind)=>{
  return (
    <div className='eachItem' key={ind}>
<h3>{elem}</h3>
<i className="fa fa-trash-alt add-btn " title='Delete Item' onClick={() => deleteItem(ind)}></i>
</div>
  )
  })
}


</div>
 

<div className='showItems'>
<button className='btn effect04' onClick={removeAll} data-sm-link-text="Remove All" ><span>Check List</span></button>
</div>

      </div>
    </div>
    </>
  )
}

export default Todo