import React from 'react';
import axios from 'axios';


export default function AddToFav(props){
  

const handleFavorites= async (event)=>{
  try{
    const response = await axios.post('http://localhost:3000/ledgers', {
      ledger: {
        user_id: localStorage.id,
      whiskey_id: props.whiskey.id
      }
    }
    )
console.log(props.state)
console.log(response)
} catch (error){
console.log(error)
  }
}

return(
  <button className="favorite" value="Add To Favorites" onClick={handleFavorites}>Add To Favorites</button>
)
}