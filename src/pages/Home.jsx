import React from "react";
import Trash from "../icons/Trash";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Edit from "../icons/Edit";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


export default function Home({ posts, handleDeletePost, isLoggedIn }) {
  // console.log(posts);
  const handleDelete = async (post) => {
    // console.log(post);
    const postWillBeDeleted = doc(db, "Posts", post.id);
    // console.log(postWillBeDeleted);
    await deleteDoc(postWillBeDeleted);
    handleDeletePost(post.deleteId);
    toast.success("Post deleted successfully")

  };
  // console.log(posts);
  return (
    <div className="mt-10 ">
      {posts.map((post) => (
        <div
          key={post.deleteId}
          className="card mb-10 w-96 shadow-md m-auto bg-gray-50"
        >
          {post.imgUrl && (
            <figure className="px-10 pt-10">
              <img src={post.imgUrl} alt="postImg" className="rounded-xl" />
            </figure>
          )}
          <div className="card-body items-center text-center">
            <h2 className="card-title">{post.title}</h2>
            <p>{post.description}</p>
            <p className="font-bold">@{post.authorName}</p>
            {isLoggedIn && post.authorId === auth.currentUser.uid && (
              <div className="card-actions gap-8 mt-4">
                <div
                  onClick={() => handleDelete(post)}
                  className="text-red-600 cursor-pointer"
                >
                  <Trash />
                </div>
                <div className="text-green-600 cursor-pointer">
                  <Link to={`/editPost/${post.id}`}>
                    <Edit />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
