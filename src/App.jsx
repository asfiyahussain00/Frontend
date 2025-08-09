import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    axios.get("https://backend-kappa-lilac-14.vercel.app/items").then((res) => setItems(res.data));
  }, []);

  function save(e) {
    e.preventDefault();
    if (editId) {
      axios
        .put(`https://backend-kappa-lilac-14.vercel.app/items/${editId}`, { name: text })
        .then(() => reload());
    } else {
      axios
        .post("https://backend-kappa-lilac-14.vercel.app/items", { name: text })
        .then(() => reload());
    }
  }

  function del(id) {
    axios.delete(`https://backend-kappa-lilac-14.vercel.app/items/${id}`).then(() => reload());
  }

  function reload() {
    axios.get("https://backend-kappa-lilac-14.vercel.app/items").then((res) => {
      setItems(res.data);
      setText("");
      setEditId("");
    });
  }

  return (
    <div className="App">
      <form onSubmit={save}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <ul>
        {items.map((i) => (
          <li key={i._id}>
            {i.name}
            <button
              onClick={() => {
                setText(i.name);
                setEditId(i._id);
              }}
            >
              Edit
            </button>
            <button onClick={() => del(i._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
