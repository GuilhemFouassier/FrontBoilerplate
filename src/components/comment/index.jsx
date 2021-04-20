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
    const handleSubmitLike = (e) =>{
        e.preventDefault();
        axios.post(`http://localhost:6985/api/like/`,{ 
            comment: commentId
       }, {
           withCredentials: true
       })
       .then(res => {
        window.location.reload(false);
      })
      .catch(err => console.log(err))
    }

    const handleSubmitDeleteLike = (e) =>{
        e.preventDefault();
         axios.delete(`http://localhost:6985/api/like/${idComment}`,{
           withCredentials: true
       })
       .then(res => {
        window.location.reload(false);
      })
      .catch(err => console.log(err))
    }
        var exist = false;
        var idComment = '';
        var user = localStorage.getItem('id');
        for(var i =0; i < props.likes.length; i++){
            if(props.likes[i].author === user){
                exist = true;
                idComment = props.likes[i]._id;
            } 
        }
    return(
           <li className="comment">
               <div className="like">
               { exist === true ?
                     <>
                     <form action="" method="DELETE" onSubmit={handleSubmitDeleteLike}>
                            <Input name="like" type="text" value={idComment} id="likeID" />
                            <Button name="submit" type="submit" value="Unlike" />
                    </form>
                     </>
                        :
                        <>
                        <form action="" method="POST" onSubmit={handleSubmitLike}>
                            <Button name="submit" type="submit" value="like" />
                        </form>
                        </>
                     }

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
               {props.text} - De :{props.author.givenName}
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