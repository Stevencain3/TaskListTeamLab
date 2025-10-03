import {useState } from "react";
//add above class exercises

export default function AddTaskForm({ onAdd }) {
  //Add class
  const [text, setText] = useState("");
  //222 in clase #2 add
  const trimmed = text.trim();
  const isValid = trimmed.length >= 3; //at least 3 non-space chars
  //end 222 add

  const submit = (e) => {
    e.preventDefault();
    //222 in class add
    if(!isValid) return;
    //end 2222 add  (change below text to trimmed)
    onAdd?.(trimmed);
    setText("");
  };
  //end add
  //change to accept input and manage state in class
  /*
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="task">New task</label>{" "}
      <input id="task" placeholder="e.g., Finish lab write-up" />
      <button type="submit">Add</button>
    </form>
  );
  */
  return(
    <form onSubmit={submit} style={{display: "flex", gap: 8}}>
      <label htmlFor="task" className="sr-only">New Task</label>
      <input
        id="task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g., Finish lab write-up"
        aria-label="New Task"
        //222 add
        aria-invalid={!isValid && trimmed.length > 0}
        ///end 222 add
        //change button line
        />
        
      <button type="submit" disabled={!isValid} title="Enter at least 3 characters">
        ADD
      </button>
    </form>
  )
  //end change
}
