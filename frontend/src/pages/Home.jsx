import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useWeb3 } from "../contexts/Web3Context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundImage from "../assets/background.png";
import AddCandidate from "../components/AddCandidate";
import CandidateList from "../components/CandidateList";
import ConnectWallet from "../components/ConnectWallet";
import SetVotingDates from "../components/SetVotingDates";
import VoteComponent from "../components/VoteComponent";
import VotingStatus from "../components/VotingStatus";

const Home = () => {
  const { connectWallet, account } = useWeb3();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      await connectWallet();
    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert("Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="relative w-full h-screen">
        {/* Navbar (Handles Navigation) */}
        <Navbar />

        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            filter: "brightness(50%)",
          }}
        ></div>

        {/* Routes for Navigation */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                  WELCOME TO <br />
                  <span className="text-red-500">DIGITAL VOTING</span>
                </h1>
                <p className="text-lg mt-4">Ensuring transparency and security in voting.</p>

                {/* Connect Wallet Button */}
                <button
                  onClick={handleConnect}
                  className="mt-6 px-6 py-3 text-lg font-semibold border border-white rounded-full hover:bg-white hover:text-blue-600 transition-all"
                  disabled={loading}
                >
                  {loading ? "Connecting..." : account ? `Connected: ${account}` : "Connect Wallet"}
                </button>
              </div>
            }
          />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="/add-candidate" element={<AddCandidate />} />
          <Route path="/candidates" element={<CandidateList />} />
          <Route path="/set-voting-dates" element={<SetVotingDates />} />
          <Route path="/vote" element={<VoteComponent />} />
          <Route path="/status" element={<VotingStatus />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default Home;
