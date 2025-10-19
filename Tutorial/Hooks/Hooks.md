
### 🧠 **Definition**

> A Hook is a built-in or custom function that allows you to “hook into” React features such as state management, lifecycle methods, and side effects from a functional component.

---

### ⚙️ **Why Hooks?**

Before hooks, you could only use **state** and **lifecycle methods** in  **class components** .

Hooks allow you to do the same in  **function components** , making them:

* Easier to read and test
* Less boilerplate
* Easier to reuse logic across components

---

### 🧩 **Common Built-in Hooks**

| Hook                | Purpose                                                                 | Example                                                         |
| ------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| `useState`        | Add**state**to a function component                               | `const [count, setCount] = useState(0)`                       |
| `useEffect`       | Run**side effects**(e.g., API calls, timers)                      | `useEffect(() => { fetchData() }, [])`                        |
| `useContext`      | Access**context values**                                          | `const theme = useContext(ThemeContext)`                      |
| `useRef`          | Access**DOM elements or persist values**                          | `const inputRef = useRef(null)`                               |
| `useMemo`         | **Memoize** computed values for performance                       | `const result = useMemo(() => compute(), [deps])`             |
| `useCallback`     | **Memoize**callback functions                                     | `const handleClick = useCallback(() => doSomething(), [])`    |
| `useReducer`      | Manage**complex state logic**                                     | `const [state, dispatch] = useReducer(reducer, initialState)` |
| `useLayoutEffect` | Like `useEffect`, but runs**synchronously after DOM mutations** | `useLayoutEffect(() => {...})`                                |

---

### 🧠 **Custom Hooks**

You can also create your own hooks to reuse logic.

Example:

```jsx
import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return width;
}

// Usage
function App() {
  const width = useWindowWidth();
  return <p>Window width: {width}</p>;
}
```

---

### 🧩 **Rules of Hooks**

1. **Only call hooks at the top level** — don’t use them inside loops, conditions, or nested functions.
2. **Only call hooks from React functions** — either React components or custom hooks.


---



🧠 **What is `useState`?**

`useState` is a **React Hook** that lets you **add state** to a functional component.

In plain terms:

- It allows your component to **remember data** between re-renders.
- When the state changes, the component **automatically re-renders** with the new value.

---

### ⚙️ **Syntax**

```jsx
const [stateVariable, setStateFunction] = useState(initialValue);
```

| Part                 | Meaning                            |
| -------------------- | ---------------------------------- |
| `stateVariable`    | Current value of the state         |
| `setStateFunction` | Function used to update the state  |
| `initialValue`     | Initial/default value of the state |

---

### 🧩 **Example: Counter App**

```jsx
import React, { useState } from 'react';

function Counter() {
  // Declare a state variable "count" with initial value 0
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
```

---

### 🔍 **How It Works**

1. When the component first renders, React sets `count = 0`.
2. When you click **Increase**, `setCount(count + 1)` updates the state.
3. React **re-renders** the component, showing the new value of `count`.

---

### ⚡ **Key Points**

- You can use multiple `useState` hooks in one component.
- State updates are **asynchronous** — React may batch them for performance.
- The setter function (`setCount`) **replaces** the previous value, it doesn’t merge it (unlike `this.setState` in class components).

---

### 🧠 **Example: Multiple State Variables**

```jsx
function UserInfo() {
  const [name, setName] = useState("Ahmad");
  const [age, setAge] = useState(23);

  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>

      <button onClick={() => setName("Raza")}>Change Name</button>
      <button onClick={() => setAge(age + 1)}>Increase Age</button>
    </div>
  );
}
```


---

### 🧠 **What is `useEffect`?**

`useEffect` is a **React Hook** that lets you **perform side effects** in functional components.

A **side effect** is any operation that affects something outside the component, such as:

* Fetching data from an API
* Manipulating the DOM directly
* Setting up subscriptions or timers
* Logging or interacting with localStorage

---

### ⚙️ **Syntax**

```jsx
useEffect(() => {
  // side effect logic here
  return () => {
    // cleanup logic (optional)
  };
}, [dependencies]);
```

| Part                | Meaning                                                           |
| ------------------- | ----------------------------------------------------------------- |
| `() => {}`        | The effect function – code to run after render                   |
| `return () => {}` | Optional cleanup function (runs before next effect or on unmount) |
| `[dependencies]`  | Controls**when**the effect runs                             |

---

### 🧩 **Example 1: Run on Every Render**

```jsx
import React, { useState, useEffect } from "react";

function Example1() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component rendered or updated!");
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```

**Explanation:**

* The effect runs  **after every render** , because there’s  **no dependency array** .
* Every time you click the button, the component re-renders, and the effect runs again.

---

### 🧩 **Example 2: Run Only Once (on Mount)**

```jsx
useEffect(() => {
  console.log("Component mounted!");
}, []);
```

**Explanation:**

* The **empty dependency array `[]`** tells React to run the effect **only once** — after the first render.
* Commonly used for:
  * Fetching data from an API
  * Initializing subscriptions
  * Setting up timers

---

### 🧩 **Example 3: Run When Dependencies Change**

```jsx
useEffect(() => {
  console.log(`Count changed: ${count}`);
}, [count]);
```

**Explanation:**

* This effect runs  **only when `count` changes** .
* The dependency array `[count]` tells React to re-run this effect whenever `count` updates.

---

### 🧩 **Example 4: Cleanup Function**

Used when you need to  **unsubscribe, clear timers, or clean up resources** .

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running timer...");
  }, 1000);

  // Cleanup when component unmounts or before running next effect
  return () => {
    clearInterval(timer);
    console.log("Timer cleared!");
  };
}, []);
```

**Explanation:**

* The cleanup function runs before the component unmounts or before the next effect runs.
* Prevents memory leaks or unwanted behavior.

---

### ⚡ **Real-life Example: Fetch API Data**

```jsx
import React, { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    }
    fetchData();
  }, []); // Runs only once (on mount)

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}
```

---

### 🧩 **Key Takeaways**

| Situation                 | Dependency | Runs When                        |
| ------------------------- | ---------- | -------------------------------- |
| No dependency             | none       | After every render               |
| Empty array `[]`        | none       | Only once (on mount)             |
| With variables `[a, b]` | a, b       | When any listed variable changes |


---

### 🧠 **What is `useContext`?**

`useContext` is a React Hook that allows you to **access data from a Context** directly inside a **functional component** — without passing props manually through every level of the component tree.

It helps share **global data** (like theme, user info, authentication state, language, etc.) across many components easily.

---

### ⚙️ **Why do we need `useContext`?**

Normally, data flows **top-down** via props.

Example problem (without context):

```jsx
function App() {
  return <Parent theme="dark" />;
}

function Parent({ theme }) {
  return <Child theme={theme} />;
}

function Child({ theme }) {
  return <GrandChild theme={theme} />;
}

function GrandChild({ theme }) {
  return <p>Current theme: {theme}</p>;
}
```

Here, `theme` is passed **through every component** → this is called  **prop drilling** .

It becomes messy when your app grows.

---

### ✅ **Solution: Context + `useContext`**

`useContext` allows you to directly access the `theme` value  **from anywhere** , without passing it manually.

---

### 🧩 **Step-by-Step Example**

#### 1. Create Context

```jsx
import React, { createContext, useContext } from "react";

// Create a Context object
const ThemeContext = createContext();
```

---

#### 2. Provide Context (at a higher level)

```jsx
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

`ThemeContext.Provider` makes the value `"dark"` available to all nested components.

---

#### 3. Consume Context (using `useContext`)

```jsx
function Toolbar() {
  return <Button />;
}

function Button() {
  const theme = useContext(ThemeContext); // Access context value directly
  return <button style={{ background: theme === "dark" ? "black" : "white", color: "white" }}>
    Theme: {theme}
  </button>;
}
```

---

### ⚡ **How it works**

1. `createContext()` creates a  **Context object** .
2. The `Provider` wraps components and **provides** a value.
3. Any child can use `useContext(MyContext)` to **consume** the value.

---

### 🧠 **Example with Dynamic State**

Let’s make it interactive with a theme toggle:

```jsx
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <Button />;
}

function Button() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div style={{
      background: theme === "dark" ? "#333" : "#eee",
      color: theme === "dark" ? "#fff" : "#000",
      padding: "20px"
    }}>
      <p>Current Theme: {theme}</p>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>
    </div>
  );
}
```

**Explanation:**

* The context now stores both `theme` and `setTheme`.
* Any component inside the provider can read or update it easily using `useContext`.

---

### 🧩 **Key Points**

| Concept                            | Description                              |
| ---------------------------------- | ---------------------------------------- |
| `createContext()`                | Creates a new Context object             |
| `<Context.Provider value={...}>` | Makes data available to child components |
| `useContext(Context)`            | Reads the current context value          |
| No prop drilling                   | Components directly access shared data   |
| Works with state                   | Can store and update global state        |


---

### 🧠 **What is `useRef`?**

`useRef` is a **React Hook** that lets you:

1. **Access DOM elements directly** , and
2. **Store mutable values** that persist across re-renders (without causing re-renders).

It’s like a **“box”** that holds a value — React doesn’t watch it for changes, so updating it  **won’t trigger a re-render** .

---

### ⚙️ **Syntax**

```jsx
const ref = useRef(initialValue);
```

| Part             | Meaning                                       |
| ---------------- | --------------------------------------------- |
| `ref`          | A reference object `{ current: value }`     |
| `initialValue` | The initial value stored inside the reference |

---

### 🧩 **1. Accessing DOM Elements**

This is the most common use case.

```jsx
import React, { useRef } from "react";

function InputFocus() {
  const inputRef = useRef(null); // create a ref for the input element

  const handleFocus = () => {
    inputRef.current.focus(); // access DOM element directly
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

export default InputFocus;
```

**Explanation:**

* `inputRef` is linked to the `<input>` element through `ref={inputRef}`.
* `inputRef.current` gives direct access to that DOM node.
* When the button is clicked, it focuses the input element.

---

### 🧩 **2. Storing Mutable Values Without Re-rendering**

`useRef` can store **any value** (not just DOM nodes).

Unlike `useState`, updating a ref **does not re-render** the component.

```jsx
import React, { useState, useRef, useEffect } from "react";

function Timer() {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => setCount(c => c + 1), 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current); // cleanup on unmount
  }, []);

  return (
    <div>
      <h2>Timer: {count}s</h2>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

export default Timer;
```

**Explanation:**

* `timerRef` holds the interval ID.
* It persists even after re-renders, but updating it doesn’t trigger a re-render.
* `useEffect` cleans it up when the component unmounts.

---

### 🧩 **3. Tracking Previous Value**

You can use `useRef` to remember the **previous state** or value across renders.

```jsx
import React, { useState, useEffect, useRef } from "react";

function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCount = useRef();

  useEffect(() => {
    prevCount.current = count; // update ref after every render
  });

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount.current}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```

**Explanation:**

* `prevCount` stores the  **previous render’s value** .
* Because refs persist between renders, we can access old values easily.

---

### ⚡ **Key Differences: `useRef` vs `useState`**

| Feature                          | `useRef`                            | `useState`                            |
| -------------------------------- | ------------------------------------- | --------------------------------------- |
| Triggers re-render when changed? | ❌ No                                 | ✅ Yes                                  |
| Persists across renders?         | ✅ Yes                                | ✅ Yes                                  |
| Best for                         | Accessing DOM, storing mutable values | Managing component data that affects UI |

---

### 🧩 **Common Use Cases**

✅ Accessing DOM elements (`focus`, `scroll`, etc.)

✅ Storing timer IDs, previous values

✅ Holding data that shouldn’t trigger re-render

✅ Managing third-party library instances (e.g., charts, video players)


---

### 🧠 **What is `useMemo`?**

`useMemo` is a React Hook that **memoizes (remembers)** the **result** of an expensive computation so that it **doesn’t re-run unnecessarily** on every render.

In short:

> It helps you **avoid re-computing** values unless certain dependencies have changed.

---

### ⚙️ **Syntax**

```jsx
const memoizedValue = useMemo(() => computeValue(a, b), [a, b]);
```

| Part                         | Description                                          |
| ---------------------------- | ---------------------------------------------------- |
| `() => computeValue(a, b)` | Function containing the expensive computation        |
| `[a, b]`                   | Dependency array – recompute only when these change |
| `memoizedValue`            | Cached (remembered) result of that computation       |

---

### 💡 **Why use it?**

Every time a React component re-renders:

* All functions inside run again
* This can be **slow** if your function does complex calculations or processes large data

`useMemo` tells React:

> “Only re-run this function if its inputs have changed. Otherwise, use the cached value.”

---

### 🧩 **Example 1: Basic Usage**

```jsx
import React, { useState, useMemo } from "react";

function ExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);

  const doubleCount = useMemo(() => {
    console.log("Calculating...");
    // simulate an expensive calculation
    for (let i = 0; i < 1000000000; i++) {}
    return count * 2;
  }, [count]); // recompute only when 'count' changes

  const themeStyle = {
    backgroundColor: dark ? "#333" : "#fff",
    color: dark ? "#fff" : "#333",
    padding: "20px",
    margin: "20px",
  };

  return (
    <div style={themeStyle}>
      <h2>Double: {doubleCount}</h2>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <button onClick={() => setDark(!dark)}>Toggle Theme</button>
    </div>
  );
}

export default ExpensiveCalculation;
```

**Explanation:**

* Without `useMemo`, the “Calculating…” loop runs **every time** you toggle the theme (even though `count` didn’t change).
* With `useMemo`, the result is **cached** and only recomputed when `count` changes.

---

### 🧩 **Example 2: Filtering Large Lists**

```jsx
import React, { useState, useMemo } from "react";

function FilterList() {
  const [search, setSearch] = useState("");
  const users = ["Ahmad", "Raza", "Rahul", "Sara", "Ankit", "Sofia"];

  const filteredUsers = useMemo(() => {
    console.log("Filtering...");
    return users.filter(user => user.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div>
      <input
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.map(u => <li key={u}>{u}</li>)}
      </ul>
    </div>
  );
}
```

**Explanation:**

* The filtering runs only when `search` changes.
* Without `useMemo`, it would run on  **every render** , even if unrelated state updates occurred.

---

### ⚡ **Key Points**

| Concept                                   | Explanation                                                         |
| ----------------------------------------- | ------------------------------------------------------------------- |
| `useMemo`caches values                  | Avoids re-computation of expensive functions                        |
| Depends on dependency array               | Recalculates only when dependencies change                          |
| Returns a**value** , not a function | Unlike `useCallback`, which memoizes functions                    |
| Used for performance optimization         | Especially in large lists, heavy calculations, or nested components |

---

### 🧩 **`useMemo` vs `useCallback`**

| Hook            | Caches                   | Returns                     | Used For                                      |
| --------------- | ------------------------ | --------------------------- | --------------------------------------------- |
| `useMemo`     | Computed**values** | Result of a function        | Expensive calculations                        |
| `useCallback` | **Functions**      | Memoized function reference | Prevent unnecessary re-creations of functions |


---

### 🧠 **What is `useCallback`?**

`useCallback` is a **React Hook** that **memoizes (remembers)** a **function** so that it **doesn’t get recreated** on every re-render — unless its dependencies change.

In simple words:

> It returns a **cached version** of the function, helping prevent **unnecessary re-renders** in child components that depend on that function.

---

### ⚙️ **Syntax**

```jsx
const memoizedCallback = useCallback(() => {
  // function logic
}, [dependencies]);
```

| Part                 | Description                                   |
| -------------------- | --------------------------------------------- |
| `() => {}`         | The function you want to memoize              |
| `[dependencies]`   | Function is re-created only when these change |
| `memoizedCallback` | The cached function reference                 |

---

### 🧩 **Problem Without `useCallback`**

In React, every time a component re-renders, **all its functions are recreated** — even if they look identical.

That means if you pass a function as a **prop** to a child component, the child will also re-render unnecessarily.

Example:

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("Clicked");
  };

  console.log("Parent Rendered");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <Child onClick={handleClick} />
    </div>
  );
}

function Child({ onClick }) {
  console.log("Child Rendered");
  return <button onClick={onClick}>Click Child</button>;
}
```

**Issue:**

* When you click  **Increase** , the parent re-renders.
* `handleClick` gets **recreated** (new function reference).
* So, even though `Child` props *look* the same, React re-renders the child too.

---

### ✅ **Solution: useCallback**

```jsx
import React, { useState, useCallback } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []); // function reference stays same unless dependencies change

  console.log("Parent Rendered");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <Child onClick={handleClick} />
    </div>
  );
}

const Child = React.memo(({ onClick }) => {
  console.log("Child Rendered");
  return <button onClick={onClick}>Click Child</button>;
});
```

**Explanation:**

* `useCallback` keeps the same `handleClick` reference between renders.
* `React.memo` prevents `Child` from re-rendering if props didn’t change.
* Now, when you increase the counter, only the **Parent** re-renders — not the  **Child** .

---

### 🧩 **Example with Dependencies**

If the function uses variables from the component, include them in the dependency array.

```jsx
const increment = useCallback(() => {
  setCount(count + 1);
}, [count]);
```

This ensures React re-creates the function **only** when `count` changes.

---

### ⚡ **Key Points**

| Concept         | Explanation                                    |
| --------------- | ---------------------------------------------- |
| Purpose         | Caches (memoizes) functions                    |
| Returns         | A**memoized function reference**         |
| Re-created when | Dependencies change                            |
| Prevents        | Unnecessary re-renders of child components     |
| Works well with | `React.memo`(for memoizing child components) |

---

### 🧠 **`useCallback` vs `useMemo`**

| Hook            | Memoizes                | Returns              | Used For                         |
| --------------- | ----------------------- | -------------------- | -------------------------------- |
| `useMemo`     | Computed**value** | Result of a function | Expensive calculations           |
| `useCallback` | **Function**      | Function itself      | Prevent re-creation of functions |

---

### 🧩 **Practical Example:**

```jsx
import React, { useState, useCallback } from "react";

function App() {
  const [todos, setTodos] = useState(["Learn React"]);
  const [count, setCount] = useState(0);

  const addTodo = useCallback(() => {
    setTodos((prev) => [...prev, "New Task"]);
  }, []);

  return (
    <div>
      <TodoList todos={todos} addTodo={addTodo} />
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
}

const TodoList = React.memo(({ todos, addTodo }) => {
  console.log("TodoList Rendered");
  return (
    <div>
      <h3>Todo List</h3>
      {todos.map((t, i) => (
        <p key={i}>{t}</p>
      ))}
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
});
```

**Behavior:**

* Without `useCallback`, every count update would also re-render `TodoList`.
* With `useCallback`, `addTodo` keeps the same reference → `TodoList` doesn’t re-render unnecessarily.


---



`useReducer` is a **React Hook** used to manage **complex state logic** in functional components — especially when the state depends on multiple sub-values or when the next state depends on the previous one.

It’s an **alternative to `useState`** and is often preferred for **state transitions** (like in Redux).

---

### 🧩 Syntax

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

* **`reducer`** → A function that defines how the state should change.
* **`initialState`** → The starting value of the state.
* **`state`** → Current state value.
* **`dispatch`** → Function used to send an action to the reducer.

---

### ⚙️ Reducer Function

A reducer is a **pure function** that takes the **current state** and an **action** and returns a  **new state** .

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state
  }
}
```

---

### ✅ Example: Counter using `useReducer`

```javascript
import React, { useReducer } from 'react';

function Counter() {
  // 1. Define the reducer function
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      case 'reset':
        return { count: 0 };
      default:
        return state;
    }
  }

  // 2. Initialize reducer with initial state
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

export default Counter;
```

---

### 🧠 When to Use `useReducer` Instead of `useState`

Use `useReducer` when:

* State logic is  **complex or involves multiple sub-values** .
* Next state depends on  **previous state** .
* You want **predictable state transitions** (like Redux).
* You want to make state updates  **clearer and centralized** .

---

### 🧾 Summary Table

| Term               | Description                                                            |
| ------------------ | ---------------------------------------------------------------------- |
| **Reducer**  | Function that handles state transitions based on actions               |
| **State**    | Current data stored in the component                                   |
| **Dispatch** | Function to send an action to update the state                         |
| **Action**   | Object describing what change to make (e.g.,`{ type: 'increment' }`) |

---


`useLayoutEffect` is a **React Hook** that works similarly to `useEffect`, but it runs **synchronously after all DOM mutations** and  **before the browser repaints the screen** .

This means it allows you to **read layout (DOM measurements)** and **make visual updates** *before* the user sees the changes — preventing flickers or visual jumps.

---

### 🧩 Syntax

```javascript
useLayoutEffect(() => {
  // Perform DOM reads or synchronously trigger re-render
  return () => {
    // Cleanup (like removing event listeners)
  };
}, [dependencies]);
```

---

### ⚙️ Difference Between `useEffect` and `useLayoutEffect`

| Feature                     | `useEffect`                                                  | `useLayoutEffect`                              |
| --------------------------- | -------------------------------------------------------------- | ------------------------------------------------ |
| **Execution Timing**  | Runs*after*the browser paints                                | Runs*before*the browser paints                 |
| **Blocking Behavior** | Non-blocking (asynchronous)                                    | Blocking (synchronous)                           |
| **Use Case**          | Side effects that don’t affect layout (e.g., API calls, logs) | Reading DOM or updating layout before paint      |
| **Performance**       | Faster for general use                                         | Slightly slower, should be used only when needed |

---

### ✅ Example: Measuring DOM Size with `useLayoutEffect`

```javascript
import React, { useLayoutEffect, useRef, useState } from 'react';

function BoxMeasurement() {
  const boxRef = useRef(null);
  const [boxWidth, setBoxWidth] = useState(0);

  useLayoutEffect(() => {
    // Read layout immediately after DOM mutation
    if (boxRef.current) {
      setBoxWidth(boxRef.current.offsetWidth);
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div
        ref={boxRef}
        style={{
          width: "200px",
          height: "100px",
          backgroundColor: "lightblue",
          border: "1px solid black",
        }}
      >
        Measured Box
      </div>
      <p>Box width: {boxWidth}px</p>
    </div>
  );
}

export default BoxMeasurement;
```

**Explanation:**

* The `useLayoutEffect` hook runs  **right after React updates the DOM** , but **before** the screen is painted.
* It measures the `offsetWidth` of the box synchronously.
* This prevents flickering that might occur if we used `useEffect` instead.

---

### 🧠 When to Use `useLayoutEffect`

Use it  **only when** :

* You need to **read layout measurements** (like `offsetHeight`, `scrollWidth`, etc.).
* You need to **make DOM changes** before the browser repaints.
* You’re dealing with **animations** or  **synchronous visual updates** .

---

### ⚠️ Caution

* Overusing `useLayoutEffect` can **block rendering** and hurt performance.
* Prefer `useEffect` unless you  **specifically need synchronous DOM updates** .
