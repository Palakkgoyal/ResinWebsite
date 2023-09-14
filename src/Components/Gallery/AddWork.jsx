import React, { useState, useRef, useEffect } from "react"
import handleChange, { validateImg, uploadImage } from "../../js/utilityFn"
import { db } from "../../lib/firebase"
import ActionBtn from "../ActionBtn/ActionBtn"
import Loader from "../Loader/Loader"
import { toast } from 'react-toastify';

const AddWork = () => {
    const imgUrlRef = useRef(null)
    const [uploading, setUploading] = useState(false)
    const [imageUpload, setImageUpload] = useState(null)
    const [isValidImage, setIsValidimage] = useState(true)
    const [artData, setArtData] = useState({
        artName: "",
        artPrice: 0,
        artDetails: "",
    })

    const artName = artData.artName,
        artPrice = artData.artPrice,
        artDetails = artData.artDetails;

    function checkImg(e) {
        const img = e.target.files[0];
        if (validateImg(e)) {
            setImageUpload(img);
            setIsValidimage(true);
            return
        }

        setIsValidimage(false);
        setImageUpload(null);
    }

    async function uploadWorkImg() {
        if (imageUpload === null || !isValidImage) {
          setUploading(false);
          return;
        }
      
        const imgUrl = await uploadImage(imageUpload);
      
        if (imgUrl) {
          imgUrlRef.current = imgUrl;
          await uploadWork();
        } else {
          setUploading(false);
        }
      }
      
    async function uploadWork() {
        const workCollection = db.collection('work');

        // Data to be added to the document
        const workData = { ...artData, image: imgUrlRef.current }

        // Add the document with an automatically generated ID
        workCollection.add(workData)
            .then((docRef) => {
                // console.log("Document written with ID: ", docRef.id);
                setArtData({
                    artName: "",
                    artPrice: 0,
                    artDetails: "",
                })
                setImageUpload(null);
                imgUrlRef.current = null;
                toast.success("Successfully work uploaded!", {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
            .finally(() => setUploading(false))

    }

    return (
        <div className="add_art_container">
            <form action="" className="add_art_sub_container">
                <div className="add_art_img_container">
                    <input
                        type="file"
                        onChange={checkImg}
                        id="add_art_file"
                        name="add_art_file"
                        style={{ display: "none" }}
                        required
                        disabled={uploading}
                    />
                    <label htmlFor="add_art_file" className="">
                        <p className="add_art_img_label">+</p>
                    </label>
                    {imageUpload && (
                        <img src={URL.createObjectURL(imageUpload)} className="add_art_img" />
                    )}
                </div>

                <div className="add_art_text_input_container">
                    <div className="add_art_input_container">
                        <label htmlFor="artName" className="sub_para_styling add_art_input_label">
                            Name of Art
                        </label>
                        <input
                            type="text"
                            id="artName"
                            name="artName"
                            value={artName}
                            onChange={(e) => handleChange(e, setArtData)}
                            className="form_field add_art_input"
                            required
                            disabled={uploading}
                        />
                    </div>
                    <div className="add_art_input_container">
                        <label htmlFor="artPrice" className="sub_para_styling add_art_input_label">
                            Price
                        </label>
                        <input
                            type="number"
                            id="artPrice"
                            name="artPrice"
                            value={artPrice}
                            onChange={(e) => handleChange(e, setArtData)}
                            className="form_field add_art_input"
                            required
                            disabled={uploading}
                        />
                    </div>
                    <div className="add_art_input_container">
                        <label htmlFor="artDetails" className="sub_para_styling add_art_input_label">
                            Description
                        </label>
                        <textarea
                            name="artDetails"
                            id="artDetails"
                            value={artDetails}
                            cols="30"
                            rows="10"
                            onChange={(e) => handleChange(e, setArtData)}
                            className="form_field add_art_input"
                            required
                            disabled={uploading}
                        />
                    </div>
                    <ActionBtn
                        text="Add Now"
                        onClick={async() => {
                            setUploading(true)
                            await uploadWorkImg()
                        }}
                        disabled={uploading}
                    />
                </div>
                {uploading && <Loader />}
            </form>
        </div>
    )
}

export default AddWork

