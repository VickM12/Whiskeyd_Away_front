import React, {useEffect, useState} from 'react'
// import axios from 'axios'

export default function Whiskeys(props) {
//   const [whiskeys, setWhiskeys] = useState([])
  
//   const getData = async() => {
//   try {
//     const response = await fetch('localhost:3000/whiskeys')
//   const whiskeyData = await response.json()
//   setWhiskeys(whiskeyData)
//   console.log(whiskeyData)
//   } catch (error){
//     console.log(error)
//   } 
// }
// useEffect(() => {
//   (async function () {
//       await getData();
//   })();
// }, []);
  return(
    <div>
      <h1>Whiskey!</h1>
      { props.whiskeyData.map(whiskey => {
        return (
      <ul key={whiskey.name}>
        <li>{whiskey.name}</li>
        <li>{whiskey.distiller}</li>
        <li>{whiskey.origin}</li>
      </ul>
        )})
      }
    </div>
  )

}