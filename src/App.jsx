import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState("");

  const API_BASE = "https://backend-kappa-lilac-14.vercel.app/items";

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const res = await axios.get(API_BASE);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  }

  async function save(e) {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_BASE}/${editId}`, { name: text });
      } else {
        await axios.post(API_BASE, { name: text });
      }
      reload();
    } catch (err) {
      console.error("Error saving item:", err);
    }
  }

  async function del(id) {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      reload();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  }

  function reload() {
    fetchItems();
    setText("");
    setEditId("");
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