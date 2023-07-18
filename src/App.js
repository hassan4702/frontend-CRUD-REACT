import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";
const App = () => {
  const [input, setInput] = useState("");
  const [task, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateID, setUpdateID] = useState(null);
  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateUI((prevState)=>!prevState)
    });
  };

  const updateMode=(id,text)=>{
    console.log(text);
    setInput(text)
    setUpdateID(id)

  }
  const updateTask=()=>{
    axios.put(`${baseURL}/update/${updateID}`,{task:input}).then((res)=>{
      console.log(res.data);
      setUpdateUI((prevState)=>!prevState)
      setUpdateID(null)
      setInput("")
    })

  }
  return (
    <main>
      <h1>CRUD OPERATIONS</h1>
      <div className="input_holder">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={updateID?updateTask: addTask}>
          {updateID?'Update task':'Add task'}
        </button>
      </div>
      <ul>
        {task.map((task) => (
          <List
            task={task.task}
            key={task._id}
            id={task._id}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
};

export default App;
