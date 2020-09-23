import React, {useState, useEffect} from 'react';
import Whiskeys from './components/Whiskeys.js'
import './App.css';

function App() {
  
  const [whiskeys, setWhiskeys] = useState([])
  
  const getData = async() => {
  try {
    const response = await fetch('http://localhost:3000/whiskeys')
  const whiskeyData = await response.json()
  setWhiskeys(whiskeyData)
  console.log(whiskeyData)
  } catch (error){
    console.log(error)
  } 
}
useEffect(() => {
  (async function () {
      await getData();
  })();
}, []);
  return (
    <div className="App">
     
      <main>
        <Whiskeys whiskeyData = {whiskeys}/>
      </main>
    </div>
  );
}

export default App;
