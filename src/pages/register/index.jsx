import { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Register() {
     const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [givenName, setGivenName] = useState("");
    const [familyName, setFamilyName] = useState("");
    let history = useHistory();
    function handleSubmit(event) {
      event.preventDefault();

      axios.post('http://localhost:6985/auth/register', { 
          email: email,
          password: password,
          givenName : givenName,
          familyName: familyName
       }, {withCredentials: true, credentials: 'same-origin'})
      .then(res => {
        localStorage.setItem(res.data.data._id);
        history.push('/')
      })
      .catch( err => console.log(err));
      }
    return(
      <div className="row">
        <div className="column column-50 column-offset-25">
            <h1>Inscription : </h1>
            <form onSubmit={handleSubmit}>
            <label>
                Nom :
                <input type="text" name="familyName" id="name" onChange={(e)=> setFamilyName(e.target.value)}/>
              </label>
              
              <label>
                Prénom :
                <input type="text" name="givenName" id="givenName" onChange={(e)=> setGivenName(e.target.value)}/>
              </label>
              <label>
                Email :
                <input type="email" name="email" id="email" onChange={(e)=> setEmail(e.target.value)}/>
              </label>
              
              <label>
                Mot de passe :
                <input type="password" name="password" id="password" onChange={(e)=> setPassword(e.target.value)}/>
              </label>
              <input type="submit" value="Je m'inscris" className="button"/>
            </form>
    </div>
    </div>
    )
}
  
  
export default Register