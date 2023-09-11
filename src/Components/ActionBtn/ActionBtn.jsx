import React from 'react'
import "./ActionBtn.css"
import { Link } from 'react-router-dom'

const ActionBtn = ({ text, target = "", onClick=(() => {}), type="button", disabled=false}) => {
  return (
    <button className="action_btn" type={type} onClick={onClick} disabled={disabled}>
      <Link to={target} className="action_btn_text">
        {text}
      </Link>
    </button>
  )
}

export default ActionBtn
