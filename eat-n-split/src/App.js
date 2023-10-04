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
  function addNewFriend(friend) {
    setFriend((oldObject) => [...oldObject, friend]);
    setshowAdd(false);
  }

  function handleShowAdd() {
    setshowAdd((show) => !show);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friend={friends} />;
        {showAdd && <FormAddFriend handleAddFriend={addNewFriend} />}
        <Button onClick={handleShowAdd}>
          {showAdd ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friend }) {
  return (
    <ul>
      {friend.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
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

      <Button>Select</Button>
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

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <label>👍 Bill Value</label>
      <input type="text" />
      <label>😎 Your expense</label>
      <input type="text" />
      <label>👨🏿‍🤝‍👨🏻 X's expense</label>
      <input type="text" disabled />
      <label>😛 Who is paying the bill?</label>
      <select>
        <option>You</option>
        <option>X</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
