import { Link } from "react-router-dom";
import './style.scss';

function Post(props) {
    return(
           <Link to={"post/" + props._id} className="post-teaser">
               <h3>{props.headline}</h3>
               <p>Par : {props.author.givenName} | Date :{props.creationDate}</p>
                <span className="button button-small button-clear">Voir l'article</span>
            </Link>
    )   
}
  
  
export default Post