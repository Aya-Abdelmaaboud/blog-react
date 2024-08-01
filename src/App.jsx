import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import AddPostForm from "./pages/AddPostForm";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import EditPostForm from "./pages/EditPostForm";


function App() {

  const [posts, setPosts] = useState([]);
  const [isLoggedIn, SetIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );
  const postsCollection = collection(db, "Posts");

  useEffect(() => {
    const getPosts = async () => {
      // console.log("added");
      const data = await getDocs(postsCollection);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // console.log(posts);
      setPosts(posts);
    };
    getPosts();
  }, []);
  const handleIsLoggedIn = (isLoggedIn) => {
    SetIsLoggedIn(isLoggedIn);
  };
  const handelAddPost = (post) => {
    // console.log(post);
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };
  const handleDeletePost = (id) => {
    // console.log(id);
    let newPosts = [...posts];
    newPosts = newPosts.filter((post) => post.deleteId != id);
    setPosts(newPosts);
  };
  const handleEditPost = (postToBeUpdated) => {
    // console.log(postToBeUpdated);
    let newPosts = [...posts];
    let index = newPosts.findIndex((post) => post.id === postToBeUpdated.id);
    // console.log(index);
    newPosts[index] = postToBeUpdated;
    // console.log(newPosts);
    setPosts(newPosts);
  };
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleIsLoggedIn={handleIsLoggedIn} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                posts={posts}
                handleDeletePost={handleDeletePost}
                isLoggedIn={isLoggedIn}
              />
            }
          ></Route>
          <Route
            path="/login"
            element={<Login handleIsLoggedIn={handleIsLoggedIn} />}
          ></Route>
          <Route
            path="/post/new"
            element={
              <AddPostForm
                isLoggedIn={isLoggedIn}
                handelAddPost={handelAddPost}
              />
            }
          ></Route>
          <Route
            path="/editPost/:id"
            element={
              <EditPostForm
                handleEditPost={handleEditPost}
                isLoggedIn={isLoggedIn}
                posts={posts}
              />
            }
          ></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
