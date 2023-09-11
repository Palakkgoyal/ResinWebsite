import React, { useState, useRef, useEffect } from "react"
import "./GalleryComponent.css"
import isOwner from "../../js/Owner"
import handleChange from "../../js/utilityFn"
import { storage, db } from "../../lib/firebase"
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage"
import { v4 } from "uuid"
import ActionBtn from "../ActionBtn/ActionBtn"
import Loader from "../Loader/Loader"

const GalleryComponent = () => {
    const [addWork, setAddWork] = useState(false)
    const [workDocuments, setWorkDocuments] = useState([
        // {
        //     artDetails: "sdfsdfs",
        //     artName: "sfd",
        //     artPrice: "023432",
        //     id: "RXoGEW7R0Pxe7QeZSBM7",
        //     image: "https://firebasestorage.googleapis.com/v0/b/resinart-6cd5e.appspot.com/o/images%2Fbadge1.png5e5a1df7-e90c-4253-889b-685c73d5ba2c?alt=media&token=53f71ad5-af17-4c76-9b3a-45b012a03fb6"
        // },
        // {
        //     id: '5q8d8RLjsbt6oXefRmmj',
        //     artPrice: '023432',
        //     image: 'https://firebasestorage.googleapis.com/v0/b/resina…=media&token=5b39d5b6-bfb9-4d94-a9ff-a063e9e7b760',
        //     artDetails: 'sdfsdfs',
        //     artName: 'sfd'
        // }

    ]);

    useEffect(() => {
        // Define a reference to your Firestore collection
        const workCollectionRef = db.collection('work');

        // Fetch documents from the collection
        const unsubscribe = workCollectionRef.onSnapshot((snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            setWorkDocuments(data);
        });

        return () => {
            // Unsubscribe from the Firestore collection when the component unmounts
            unsubscribe();
        };
    }, []);

    return (
        <div className="gallery_container">
            {isOwner() && (
                <button
                    className="add_work_btn"
                    onClick={() => setAddWork(prev => !prev)}
                >
                    {addWork? "Close it" : "Add New Work"}
                </button>
            )}
            {addWork && <AddWork />}
            <div>
                <h2 className="gallery_heading">
                    Work
                </h2>
            </div>
            <div className="gallery_image_container">
                {workDocuments.map(doc => (
                    <img src={doc.image} alt={doc.name} key={doc.id} className="gallery_image" />
                ))}
            </div>
        </div>
    )
}

export default GalleryComponent


function AddWork() {
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

    function validateImg(e) {
        const img = e.target.files[0];
        if (!img.name.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            setIsValidimage(false);
            setImageUpload(null);
            alert("Please select a valid image");
            return false;
        }
        setImageUpload(img)
    }

    function uploadImage() {
        if (imageUpload === null || !isValidImage) {
            setUploading(false)
            return;
        }
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    imgUrlRef.current = url;
                });
        })
            .then(() => {
                uploadWork()
            })
            .catch(err => {
                setUploading(false)
                console.error(`err: ${err}`)
            })
    }

    async function uploadWork() {
        const workCollection = db.collection('work');

        // Data to be added to the document
        const workData = { ...artData, image: imgUrlRef.current }

        // Add the document with an automatically generated ID
        workCollection.add(workData)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                setArtData({
                    artName: "",
                    artPrice: 0,
                    artDetails: "",
                })
                setImageUpload(null);
                imgUrlRef.current = null;
                alert("Work Uploaded!")
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
                        onChange={validateImg}
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
                        onClick={() => {
                            setUploading(true)
                            uploadImage()
                        }}
                        disabled={uploading}
                    />
                </div>
                {uploading && <Loader />}
            </form>
        </div>
    )
}
