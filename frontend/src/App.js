import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

function App() {
	return (
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
								<Route
									path="/register"
									element={<Register />}
								/>
								<Route path="/login" element={<Login />} />
								<Route
									path="/checkout"
									element={<Checkout />}
								/>
							</Routes>
						</div>
					</div>
				</Router>
			</ThemeProvider>
		</div>
	);
}

export default App;
