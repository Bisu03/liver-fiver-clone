import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./Add.scss";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";


function Add() {
  const [FormInput, setFormInput] = useState({
    userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
    title: "",
    cat: "",
    cover: "",
    images: [],
    desc: "",
    shortTitle: "",
    shortDesc: "",
    deliveryTime: 0,
    revisionNumber: 0,
    features: "",
    price: 0,
  });

  const [MultipleFile, setMultipleFile] = useState(null);
  const [SingleFile, setSingleFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormInput({ ...FormInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (SingleFile) {
      const UploadFiles = async () => {
        const formData = new FormData();
        formData.append('files', SingleFile);
        const { data } = await newRequest.post("files/single", formData);
        setFormInput({ ...FormInput, cover: data })
      }
      UploadFiles()
    }

  }, [SingleFile])

  useEffect(() => {
    if (MultipleFile) {
      if (MultipleFile.length <= 3) {
        const UploadFiles = async () => {
          const formData = new FormData();
          for (let i = 0; i < MultipleFile.length; i++) {
            formData.append('multiple_files', MultipleFile[i]);
          }
          const { data } = await newRequest.post("files/multiple", formData);
          console.log(data);
          setFormInput({ ...FormInput, images: [...data] })
        }
        UploadFiles()
      } else {
        alert("Image should no be more than 3")
      }

    }

  }, [MultipleFile])


  const HandleSubmit = async () => {
    try {
      await newRequest.post("/gigs", {
        ...FormInput,
      });
      navigate("/myGigs");
    } catch (error) {
      alert(error)
    }
  }

  console.log(FormInput);

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>

            <input
              type="text"
              name="title"
              value={FormInput.title}
              onChange={handleChange}
              placeholder="e.g. I will do something I'm really good at"
            />
            <label htmlFor="">Category</label>
            <select
              name="cat"
              value={FormInput.cat}
              onChange={handleChange}
              id="cats">
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <label htmlFor="">Cover Image</label>
            <input
              onChange={(e) => setSingleFile(e.target.files[0])}
              type="file"
            />
            <label htmlFor="">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={(e) => setMultipleFile(e.target.files)}
            />
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              value={FormInput.desc}
              onChange={handleChange}
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"></textarea>
            <button onClick={HandleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              value={FormInput.shortTitle}
              onChange={handleChange}
              placeholder="e.g. One-page web design"
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              value={FormInput.shortDesc}
              onChange={handleChange}
              placeholder="Short description of your service"
              cols="30"
              rows="10"></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input
              type="number"
              name="deliveryTime"
              value={FormInput.deliveryTime}
              onChange={handleChange}
            />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              value={FormInput.revisionNumber}
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <input
              type="text"
              name="features"
              value={FormInput.features}
              onChange={handleChange}
              placeholder="e.g. page design"
            />
            <label htmlFor="">Price</label>
            <input
              type="number"
              name="price"
              value={FormInput.price}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add
