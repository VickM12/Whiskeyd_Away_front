import React from 'react'
export default function NewWhiskey(props){
  return(
    <div>
    <h2>Submit a whiskey!</h2>
       <form className="new" onSubmit={props.handleSubmit}>
         <label htmlFor="name">Name</label>
         <input type='text' id='name' value={props.formInputs.name}
         onChange={props.handleChange}/><br/>
         <label htmlFor='distiller'>Distillery</label>
         <input type='text' id='distiller' value={props.formInputs.distiller}
         onChange={props.handleChange} /><br/>
         <label htmlFor="origin">Origin</label>
         <input type='text' id='origin' value={props.formInputs.origin}
         onChange={props.handleChange}/><br/>
         <label htmlFor='img'>Image</label>
         <input type='text' id='image' value={props.formInputs.image}
         onChange={props.handleChange}/>
         <input type="submit" className="submit"/>
       </form>
    </div>
  )}