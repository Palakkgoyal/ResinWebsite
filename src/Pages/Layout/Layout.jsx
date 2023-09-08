import "./Layout.css"
import { Navbar } from "../../Components"
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="main_container">
      <div className="sub_container">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
