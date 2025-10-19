✅ **React Basics: Questions and Answers**

#### 1. **What is React?**

**Answer:**

React is a JavaScript library developed by Facebook for building user interfaces, especially single-page applications (SPAs). It allows developers to build reusable UI components.

---

#### 2. **What are components in React?**

**Answer:**

Components are the building blocks of a React application. They can be functional or class-based, and they encapsulate the UI and logic for a part of the interface.

---

#### 3. **What is JSX?**

**Answer:**

JSX stands for JavaScript XML. It allows us to write HTML inside JavaScript and place components in a readable format.

---

#### 4. **What is the difference between Functional and Class Components?**

**Answer:**

* **Functional:** Uses functions, introduced with Hooks.
* **Class:** Uses ES6 classes, older way with lifecycle methods.

---

#### 5. **What is a prop in React?**

**Answer:**

Props (short for properties) are read-only data passed from a parent component to a child component.

---

#### 6. **What is state in React?**

**Answer:**

State is a built-in object used to store data that affects how the component renders and behaves. It is mutable and managed using the `useState` hook in functional components.

---

#### 7. **How do you handle events in React?**

**Answer:**

You handle events like this:

```jsx
<button onClick={handleClick}>Click Me</button>
```

Event handlers are camelCase (`onClick`, `onChange`, etc.).

---

#### 8. **What is a hook in React?**

**Answer:**

Hooks are functions that let you “hook into” React state and lifecycle features from functional components. Example: `useState`, `useEffect`.

---

#### 9. **What is `useState` hook?**

**Answer:**

`useState` allows you to add state to functional components.

```jsx
const [count, setCount] = useState(0);
```

---

#### 10. **What is `useEffect` hook?**

**Answer:**

`useEffect` lets you run side effects (like API calls) in function components.

```jsx
useEffect(() => {
  // runs on mount/update
}, []);
```

---

#### 11. **What is the virtual DOM?**

**Answer:**

The virtual DOM is a lightweight copy of the real DOM that React uses to determine the most efficient way to update the UI.

---

#### 12. **What is conditional rendering in React?**

**Answer:**

You can render elements based on condition:

```jsx
{isLoggedIn ? <Logout /> : <Login />}
```

---

#### 13. **How do you pass data between components?**

**Answer:**

* **Parent to Child:** via props
* **Child to Parent:** via callback functions passed as props

---

#### 14. **What is the purpose of `key` in a list?**

**Answer:**

Keys help React identify which items have changed, are added, or removed during rendering of lists. They must be unique.

---

#### 15. **What is React Router?**

**Answer:**

React Router is a library used to handle routing in React applications, allowing navigation without full page reloads.

---
