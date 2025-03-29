import React, { useState } from "react";

//import {Container, Col,  Row} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./BillMade.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { initialFriends } from "./Componentdata";

function Buttons({ children, onClick }) {
  return (
    <button type="button" className="btn btn-warning m-3" onClick={onClick}>
      {children}
    </button>
  );
}

export default function BillMade() {
  const [friends, setFriends] = useState(initialFriends); // STEP-1 => new friends add krne ke liye initialFriends ke sath

  const [showAddFriend, setshowAddFriend] = useState(false); //STEP-1 => Firend ko add krne waale form ko show krvane ke liye

  const [selectedFriend, setSelectedFriend] = useState(null); // STEP-1 => FormSplitBill waale form ko hide krna or {Select} button prr click krne prr visible hone ke liye

  function handleShowAddFriend() {
    // STEP-2 => {Add friend} button ke liye function
    setshowAddFriend((show) => !show); // es line ka mtlb hai function tbii show kre ga jb form show visibel na ho
    //  mtlb button click hone prr hi shoe hoga
  }

  function handleAddFriend(friend) {
    // STEP-2 => new friend ko add krne ke liye function
    setFriends((friends) => [...friends, friend]); //jo new friend add hoga woo friends se aaye ga or ...friends initialfriends ko print kre gaa.
    setshowAddFriend(false); // jaise hi new friend add hoge tbi form visibility khtm ho jaaye gi
  }

  function handleSelection(friend) {
    // STEP-2 => {Select} buttons ke liye function jis ke click hone prr yehe function work kre ga
    //setSelectedFriend(friend); // jis friend ke {Select} button prr click hoga uska data useState me jaaye gaa
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend)); // es condition ke sath hum button ki select or close dono state ka use krr skte hai  cur? is fixing a bug jo ki setSelectedfriend ke null hone prr hoggi
    setshowAddFriend(false);
  }

  function handlesplitBill(value) {
    console.log(value);

    setFriends(
      (friends) =>
        friends.map((friend) =>
          friend.id === selectedFriend.id
            ? { ...friend, balance: friend.balance + value }
            : friend
        ) // jb friend.id, selectedFriend.id ke equal ho to friend or balance ka arry tyarr ho or usme hum friend.balace lo access krr ke value ke sath jodd dege. agr equal na ho to friend list show vse hi hoggi jesii hai.
    );
  }

  return (
    <Container className="">
      <Row>
        <Col className="m-1">
          <FriendList
            friends={friends}
            onSelection={handleSelection}
            selectedFriend={selectedFriend}
          />{" "}
          {}
          {showAddFriend && (
            <FormAddFriend onAddFriend={handleAddFriend} />
          )}{" "}
          {/* (showAddFriend &&) ki vjha se form ko hide rkha jaata jo button ke click hone prr show hota hai */}
          <Buttons onClick={handleShowAddFriend}>
            {showAddFriend ? "Close" : "Add friend"}
          </Buttons>{" "}
          {/* jb form hide hoga tb button (Add friend) hoga or jb form show hoga tb button (Close) hoga*/}
        </Col>
        <Col className="m-1">
          {selectedFriend && (
            <FormSplitBill
              selectedFriend={selectedFriend}
              onSplitBill={handlesplitBill}
              key={selectedFriend.id}
            />
          )}{" "}
          {/* And Opreator by default formspilitbill ko hide rkhe ga selectedfriend jb select kiya jai ga tbii form show hoga */}
        </Col>
      </Row>
    </Container>
  );
}

function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friends
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}{" "}
      {/* friends list ko access krne ke liye or use print krne ke liye loop ka use kiyaa gya hai*/}
    </ul>
  );
}

function Friends({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id; // selectedfriend? is fixing a bug jo setSelectedFriend ke null hone prr aaye gii
  return (
    <li className={isSelected ? "list" : ""}>
      <Image src={friend.image} roundedCircle className="img" />
      <div>
        <h3 className="name-list">{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="text-danger">
            You owe {friend.name} {Math.abs(friend.balance)} rupees.
          </p>
        )}
        {friend.balance > 0 && (
          <p className="text-success">
            {friend.name} owes you {Math.abs(friend.balance)} rupees.
          </p>
        )}
        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      </div>
      <Buttons onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Buttons>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(`/Image/.jpg`);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `/Image/${name}.jpg`,
      balance: 0,
    };
    //console.log(newFriend);
    onAddFriend(newFriend);

    setName("");
    setImage(`/Image/.jpg`);
  }
  return (
    <Form className="form-add-friend" onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={4}>
          Friend Name
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="NAME"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={4}>
          Image URL
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL"
          />
        </Col>
      </Form.Group>
      <Buttons onClick={handleSubmit}>Add</Buttons>
    </Form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  // const paidByFriend = bill - paidByUser ;  {useState mai empty string set ki gyii hai or ess condition mai value number mai set hoggi then =>}
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handleChange = (e) => {
    setPaidByUser(
      () =>
        Number(e.target.value) > bill ? paidByUser : Number(e.target.value) // ydhi
    );
    // let byUser =
    // Number(e.target.value) > bill ? paidByUser : Number(e.target.value);
    //console.log("paidByuser =", byUser);
    //console.log("paidByfriend =", bill ? bill - byUser : "");
    //console.log("bill = ", bill);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2> Split a bill with {selectedFriend.name}</h2>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={4}>
          Bill value
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            type="text"
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
            placeholder="value.."
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={4}>
          Your expense
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            type="text"
            value={paidByUser}
            //onChange={(e) => setPaidByUser(Number(e.target.value))} placeholder="" // es condition mai aapka expense Bill value se jyada ho skta hai usko set krne ke liye =>
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={4}>
          {selectedFriend.name}'s expense
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            type="text"
            disabled
            value={paidByFriend}
            onChange={(e) => paidByFriend}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={4}>
          Who is paying the bill
        </Form.Label>
        <Col sm={4}>
          <Form.Select
            aria-label="Default select example"
            value={whoIsPaying}
            onChange={(e) => setWhoIsPaying(e.target.value)}
          >
            <option value="user">You</option>
            <option value="friend">{selectedFriend.name}</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Buttons onClick={handleSubmit}>Split bill</Buttons>
    </form>
  );
}
