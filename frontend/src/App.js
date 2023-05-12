import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "./theme";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  useEffect(() => {
    getDoc(doc(db, "users", "lVsOjAp06AfD6atT8bnrVEpcdcg2"))
      .then((doc) => {
        if (doc.exists()) {
          console.log(doc.data());
        } else {
          console.log("Doc did not exist");
        }
      })
      .catch(console.error);
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ backgroundColor: "darkgray" }}>
        <ThemeProvider theme={theme}>
          <Router>
            <div className="App">
              <Navbar />
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </div>
            </div>
          </Router>
        </ThemeProvider>
      </div>
    </LocalizationProvider>
  );
}

export default App;
