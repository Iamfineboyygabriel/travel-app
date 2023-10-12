import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([]); //GLOBAL USE STATE

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  //FUNCTION THAT HANDLE DELETE ITEM
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  //FUNCTION THAT DELETE ALLL ITEM AND CLEAR INPUT
  function handleClear() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items ?"
    );
    //HERE WE WILL WOULD CREATE A VARIABLE THAT ASK IF USER WANTS TO DELETE OR CLEAR INPUT FIELD , WHEN THE USER CLICK ON "OK" IT WILL BE CLEARED
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <ParkingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClear} //WE PASS THE CLEAR INPUT FAS A PROPS HERE AFTER CREATTIN THE FUNCTION
      />
      <Stats items={items} />
    </div>
  );
}

export default App;

function Logo() {
  return <h1>✈️Far Away💼</h1>
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    // WHEN WE SUBMIT A FORM THE FORM SHOULD GO BACK TO ITS INITIAL STATE. HERE WE USE A SETTER FUNCTION
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {" "}
            {/*AN ARRAY FOR THE OPTIONE */}
            {num}
          </option>
        ))}
        ;
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function ParkingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  //HERE WE CREATE A NEW PEICE OF STATE FOR THE SORTING ITEM OPTION
  const [sortBy, setSortBy] = useState("input"); //By default its going to be the input
  //stop

  {
    /*HERE WE CREATE A NEW ITEM WHICH IS SORTED BY THE CRITERIA USING A DERIVED STATE TO BE DISPLAYEDON THE SCREEN */
  }
  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map(
          (
            item //HERE IS STEAD OD ITEMS.MAP WE USE SORTED ITEM
          ) => (
            <Item
              item={item}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
              key={item.id}
            />
          )
        )}
        ;
      </ul>

      <div className="Actions">
        {" "}
        {/*SORTING INPUTS, first of all create a new piece of state */}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {/**HERE WE USE THE STATE DECLARED ABOVE */}
          <option value="input">Sort by the input order</option>
          <option value="description">Sort by description</option>
          <option value="input">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list🚀</em>
      </p>
    );
  const numItem = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItem) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything ready to go ✈️"
          : `💼 You Have ${numItem} item(s) on your list and you already packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
