import './App.css'
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Layout, Home, About, Contact, Gallery, Profile, Product } from './Pages';
import useAuthChange from './js/useAuthChange';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = useAuthChange()

  return (
    <div className="main_container">
      <div className="sub_container">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="gallery/:product_id" element={<Product />} />
            {user && (<Route path="profile" element={<Profile />} />)}
            <Route path="*" element={<p>404</p>} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </div>
  )
}

export default App


