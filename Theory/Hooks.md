🔷 What Are Hooks?

**Hooks** are special functions that let you "hook into" React features (like state, lifecycle, context) in  **functional components** . They were introduced in **React 16.8** to replace class-based features like `this.state`, `componentDidMount`, etc.

> 🔥 Hooks only work inside functional components.

---

## ✅ Rules of Hooks

1. **Only call hooks at the top level**
   * Don't call hooks inside loops, conditions, or nested functions.
2. **Only call hooks from React functions**
   * Use inside functional components or custom hooks only.

---

## 📚 Common React Hooks

### 1. `useState` – State Management

Allows you to add **local state** to function components.

```jsx
const [count, setCount] = useState(0);
```

* `count` → current value of the state
* `setCount` → function to update the value

✅ Example:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

### 2. `useEffect` – Side Effects

Performs **side effects** like API calls, DOM manipulation, or timers.

```jsx
useEffect(() => {
  // code runs after render
}, [dependency]);
```

✅ Example:

```jsx
useEffect(() => {
  console.log("Component mounted or count changed");
}, [count]);
```

* Empty `[]` → Runs once on mount.
* `[count]` → Runs when `count` changes.
* No dependency → Runs on every render.

---

### 3. `useContext` – Access Context API

Used to **consume context values** created by `React.createContext()`.

```jsx
const value = useContext(MyContext);
```

✅ Example:

```jsx
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
}
```

---

### 4. `useRef` – Mutable Reference (no re-render)

Returns a **mutable ref object** that doesn't trigger re-renders on change.

✅ Example:

```jsx
const inputRef = useRef();

function focusInput() {
  inputRef.current.focus();
}
```

Use cases: focus input fields, store DOM refs, store timers.

---

### 5. `useMemo` – Memoize Computation

Used to **optimize performance** by memoizing expensive calculations.

```jsx
const result = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

---

### 6. `useCallback` – Memoize Functions

Returns a **memoized version of a function** that only changes if dependencies change.

```jsx
const handleClick = useCallback(() => {
  doSomething(a);
}, [a]);
```

---

### 7. `useReducer` – Complex State Logic

An alternative to `useState` for complex state management.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

✅ Example:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
}
```

---

## 🔨 Custom Hooks

You can also create your **own hooks** to reuse logic across components.

✅ Example:

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(count + 1);
  return [count, increment];
}
```

Use like:

```jsx
const [count, increment] = useCounter(5);
```

---

## 🧠 When to Use Which Hook?

| Use Case                          | Hook                        |
| --------------------------------- | --------------------------- |
| Local component state             | `useState`                |
| Side effects (API, timer, etc.)   | `useEffect`               |
| Context (global state)            | `useContext`              |
| DOM reference or persistent value | `useRef`                  |
| Optimizing performance            | `useMemo`,`useCallback` |
| Complex state logic               | `useReducer`              |

# Projects On Hooks

---

## 🔹 1. **Todo App with Local Storage**

### 📌 Hooks Used:

* `useState` – manage todos
* `useEffect` – save/load from `localStorage`

### 🧠 Features:

* Add, delete, mark as completed
* Persist data in browser

### 🔍 Sample Code Snippet:

```jsx
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

---

## 🔹 2. **Weather App using OpenWeatherMap API**

### 📌 Hooks Used:

* `useState` – store city & weather
* `useEffect` – fetch API data on city change
* `useRef` – manage input focus

### 🧠 Features:

* Search for city
* Display weather
* Autofocus on input using `useRef`

---

## 🔹 3. **Theme Toggle App using Context**

### 📌 Hooks Used:

* `useContext` – manage light/dark mode
* `useState` – toggle theme

### 🧠 Features:

* Light/dark mode toggle
* Theme shared across multiple components

### 🧱 Architecture:

* `ThemeContext.js`
* `App.js`
* `ThemeSwitcher.js`

---

## 🔹 4. **Stopwatch / Timer App**

### 📌 Hooks Used:

* `useState` – track time
* `useEffect` – run interval
* `useRef` – store timer ID

### 🧠 Features:

* Start, pause, reset timer
* Accurate interval management

### 🔍 Sample Code Snippet:

```jsx
useEffect(() => {
  timerRef.current = setInterval(() => {
    setSeconds((prev) => prev + 1);
  }, 1000);

  return () => clearInterval(timerRef.current);
}, []);
```

---

## 🔹 5. **Authentication App with useReducer + Context**

### 📌 Hooks Used:

* `useState` – form data
* `useReducer` – auth state (login/logout)
* `useContext` – global auth access

### 🧠 Features:

* Simple login/logout
* Global auth context
* Protected routes simulation

### 🧱 Structure:

* `AuthContext.js`
* `Login.js`, `Dashboard.js`
