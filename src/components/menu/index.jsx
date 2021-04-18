import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import './style.scss';

function Menu() {
    const isLoggedIn = Cookies.get('cookiesecret');
    return(
            <header className="navbar">
                <div className="container">
                    <div className="row">
                        <nav className="column">
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>

                                { isLoggedIn == null ? 
                                   <>
                                   <li>
                                   <Link to="/login">Login</Link>
                                   </li>
                                   <li>
                                   <Link to="/register">Inscription</Link>
                                   </li>
                               </>
                                : 
                                <>
                                <li>
                                <Link to="/login">Logout</Link>
                                </li>
                                </>
                                }
                                
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
    )
}
  
  
export default Menu