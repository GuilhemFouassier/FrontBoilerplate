import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';


function Login() {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     let history = useHistory();

     function validateForm() {
       return email.length > 0 && password.length > 0;
     }

    useEffect(() => {
      localStorage.removeItem('id');
    }, []);

    function handleSubmit(event) {
      event.preventDefault();

      axios.post(`http://localhost:6985/auth/login`, { 
        email: email,
            password: password
       }, {
        withCredentials: true, 
        credentials: 'include',
        mode: 'same-origin'})
      .then(res => {
        localStorage.setItem('id', res.data.data._id);
        history.push('/');
      })
      }
    return(
      <div className="row">
        <div className="column column-50 column-offset-25">
          <h1>Je me connecte :</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Identifiant :
              <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </label>
            <label>
              Mot de passe :
              <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </label>
            <input type="submit" value="Connexion" disabled={!validateForm()} />
          </form>
        </div>
        </div>
    )
}
  
export default Login