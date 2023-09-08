import React, { useState } from 'react'
import "./LoginDialogBox.css"
import ActionBtn from '../ActionBtn/ActionBtn'
import GoogleButton from 'react-google-button'
import { ImCross } from "react-icons/im";
import { auth, db, googleProvider } from "../../lib/firebase";

const LoginDialogBox = ({ handleShowForm }) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState(
    {name: "", email: "", password: ""}
)

function handleChange(event) {
  setFormData(prevFormData => {
      return {
          ...prevFormData,
          [event.target.name]: event.target.value
      }
  })
}

  return (
    <div className="login_dialog_box_container">
      <div>
        <h2>
          {isSignUp ? "Sign UP" : "Log In"}
        </h2>
        <ImCross onClick={handleShowForm} className="auth_close_icon" />
      </div>
      <form className="auth_form_container">
        {isSignUp && (
          <>
            <label
              htmlFor="email"
              className="sub_para_styling auth_label"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form_field auth_form_field"
              placeholder="Enter your name"
              onChange={handleChange}
              value={formData.name}
            />
          </>
        )}
        <label
          htmlFor="email"
          className="sub_para_styling auth_label"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          className="form_field auth_form_field"
          placeholder="Enter your email"
          onChange={handleChange}
          value={formData.email}
        />
        <label
          htmlFor="password"
          className="sub_para_styling auth_label"
          style={{ marginTop: 0 }}
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form_field auth_form_field"
          placeholder="Enter your password"
          onChange={handleChange}
          value={formData.password}
        />
        <ActionBtn text="Submit" />
      </form>
      <div>
        <span></span>
        <p>or</p>
        <span></span>
      </div>
      <div className="auth_google_btn_container">
        <GoogleButton
          onClick={signInWithGoogle}
        />
      </div>
      <p className="auth_note">
        {isSignUp? "Already have an account" : "New to MahiArts"}? {" "}
        <span 
        className="toggle_auth"
        onClick={() => setIsSignUp(prev => !prev)}
        >
          {isSignUp? "LogIn" : "SignUp"}
        </span>
      </p>
    </div>
  )
}

export default LoginDialogBox


function signInWithGoogle() {
  auth
    .signInWithPopup(googleProvider)
    .then(async (val) => {
      const userRef = db.collection("users").where("uid", "==", val?.user?.uid);
      console.log("SignIn Successfull!")

      const docSnap = await userRef.get();
      if (docSnap.docs.length < 1) {
        const userDoc = db.collection("users");
        await userDoc.doc(auth.currentUser.uid).set({
          uid: val.user.uid,
          name: val.user.displayName,
          photoURL: val.user.photoURL,
          address: "",
          contactNumber: null,
        });
      }
    })
    .catch((error) => {
      if (error.code === "auth/account-exists-with-different-credential") {
        console.error("Account exists with a different credential")
      } else {
        console.error("Error", error.message)
      }
    });
}