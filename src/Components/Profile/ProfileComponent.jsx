import React, { useEffect, useState } from 'react'
import { auth, db } from "../../lib/firebase"
import "./ProfileComponent.css"

const ProfileComponent = () => {
    const [data, setData] = useFetchData();

    const name = data?.name || "",
        photoURL = data?.photoURL || "",
        email = data?.email || "",
        number = data?.contactNumber || "",
        address = data?.address || "";

    function handleChange(event) {
        setData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleLogOut() {
        auth.signOut()
            .then(function () {
                console.log("Sign-out successful")
            })
            .catch(function (error) {
                console.error(error, err)
            });
    }

    return (
        <div className="profile_container">
            <button className="" onClick={handleLogOut}>Log Out</button>
            <div>
                <img src={photoURL} alt="" className="profile_image" />
            </div>
            <div className="input_main_container">
                <div className="input_container">
                    <label
                        htmlFor="name"
                        className="sub_para_styling profile_form_label"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        disabled
                        onChange={handleChange}
                        value={name}
                        className="form_field profile_form_field"
                    />
                </div>
                <div className="input_container">
                    <label
                        htmlFor="email"
                        className="sub_para_styling profile_form_label"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        disabled
                        onChange={handleChange}
                        value={email}
                        className="form_field profile_form_field"
                    />
                </div>
                <div className="input_container">
                    <label
                        htmlFor="contactNumber"
                        className="sub_para_styling profile_form_label"
                    >
                        Contact Number
                    </label>
                    <input
                        type="text"
                        name="contactNumber"
                        id="contactNumber"
                        disabled
                        onChange={handleChange}
                        value={number}
                        className="form_field profile_form_field"
                    />
                </div>
                <div className="input_container">
                    <label
                        htmlFor="address"
                        className="sub_para_styling profile_form_label"
                    >
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        disabled
                        onChange={handleChange}
                        value={address}
                        className="form_field profile_form_field"
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent


function useFetchData() {
    const [data, setData] = useState({})

    useEffect(() => {
        const unsubscribe = db.collection("users")
            .doc(auth?.currentUser?.uid)
            .onSnapshot((doc) => {
                console.log("fetching")
                setData(doc.data());
            });

        return () => {
            unsubscribe(); // Unsubscribe from the Firebase listener.
        };
    }, [])

    return [data, setData];
}
