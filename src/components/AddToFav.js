import React, { useState, useEffect} from 'react';
import axios from 'axios';


export default function AddToFav(props){
  const handleFavorites= props.handleFavorites
  // const [state, setUser] = useState({
  //   user:{
  //     id: props.user.id,
  //     username: props.username
  //   }
  // })
  // const [whiskey, setWhiskey] = useState({})
  // const [ledger, setLedger] = useState({
  //   ledger:{
  //     user_id: '',
  //     whiskey_id: ''
  //   }
  // })
  // useEffect(() => {
	// 	(async () => {
			// try {
			// 	const whiskeyResponse = await fetch(/*`${endpoint}/${props.match.params.id}`*/ `http://localhost:3000/whiskeys/${props.match.params.id}`);
			// 	const data = await whiskeyResponse.json();
			// 	await setWhiskey(data);
			// 	console.log(whiskeyResponse)
			// 	console.log(whiskey)
			// 	console.log(data)
			// } catch (error) {
			// 	console.error(error);
      // }
  //     try{
  //       const userResponse = await fetch(`http://localhost:3000/users/${props.match.params.id}`);
  //       const userData = await userResponse.json()
  //       await setUser(userData)
  //       console.log(userResponse)
  //       console.log(userData)
  //     } catch (error){
  //       console.log(error)
  //     }
	// 	})();
	// }, []);

// const handleFavorites= async (event)=>{
//   try{
//     const response = await axios.post('http://localhost:3000/ledgers', {
//       ledger: {
//         user_id: props.state.id,
//       whiskey_id: props.whiskey.id
//       }
//     }
//     )
// console.log(response)
// } catch (error){
// console.log(error)
//   }
// }

return(
  <button className="favorite" value="Add To Favorites" onClick={handleFavorites}>Add To Favorites</button>
)
}