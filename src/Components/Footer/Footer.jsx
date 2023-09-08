import React from 'react'
import "./Footer.css"
import ActionBtn from '../ActionBtn/ActionBtn'

const Footer = () => {
  return (
    <div className='footer_container'>
      <footer className="footer_sub_container">
        <p className="footer_note">
          Open for Assignments
        </p>
        <h3 className="footer_para">
          Interested in commissioning me for an art project. I am currently available for assignments worldwide.
        </h3>
        <ActionBtn text="Get In Touch" target="/contact" />
      </footer>
    </div>
  )
}

export default Footer
