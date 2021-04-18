import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Comment from "../../components/comment";
import Input from "../../components/input";
import './style.scss';
import axios from 'axios';
import Button from "../../components/button";

function PostDetail() {
    const [post, setPost] = useState();
    const [headline, setHeadline] = useState();
    const [body, setBody] = useState();
    const [comment, setComment]= useState();
    const [postID, setPostId] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();


    useEffect(() => {
        fetch(`http://localhost:6985/api/post/${id}`, {
            method: 'GET',  
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json" 
            }
            })  
            .then(res => res.json())
            .then((data) => {
                setPost(data.data);
                setIsLoaded(true);
                setHeadline(data.data.headline);
                setBody(data.data.body);
                setPostId(data.data._id);
            })
            .catch(err => console.log(err));
    }, [id])

   const handleSubmitEdit = (e) => {
       e.preventDefault();
       axios.put(`http://localhost:6985/api/post/605a2b5440b419476207bb9d`, { 
            headline: headline,
            body: body
       }, {
           withCredentials: true
       })
      .then(res => {
        window.location.reload(false);
      })
      .catch(err => console.log(err))
    }

    const handleSubmitComment = (e) =>{
        e.preventDefault();
        axios.post(`http://localhost:6985/api/comment/`,{ 
            text: comment,
            posts: postID
       }, {
           withCredentials: true
       })
       .then(res => {
        window.location.reload(false);
      })
      .catch(err => console.log(err))
    }
    
    if(isLoaded){
        return(
            <>
             <section className="post-detail">
             <div className="row">
                <article className="column"> 
                 <h1>{post.headline}</h1>
                <p> {post.author.givenName} |  {post.creationDate}</p>
                {   post.author._id === localStorage.getItem('id') ?
                    <>
                    <p>Vous êtes propriétaire de l'article : vous pouvez le supprimer ici :</p>
                    <form action="" method="POST">
                    <Button name="submit" type="submit" value={'Supprimer l\'article'}/>
                    </form> 
                    <p>Vous êtes propriétaire de l'article : vous pouvez l'éditer ici :</p>
                    <form action="" method="POST" onSubmit={handleSubmitEdit}>
                        <Input name="headline" type="text" id="headline" value={post.headline} handleChange={(e)=> setHeadline(e.target.value)}/>
                        <Input name="body" type="text" value={post.body} handleChange={(e)=> setBody(e.target.value)}/>
                        <Button name="submit" type="submit" value={'Editer l\'article'}/>
                    </form>
                    </>
                    :
                    <>
                    </>
                }
                <hr/>
                </article>
            </div>
            <div className="row">
                <article className="column column-80 column-offset-10 body">
                    <p>Contenu de l'article : </p>
                    <p className="">
                        {post.body}
                    </p>
                </article>
            </div>
            <div className="row">
                    <article className="column column-80 column-offset-10 likes">
                     <form action="" method="POST">
                            <Input name="posts" type="text" value={post._id}/>
                            <Button name="submit" type="submit" value="like" />
                        </form>
                    {post.likes.length > 0 ? 
                            <>
                            <p>{post.likes.length} likes</p>
                            </>
                            :
                            <>
                            <p>0 likes</p>
                            </>
                        }
                    </article>
                    </div>
                    <div className="row">
                    <article className="column column-80 column-offset-10 body">
                        {post.comments.length > 0 ? 
                            <>
                            <ul>
                                {post.comments?.map((item) => (
                                    <Comment key={item._id} {...item} />
                                ))}
                            </ul>
                            </>
                            :
                            <>
                            <p>il y a pas de commentaire</p>
                            </>
                        }
                         <form action="" method="POST" onSubmit={handleSubmitComment}>
                            <Input name="text" label="Commenter" type="text" handleChange={(e)=> setComment(e.target.value)} value={'un comment'}/>
                            <Button name="submit" type="submit" value="commenter" />
                        </form>
                    </article>
                    </div>
            </section>
            </>
        )
    }else{
        return(
            <section className="post-detail">
             <div className="row">
                <p>Chargement en cours</p>
                </div>
            </section> 
        )
    }

    
}
  
  
export default PostDetail