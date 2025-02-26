import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Web3Provider } from "./contexts/Web3Context";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AddCandidate from "./components/AddCandidate";
import CandidateList from "./components/CandidateList";
import ConnectWallet from "./components/ConnectWallet";
import SetVotingDates from "./components/SetVotingDates";
import VoteComponent from "./components/VoteComponent";
import VotingStatus from "./components/VotingStatus";

const App = () => {
  return (
    <Web3Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="/add-candidate" element={<AddCandidate />} />
          <Route path="/candidates" element={<CandidateList />} />
          <Route path="/set-voting-dates" element={<SetVotingDates />} />
          <Route path="/vote" element={<VoteComponent />} />
          <Route path="/status" element={<VotingStatus />} />
        </Routes>
        <Footer />
      </Router>
    </Web3Provider>
  );
};

export default App;
