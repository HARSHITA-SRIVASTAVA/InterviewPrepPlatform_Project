import { Routes, Route ,useLocation} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

//import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Revision from "./pages/Revision";
import Analytics from "./pages/Analytics";

import PublicNavbar from "./components/PublicNavbar";

function App() {

  const location = useLocation();

  const showNavbar =
    location.pathname === "/" ||
    location.pathname === "/login";
    
  return (
    <>
      {/* <Navbar /> */}
      {showNavbar && <PublicNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/revision" element={<Revision />}/>

          <Route path="/analytics" element={<Analytics />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;