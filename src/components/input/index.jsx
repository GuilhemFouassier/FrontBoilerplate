function Input(props) {
    return(
        <>
            <label>{props.label}</label>
           <input type={props.type} name={props.name} id={props.name} defaultValue={props.value} onChange={props.handleChange}/>
        </>
    )   
}
  
export default Input