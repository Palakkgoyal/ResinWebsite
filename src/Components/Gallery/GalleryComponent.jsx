import React, { useState, useEffect } from "react"
import "./GalleryComponent.css"
import { db } from "../../lib/firebase"
import isOwner from "../../js/Owner"
import AddWork from "./AddWork"
import Loader from "../Loader/Loader"
import { useNavigate } from "react-router-dom"


const GalleryComponent = () => {
    const [addWork, setAddWork] = useState(false)
    const [workDocuments, setWorkDocuments] = useWorkData();
    const navigate = useNavigate();

    return (
        <div className="gallery_container">
            {isOwner() && (
                <button
                    className="add_work_btn"
                    onClick={() => setAddWork(prev => !prev)}
                >
                    {addWork ? "Close it" : "Add New Work"}
                </button>
            )}
            {addWork && <AddWork />}
            <div>
                <h2 className="gallery_heading">
                    Work
                </h2>
            </div>
            {workDocuments? (
            <div className="display_img_container">
                {workDocuments.map(doc => (
                    <div className="display_img_box" key={doc.id}>
                        <img
                            src={doc.images[0]}
                            alt={doc.name}
                            className="display_img gallery_image"
                            onClick={() => navigate(doc.id)}
                        />
                    </div>
                ))}
            </div>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default GalleryComponent



function useWorkData() {
    const [workDocuments, setWorkDocuments] = useState([]);

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

        return () => { unsubscribe() };
    }, []);

    return [workDocuments, setWorkDocuments]
}