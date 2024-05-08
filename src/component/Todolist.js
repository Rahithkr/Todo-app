import React, { useEffect,useState} from "react";
import "../component/Todolist.css";

function Todolist() {
  const [data, setData] = useState("");
  const [todo, setTodo] = useState(() => {
    const storedData = localStorage.getItem('todo');
    return storedData ? JSON.parse(storedData) : []; 
  });
  const [editIndex,setEditIndex]=useState(null)
  const [editValue,setEditValue]=useState("")
  const [checkedItems, setCheckedItems] = useState([]);
  


 



  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  let handleChange = (event) => {
    setData(event.target.value);
  };

  let handleSubmits = (event) => {
  

      event.preventDefault();
      if (data.trim() !== "") {
        setTodo([...todo, { text: data, date: new Date() }]);
        setData("");
      } else {
      
        alert("Please enter a valid value.");
      }
    };

  let handleDelete=(index)=>{
    const updatedTodo=[...todo]
    updatedTodo.splice(index,1)
    setTodo(updatedTodo)

  }



  let handleEdit=(index)=>{
    setEditIndex(index)
    setEditValue(todo[index].text)

  }

  let handleEditChange=(event)=>{
    setEditValue(event.target.value)
  }

  let handleEditSubmit=(index)=>{
    const updatedTodo=[...todo]
    updatedTodo[index].text=editValue
    setTodo(updatedTodo)
    setEditIndex(null)
    setEditValue("")
  }
  
let handleClear=(event)=>{
event.preventDefault()
setTodo([])
setData("")

}

let handleCheckboxChange=(index)=>{
  const newCheckedItems=[...checkedItems]
  newCheckedItems[index]=!newCheckedItems[index]
  setCheckedItems(newCheckedItems)
}
  
  return (
    <div className="container">
      <form className="input-section">
        <h1> Todo List</h1>
     
        <input
          type="text"
          placeholder="Enter details"
          value={data}
         
          onChange={handleChange} required
        />
        <button onClick={handleSubmits}>ADD</button>
      </form>
      <div>
      <ul className="unorder">
        
      <button onClick={handleClear}>Clear All</button> 
        {todo.map((Todo, index) => (
  



<div  className={`input-edit ${checkedItems[index] ? 'checked' : ''}`}>
{editIndex === index ? (
  <input
    type="text"
    value={editValue}
    onChange={handleEditChange}
  />
) : (
  
  <li className={checkedItems[index] ? 'checked' : ''} > <input className="checkbox" type="checkbox" id={`checkbox-${index}`} checked={checkedItems[index]}  onChange={()=>{handleCheckboxChange(index)}}/> <label htmlFor={`checkbox-${index}`}>
  {Todo.text} - {Todo.date.toLocaleString()}
</label></li>
)}
<i
  className="fa-solid fa-pen-to-square"
  onClick={() => handleEdit(index)}
></i>
<i
  className="fa-solid fa-trash"
  onClick={() => handleDelete(index)}
></i>
{editIndex === index && (
  <button onClick={() => handleEditSubmit(index)}>Save</button>
)}
</div>
))}


</ul>

</div>
</div>
);
}

export default Todolist;










