import React from 'react';
import { useState } from 'react';

// First component
function Welcome() {
  return <h1>Welcome to React!</h1>;
}

// Second component
function Message() {
  return <p>This is your first multi-component file.</p>;
}


// Main App component rendering both
function App() {

  let [counter, SetCounter] = useState(15)

const AddValue = () => {
  if (counter < 19){
    
  SetCounter(counter + 1)
    
  }
 }

 const SubValue = () => {
  if (counter > 0 ){
    SetCounter(counter - 1)
  }
  
 }

  return (
    <div>
      <Welcome />
      <Message />



    <button onClick={AddValue}>Increment {counter}</button>

    <button onClick={SubValue}>Value {counter}</button>
    <p>{counter}</p>

    </div>
  );
}

export default App;
