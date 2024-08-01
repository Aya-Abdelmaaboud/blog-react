import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

export default function EditPostForm({ posts, handleEditPost, isLoggedIn }) {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id);
  const [form, setForm] = useState(posts.find((post) => post.id === id));
  const [postImg, setPostImg] = useState(form.imgUrl);
  console.log(postImg);
  const [errors, setErros] = useState({ title: null, description: null });

  // console.log(postImg);
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //   }
  // });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    // console.log(postImg);
    e.preventDefault();
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
    const postWillBeUpdated = doc(db, "Posts", id);
    await updateDoc(postWillBeUpdated, {
      ...form,
      title: form.title,
      description: form.description,
      imgUrl: postImg,
    });
    handleEditPost({ ...form, imgUrl: postImg });
    toast.success("Post edited successfully");
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
      <h1 className="font-bold text-center mb-4 text-xl">Edit A Post</h1>
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
          <button className="btn bg-gray-100 w-full">Edit</button>
        </div>
      </form>
    </div>
  );
}
