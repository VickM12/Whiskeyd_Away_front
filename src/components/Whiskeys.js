import React from 'react'
import { Link } from 'react-router-dom';
// import axios from 'axios'
import AddToFav from '../components/AddToFav.js'
export default function Whiskeys(props) {
  const state = props.state
//   const getData = async() => {
//   try {
//     const response = await fetch('http://localhost:3000/whiskeys')
//   const whiskeyData = await response.json()
//   setWhiskeys(whiskeyData)
//   console.log(whiskeyData)
//   } catch (error){
//     console.log(error)
//   } 
// }


// const handleDelete = async (id) => {
//   try{
//     await fetch(`http://localhost:3000/whiskeys/${whiskeys.id}`, 
//       {
//       method:'DELETE',
//       headers:{
//         'Content-Type': 'application/json'
//       }
//     }).then((response) => {
//       console.log('Whiskey was removed')
//     })
// }catch (error){
//   console.log(error)
// }
// }
// useEffect(() => {
//   (async function () {
//       await getData();
//   })();
// }, []);
  return(
    <div className="cardHolder">
      {/* <h1>Whiskey!</h1> */}
      
      { props.whiskeyData.map(whiskey => {
        return (
      <div className='cards'>
      <ul key={whiskey.id}>
        <li><Link to={`/${whiskey.id}`}><h2>{whiskey.name}</h2></Link></li>
        <li><img src={whiskey.image} alt={whiskey.name} /></li>
        <li><h3>{whiskey.distiller}</h3></li>
        <li><h3>{whiskey.origin}</h3></li>
        <AddToFav 
				whiskey = {whiskey}
				state= {state}
				handleFavorites = {props.handleFavorites} />
      <button onClick={props.handleDelete}>Remove from List</button>
      </ul>
      </div>
        )})
      }
      
    </div>
  )

}