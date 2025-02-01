import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import User from "./pages/User";
import VotingProvider from "./context/VotingContext";

function App() {
    return (
        <VotingProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/user" element={<User />} />
                </Routes>
            </Router>
        </VotingProvider>
    );
}

export default App;
