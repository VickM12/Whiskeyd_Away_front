import React { useState} from 'react';
import axios from 'axios';


export default function AddToFav(props){
  const [state, setUser] = useState({
    user:{
    username: state.username,
    id: state.id,
    isLoggedIn: true
    }
  })
  const [whiskey, setWhiskey] = useState({})
const handleFavorites= async (event)=>{
  try{
    const response = await axios.post('http://localhost:3000/ledgers', {
      user: {
        id: state.id},
      whiskey: {
        id: whiskey.id}

      }
    )
console.log(response)
console.log(state)
} catch (error){
console.log(error)
  }
}

return(
  <button className="favorite" value="Add To Favorites" onClick={handleFavorites} />
)
}