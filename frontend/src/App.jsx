import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

//import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Revision from "./pages/Revision";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/revision" element={<Revision />}/>

        <Route path="/analytics" element={<Analytics />}/>
        
      </Routes>
    </>
  );
}

export default App;