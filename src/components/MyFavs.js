import React from 'react'

export default function MyFavs(props){
  // const [favs, setFavs] = useState([])
  // const showFavs = async() =>{
  //   try{
  //     const getFavs = await fetch(`http://localhost:3000/ledgers/users/${localStorage.id}`);

  //     const favData = await getFavs.json()
  //     // setFavs(favData)
  //        console.log(favData)
  //   } catch (error) {
  //     console.error(error)
  //   }
  //   }
  
  return(
    <div>
      <h1>Your Favorite Whiskeys, {localStorage.username}</h1>
      {/* { props.favs.map(fav => {
        return(
        <ul key={fav.whiskey_id}>
          <li>{fav.whiskey.name}</li>
          <li><img src={fav.whiskey.image} alt={fav.whiskey.name} /></li>
        </ul>
      )})} */}
    </div>
  )
}