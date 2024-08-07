import { Children, useState } from "react";

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

function App() {
  const [addForm, setAddForm] = useState(false);
  const [friendList, setFriendList] = useState([...initialFriends]);
  const [click, setClick] = useState(null);
  function openForm() {
    setAddForm(!addForm);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friendList={friendList} click={click} setClick={setClick} />
        {addForm && (
          <FormAddFriend
            setFriendList={setFriendList}
            friendList={friendList}
          />
        )}
        <Button onClick={openForm}>{addForm ? "close" : "Add Friend"}</Button>
      </div>
      {click && <FormSplitBill friend={click} />}
    </div>
  );
}

function FriendList({ friendList, click, setClick }) {
  const friends = friendList;

  return (
    <ul>
      {friends.map((friend) => (
        <Friends
          friend={friend}
          key={friend.id}
          click={click}
          setClick={setClick}
        />
      ))}
    </ul>
  );
}

function Friends({ friend, click, setClick }) {
  function changeState(friend) {
    if (friend === click) setClick(null);
    else setClick(friend);
  }
  return (
    <li className={click === friend ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name}
          {friend.balance}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name}
          {friend.balance}
        </p>
      )}
      {friend.balance === 0 && (
        <p>
          You and {friend.name}
          are even.
        </p>
      )}
      <Button onClick={() => changeState(friend)}>
        {click === friend ? "close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ friendList, setFriendList }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const id = crypto.randomUUID();

  function addFriend(e) {
    e.preventDefault();
    if (!image || !name) return;
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    setFriendList(() => [...friendList, newFriend]);
    setImage("https://i.pravatar.cc/48");
    setName("");
  }
  return (
    <form className="form-add-friend" onSubmit={addFriend}>
      <label>😁Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(val) => setName(val.target.value)}
      />

      <label>😴Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(val) => setImage(val.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ friend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend.name}</h2>
      <label>😛Bill Value</label>
      <input type="'text" />

      <label>😛Your expense</label>
      <input type="'text" />

      <label>😛{friend.name}'s expense</label>
      <input type="'text" disabled />

      <label>😛Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
export default App;
