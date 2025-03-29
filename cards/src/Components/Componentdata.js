import React from "react";

const pizzaData = [
  {
    id: 1,
    name: "Paneer Tikka Pizza",
    ingredients:
      "Pizza dough, tomato sauce, paneer, tikka masala sauce, bell peppars, onions and mozzarella cheese.",
    url: "/Image/Paneer-Tikka-Pizza.jpg",
    price: 150,
  },
  {
    id: 2,
    name: "Tandoori Chicken Pizza",
    ingredients:
      "Pizza dough, tomato sauce, tandoori chicken, bell peppars, red onions and mozzarella cheese.",
    url: "/Image/Tandoori-Chicken-Pizza.jpg",
    price: 170,
  },
  {
    id: 3,
    name: "Masala Pizza",
    ingredients:
      "Pizza dough, tomato sauce, garam masala, cumin, bell peppars, onions and a choic of protein like chicken or panner.",
    url: "/Image/Masala-Pizza.jpg",
    price: 150,
  },
  {
    id: 4,
    name: "Uttapam Pizza",
    ingredients:
      "Pizza dough, dosa butter, traditional uttapam toppings (tomato sauce, onion, green chilies) and cheese.",
    url: "/Image/Uttapam-Pizza.jpg",
    price: 140,
  },
  {
    id: 5,
    name: "Keema Pizza",
    ingredients:
      "Pizza dough, tomato sauce, spiced minced, meat, onions and mozzarella cheese.",
    url: "/Image/Keema-Pizza.jpg",
    price: 120,
  },
  {
    id: 6,
    name: "Onion Pizza",
    ingredients:
      "Pizza dough, tomato sauce, thinly sliced & caramelized onions and mozzarella cheese.",
    url: "/Image/Onion-Pizza-1.jpg",
    price: 150,
  },
];

const skills = [
  {
    skill: "12th",
    subject: "non-medical",
    color: "#2662EA",
    level: "strong",
  },
  {
    skill: "B.sc",
    subject: "chemistry",
    color: "#EFD81D",
    level: "strong",
  },
  {
    skill: "M.sc",
    subject: "mathmatics",
    color: "#C3DCAF",
    level: "strong",
  },
  {
    skill: "Bankers",
    subject: "all",
    color: "#E84F33",
    level: "normal",
  },
  {
    skill: "React",
    subject: "normal",
    color: "#60DAFB",
    level: "not known",
  },
  {
    skill: "Svelte",
    subject: "bignners",
    color: "#FF3800",
    level: "not known",
  },
];

const messages = [
  "Learn React ⚛",
  "Apply for Jobs 💼",
  "Invest your new Income 🤑",
];

const intialItems = [
  {
    id: 1,
    description: "passport",
    quantity: 2,
    packed: false,
  },
  {
    id: 2,
    description: "shoes",
    quantity: 4,
    packed: true,
  },
  {
    id: 3,
    description: "cloth",
    quantity: 8,
    packed: false,
  },
];

const questions = [
  {
    id: 3457,
    question: "What language is React based on ?",
    answer: "Javascript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React spp ?",
    answer: "Components",
  },
  {
    id: 8832,
    question:
      "What's the name of the syntax we use to descirbe a UI in React App ?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components ?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory ?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronises ?",
    answer: "Control elements",
  },
];

const faqs = [
  {
    title: "Where are these chairs assembler?",
    text: "assembled in factories.",
  },
  {
    title: "How long do i have to ruturn my chair ?",
    text: "in one year long turm uses.",
  },
];

const initialFriends = [
  {
    id: 118836,
    name: "Naveen Kumar",
    image: "/Image/naveen grag.jpg",
    balance: 500,
  },
  {
    id: 118837,
    name: "Subhkran Bishnoi",
    image: "/Image/subhkran.jpg",
    balance: 400,
  },
  {
    id: 118838,
    name: "Vakeel Singh",
    image: "/Image/vakeel singh.jpg",
    balance: -200,
  },
  {
    id: 118839,
    name: "Harmeet Gill",
    image: "/Image/harmeet gill.jpg",
    balance: 800,
  },
];

export {
  pizzaData,
  skills,
  messages,
  intialItems,
  questions,
  faqs,
  initialFriends,
};
