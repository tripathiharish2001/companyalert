import React from "react";
import { useState } from "react";
import { json } from "react-router-dom";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskForm = () => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  // console.log("dispatch:", dispatch);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const task = { title, deadlineTime, deadlineDate, note };
    const response = await fetch("https://list-un9j.onrender.com/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    // console.log(json);

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setTitle("");
      setDeadlineTime("");
      setDeadlineDate("");
      setNote("");
      setError(null);
      setEmptyFields([]);
      // console.log(json, "hey s");
      console.log("creating task");
      dispatch({ type: "CREATE_TASK", payload: json });
    }
  };

  return (
    <div className="form-field">
      <form action="" className="create" onSubmit={handleSubmit}>
        <h3>Record Company's Deadline</h3>

        {/* company name */}
        <label htmlFor="">Company Name :</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
          // required
        />

        {/* Applications Closed Date : */}

        <label htmlFor="">Applications Closed Date :</label>
        <input
          type="text"
          onChange={(e) => {
            setDeadlineDate(e.target.value);
          }}
          value={deadlineDate}
          className={emptyFields.includes("deadlineDate") ? "error" : ""}
        />

        {/* company name */}
        <label htmlFor="">Applications Closed Time :</label>
        <input
          type="text"
          onChange={(e) => {
            setDeadlineTime(e.target.value);
          }}
          value={deadlineTime}
          className={emptyFields.includes("deadlineTime") ? "error" : ""}
        />

        {/* company name */}
        <label htmlFor="">Additional Notes :</label>
        <input
          type="text"
          onChange={(e) => {
            setNote(e.target.value);
          }}
          value={note}
        />
        <button>Add Deadline!</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default TaskForm;
