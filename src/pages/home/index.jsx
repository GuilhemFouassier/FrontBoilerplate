import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Post from "../../components/post";
import './style.scss';
import Cookies from "js-cookie";

function Home() {
        const isLoggedIn = Cookies.get('cookiesecret');
        const [post, setPost] = useState([]);
        useEffect(() => {
            fetch('http://localhost:6985/api/post', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
                })
                .then(res => res.json())
                .then((data) => {
                    setPost(data.data);
                })
                .catch(err => console.log(err));
        }, [])

        return(
            <div className="row">
        <section className="column">
            <article>
            <h1>Bienvenue sur BoilerPlate !</h1>
            <p>Pour commencer à utiliser l'application, veuillez vous connectez</p>            
            {
                isLoggedIn ?
                <>
                <Link to="/AddPost" className="button">Ajoutez un Post</Link>
                </>
                :
                <>
                </>
            }
            </article>
            <article className="posts-list">
            { isLoggedIn ? 
                <>
                    {post?.map((item) => (
                        <Post key={item._id} {...item} />
                    ))}
                </>
             : 
                <><Link to="/login" className="button">Je me connecte</Link><Link to="/register" className="button">Je m'inscris</Link></> 
            }
            </article>
        </section>
        </div>
    )
}
  
  
export default Home