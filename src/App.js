import React, {useState, useEffect} from 'react';
import Whiskeys from './components/Whiskeys.js'
import './App.css';

function App() {
  
  const [whiskeys, setWhiskeys] = useState([])
  const [formInputs, updateFormInputs] = useState({
    name: '',
    distiller: '',
    origin:'',
    img:''
  })
  const handleChange = (event) =>{
    const updateInput = Object.assign({}, formInputs, { [event.target.id]: event.target.value})
    updateFormInputs(updateInput)
  }
  const handleSubmit = (event) =>{
    event.preventDefault()
    console.log(formInputs)
  }
  
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
     <nav>
       <h4>Submit a whiskey!</h4>
       <form onSubmit={handleSubmit}>
         <label htmlFor="name">Name</label>
         <input type='text' id='name' value={formInputs.name}
         onChange={handleChange}/>
         <label htmlFor='distiller'>Distillery</label>
         <input type='text' id='distiller' value={formInputs.distiller}
         onChange={handleChange} />
         <label htmLFor="origin">Origin</label>
         <input type='text' id='origin' value={formInputs.origin}
         onChange={handleChange}/>
         <label htmlFor='img'>Image</label>
         <input type='text' id='img' value={formInputs.img}
         onChange={handleChange}/>
       </form>
     </nav>
      <main>
        <Whiskeys whiskeyData = {whiskeys}/>
      </main>
    </div>
  );
}

export default App;
