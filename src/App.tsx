// npm modules
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// page components
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import Profiles from "./pages/Profiles/Profiles";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

// components
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// services
import * as authService from "./services/authService";
import * as postService from "./services/postService";

// stylesheets
import "./App.css";

// types
import { User } from "./types/models";
import { Post } from "./types/models";
import MainFeed from "./pages/MainFeed/MainFeed";

function App(): JSX.Element {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(authService.getUser());

  const [posts, setPosts] = useState<Post[]>([]);

  const handleLogout = (): void => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  const handleAuthEvt = (): void => {
    setUser(authService.getUser());
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await postService.index();
      console.log("FETCHING POST", postData);
      setPosts(postData);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/main-feed"
          element={
            <ProtectedRoute user={user}>
              <MainFeed posts={posts} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
