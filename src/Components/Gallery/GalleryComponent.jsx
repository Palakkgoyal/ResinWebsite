import React, { useState, useRef, useEffect } from "react"
import "./GalleryComponent.css"
import { db } from "../../lib/firebase"
import isOwner from "../../js/Owner"
import AddWork from "./AddWork"


const GalleryComponent = () => {
    const [addWork, setAddWork] = useState(false)
    const [workDocuments, setWorkDocuments] = useState([]);

    useEffect(() => {
        // Define a reference to your Firestore collection
        const workCollectionRef = db.collection('work');
        console.log("running")
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
                    {addWork ? "Close it" : "Add New Work"}
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