import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Menu from './components/menu';
import PostDetail from './pages/postDetail';
import AddPost from './pages/addPost';
function App() {
  return (
    <>
      <Menu />
      <main className="container">
          <Switch>
          <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/post/:id">
              <PostDetail />
            </Route>
            <Route path="/AddPost">
              <AddPost />
            </Route>
          </Switch>
      </main>
    </>
  );
}

export default App;
