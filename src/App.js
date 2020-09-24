import React, {useState, useEffect} from 'react';
import Whiskeys from './components/Whiskeys.js'
import './App.css';

function App() {
  const [whiskeys, setWhiskeys] = useState([])
  const [formInputs, updateFormInputs] = useState({
    name: '',
    distiller: '',
    origin:'',
    image:''
  })
  const handleChange = (event) =>{
    const updateInput = Object.assign({}, formInputs, { [event.target.id]: event.target.value})
    updateFormInputs(updateInput)
  }
  const handleSubmit = async (event) =>{
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/whiskeys', {
        body: JSON.stringify(formInputs),
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      updateFormInputs({
        name: '',
        distiller: '',
        origin:'',
        image:''
      })
      setWhiskeys([data, ...whiskeys])
      console.log(formInputs)
    }catch(error) {
      console.log(error)
    }
    
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
  const handleDelete = async (id) => {
    try{
      await fetch(`http://localhost:3000/whiskeys/${whiskeys.id}`, 
        {
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log('Whiskey was removed')
      })
  }catch (error){
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
         <label htmlFor="origin">Origin</label>
         <input type='text' id='origin' value={formInputs.origin}
         onChange={handleChange}/>
         <label htmlFor='img'>Image</label>
         <input type='text' id='image' value={formInputs.image}
         onChange={handleChange}/>
         <input type="submit" className="submit"/>
       </form>
     </nav>
      <main>
        <Whiskeys whiskeyData = {whiskeys} handleDelete= {handleDelete}  />
      </main>
    </div>
  );
}

export default App;
