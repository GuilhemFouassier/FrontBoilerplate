import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "../../components/button";
import Input from "../../components/input";
import './style.scss';

function AddPost() {
        const [headline, setHeadline] = useState();
        const [body, setBody] = useState();
        let history = useHistory();
        const handleSubmit = (e) => {
            e.preventDefault();
            axios.post('http://localhost:6985/api/post/', {
                headline: headline,
                body: body
            }, {
                withCredentials: true
            })
            .then(res => {
                history.push('/');
           })
           .catch(err => console.log(err))
        }
        return(
            <div className="row">
        <div className="column column-50 column-offset-25">
          <h1>Ajouter un nouveau Post:</h1>
          <form method="POST" onSubmit={handleSubmit}>
            <Input name="headline" type="text" id="headline"  handleChange={(e)=> setHeadline(e.target.value)}/>
            <Input name="body" type="text" handleChange={(e)=> setBody(e.target.value)}/>
            <Button type="submit" value="Postez !"/>
          </form>
        </div>
        </div>
    )
}
  
  
export default AddPost