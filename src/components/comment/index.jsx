import axios from 'axios';
import { useState } from 'react';
import Button from '../button';
import Input from '../input';
import './style.scss';

function Comment(props) {
    const [commentId, setCommentId] = useState(props._id);
    const handleSubmitDelete = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:6985/api/comment/${commentId}`, {
           withCredentials: true
       })
       .then(res => {
        window.location.reload(false);
      })
      .catch(err => console.log(err))
    }
    return(
           <li className="comment">
               <div className="like">
                   <form action="" method="POST">
                        <Input name="comment" type="text" value={props._id}/>
                        <Button name="submit" type="submit" value="like" />
                    </form>
                    {props.likes.length > 0 ? 
                            <>
                            <p>{props.likes.length} likes</p>
                            </>
                            :
                            <>
                            <p>0 likes</p>
                            </>
                        }</div>
               <div>
               {props.text} - {props.author.givenName}
               { props.author._id === localStorage.getItem('id') ?
                    <>
                        <form action="" onSubmit={handleSubmitDelete}>
                            <Input name="comment" type="text" value={props._id}/>
                            <Button name="submit" type="submit" value="Delete" />
                        </form>
                    </>
                    :
                    <>
                    </>
               }
               </div>
           </li>
    )   
}
  
  
export default Comment