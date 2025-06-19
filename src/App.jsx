import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Services } from "./pages/Services";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { Error } from "./pages/Error.jsx"
import { AdminLayout } from "../src/component/layouts/Admin-Layout.jsx"
import { AdminUsers } from "../src/pages/Admin-Users.jsx";
import { AdminContacts } from "../src/pages/Admin-Contacts.jsx";
import { AdminUpdate } from "../src/pages/Admin-Update.jsx";


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
        <Route path="/Login" element={<Login />}/>
        <Route path="/Logout" element={<Logout />}/>
        {/* catches all unmatched routes */}
        <Route path="*" element={<Error />}/>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
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
