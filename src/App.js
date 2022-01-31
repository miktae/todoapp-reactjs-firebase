import React, { useState, useEffect } from "react";
import Heading from './Heading';
import "./App.css";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

const Content = (props) => {
  const [todo, setTodo] = useState([{ name: "Loading...", id: "0" }]);
  const [Name, setName] = useState("");
  const usersCollectionRef = collection(db, "todo");

  // console.log(todo);
  useEffect(
    () =>
      onSnapshot(usersCollectionRef, (snapshot) => {
        setTodo(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      })
    , []);

  const Submit = async (e) => {
    if (Name.trim() === '') {
      alert('Please enter a name');
      setName('');
    }
    else {
      setName('');
      try {
        await addDoc(usersCollectionRef, {
          name: Name,
          finished: false,
        })
      } catch (err) {
        alert(err)
      }
    }
  }

  const Finish = async (id, finished) => {
    const todoDoc = doc(db, "todo", id);
    let newFields;
    finished ? newFields = { finished: false } : newFields = { finished: true };
    await updateDoc(todoDoc, newFields);
  };

  const Delete = async (id) => {
    var cf = window.confirm('Are you sure you want to delete?');
    if(cf){
       const todoDoc = doc(db, "todo", id);
    await deleteDoc(todoDoc);
    }
  };

  return <>
    <div className="form">
      <input type="text"
        value={Name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="add-btn" id="add-btn" onClick={Submit}>
        Add
      </button>
    </div>
    <div className="todo-container">
      <ul className="items">
        {
          todo.map((t) => (
            <li key={t.id} className="item">
              {t.name}
              &ensp;
              <div className="btn">
                <button className="func-btn"
                  onClick={
                    () => {
                      let w = document.getElementById("edit" + t.id);
                      w.style.display = "block";
                    }
                  }>
                  Edit ✏️
                </button>
                {
                  <div className="edit-modal" id={"edit" + t.id} style={{
                    display: "none",
                  }}>
                    <div className="modal-body">
                      <input type="text" id={t.id} defaultValue={t.name}></input>
                      <button className="btn" onClick={async () => {
                        let j = document.getElementById(t.id).value
                        const todoDoc = doc(db, "todo", t.id);
                        const newFields = { name: j };
                        await updateDoc(todoDoc, newFields);
                        let w = document.getElementById("edit" + t.id);
                      w.style.display = "none";
                      }}>OK</button>
                      <button onClick={() => {let w = document.getElementById("edit" + t.id);
                      w.style.display = "none";}}
                        className="btn">Cancel</button>
                    </div>
                  </div>
                }
                &ensp;
                <button className="func-btn" onClick={() => {
                  Finish(t.id, t.finished);
                }}>
                  Finished{t.finished ? "✅" : "❌"}
                </button>
                &ensp;
                <button className="func-btn"
                  onClick={() => {
                    Delete(t.id);
                  }}
                >Delete
                  ✂️
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  </>;
}

function App() {
  return <div className="content">
    <Heading title="Todo-app ReactJS+Firebase" />
    <Content />
  </div>
}

export default App;
