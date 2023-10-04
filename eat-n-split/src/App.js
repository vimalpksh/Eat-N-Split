import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAdd, setshowAdd] = useState(false);
  const [friends, setFriend] = useState(initialFriends);
  const [selectFriend, setSelectedFriend] = useState(null);
  function addNewFriend(friend) {
    setFriend((oldObject) => [...oldObject, friend]);
    setshowAdd(false);
  }

  function handleShowAdd() {
    setshowAdd((show) => !show);
  }

  function handleSelectedFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setshowAdd(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friend={friends}
          handleFriend={handleSelectedFriend}
          selectFriend={selectFriend}
        />
        ;{showAdd && <FormAddFriend handleAddFriend={addNewFriend} />}
        <Button onClick={handleShowAdd}>
          {showAdd ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectFriend && <FormSplitBill selectFriend={selectFriend} />}
    </div>
  );
}

function FriendsList({ friend, handleFriend, selectFriend }) {
  return (
    <ul>
      {friend.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          handleFriend={handleFriend}
          selectFriend={selectFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, handleFriend, selectFriend }) {
  const isSelected = selectFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$.
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} ows you {Math.abs(friend.balance)}$.
        </p>
      )}

      {friend.balance === 0 && (
        <p className="red">You and {friend.name} are even.</p>
      )}

      <Button onClick={() => handleFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ handleAddFriend }) {
  const [name, setName] = useState(" ");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    handleAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>📊 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectFriend.name}</h2>
      <label>👍 Bill Value</label>
      <input type="text" />
      <label>😎 Your expense</label>
      <input type="text" />
      <label>👨🏿‍🤝‍👨🏻 {selectFriend.name}'s expense</label>
      <input type="text" disabled />
      <label>😛 Who is paying the bill?</label>
      <select>
        <option>You</option>
        <option>{selectFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
