import { collection, addDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { v4 as uuid } from "uuid";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';
import { onAuthStateChanged } from "firebase/auth";

export default function AddPostForm({ isLoggedIn, handelAddPost }) {
  const navigate = useNavigate();
  const [postImg, setPostImg] = useState(null);
  // const [user, setUser] = useState({});
  // console.log(user);
  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });
  // console.log(user.displayName);
  const [form, setForm] = useState({
    title: "",
    description: "",
    authorName: auth.currentUser.displayName,
    authorId: auth.currentUser.uid,
    deleteId: uuid(),
    imgUrl: "",
  });
  // console.log(form);
  const [errors, setErros] = useState({ title: null, description: null });
  const postsCollection = collection(db, "Posts");

  // useEffect(() => {
  //   console.log('effect');
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //   }
  // });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    setErros((prevErrors) => ({ title: null, description: null }));
    if (!form.title) {
      setErros((prevErrors) => ({ ...prevErrors, title: "Title is required" }));
      return;
    }
    if (!form.description) {
      setErros((prevErrors) => ({
        ...prevErrors,
        description: "Description is required",
      }));
      return;
    }
    // console.log(form);
    const docRef = await addDoc(postsCollection, {
      ...form,
      imgUrl: postImg,
    });
    // console.log(docRef.id);
    handelAddPost({ ...form, id: docRef.id, imgUrl: postImg });
    toast.success("Post added successfully")
    navigate("/");
  };
  const handleUploadImage = (e) => {
    const imagesRef = ref(storage, `images/${uuid()}`);
    uploadBytes(imagesRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // console.log(url);
        setPostImg(url);
      });
    });
  };
  return (
    <div className="bg-black text-white w-96 m-auto mt-20 p-8 rounded-md">
      <h1 className="font-bold text-center mb-4 text-xl">Create A Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        {postImg && (
            <figure className="px-10 pt-10">
              <img src={postImg} alt="postImg" className="rounded-xl" />
            </figure>
          )}
          <label htmlFor="img">Image</label>
          <input id="img" type="file" onChange={(e) => handleUploadImage(e)} />
        </div>
        <div className="mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs text-black"
            id="title"
            name="title"
            value={form.title}
            onChange={(e) => handleChange(e)}
          />
          {errors.title && (
            <span className="text-red-600 text-sm">* {errors.title}</span>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs text-black"
            id="description"
            name="description"
            value={form.description}
            onChange={(e) => handleChange(e)}
          />
          {errors.description && (
            <span className="text-red-600 text-sm">* {errors.description}</span>
          )}
        </div>
        <div>
          <button className="btn bg-gray-100 w-full">Add</button>
        </div>
      </form>
    </div>
  );
}
