import React from 'react'
import "./GalleryComponent.css"
import isOwner from '../../js/Owner'

const GalleryComponent = () => {
    return (
        <div className="gallery_container">
            {isOwner() && (
                <button className="add_work_btn">
                    Add New Work
                </button>
            )}
            <div>
                <h2 className="gallery_heading">
                    Work
                </h2>
            </div>
        </div>
    )
}

export default GalleryComponent
