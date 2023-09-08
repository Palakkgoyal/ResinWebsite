import './App.css'
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Layout, Home, About, Contact, Gallery, Profile } from './Pages';
import useAuthChange from './js/useAuthChange';

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
            {user && (<Route path="profile" element={<Profile />} />)}
            <Route path="*" element={<p>404</p>} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App


