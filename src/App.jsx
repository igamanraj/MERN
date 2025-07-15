import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home.jsx";
import { Login } from "./pages/Login/Login";
import { About } from "./pages/About/About.jsx";
import { Error } from "./pages/Error/Error.jsx"
import { Logout } from "./pages/Logout/Logout.jsx";
import { Services } from "./pages/Services/Services";
import { Register } from "./pages/Register/Register";
import { Contact } from "./pages/Contact/Contact.jsx";
import { Navbar } from "./component/Navbar/Navbar.jsx";
import { Footer } from "./component/Footer/Footer.jsx";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage.jsx";
import { AdminHome } from "./pages/protected/admin-home/Admin-Home.jsx";
import { AdminLayout } from "../src/component/layouts/Admin-Layout.jsx"
import { AdminUpdate } from "./pages/protected/admin-update/Admin-Update.jsx";
import { AdminUsers } from "../src/pages/protected/admin-user/Admin-Users.jsx";
import { AdminContacts } from "../src/pages/protected/admin-contact/Admin-Contacts.jsx";
import "./index.css"


const App = () => {
  return(
  <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        {/* Public Routes */}
        {/* Home, About, Contact, Services, Register, Login, Logout */}
        <Route path="/" element={<Home />}/>
        <Route path="/About" element={<About />}/>
        <Route path="/Contact" element={<Contact />}/>
        <Route path="/Services" element={<Services />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/Profile" element={<ProfilePage />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Logout" element={<Logout />}/>
        {/* catches all unmatched routes */}
        <Route path="*" element={<Error />}/>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<AdminUsers />}/>
          <Route path="contacts" element={<AdminContacts />}/>
          <Route path="users/:id/edit" element={<AdminUpdate />}/>
        </Route>
      </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
};

export default App;
