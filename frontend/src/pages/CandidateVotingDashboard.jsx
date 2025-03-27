import CandidateList from "../components/CandidateList";
import VoteComponent from "../components/VoteComponent";
import { Link } from "react-router-dom";

const CandidateVotePage = () => {
  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/assets/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navbar */}
      <nav className="bg-[#241C3B] bg-opacity-90 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/path-to-your-logo" alt="CipherCast Logo" className="h-8 mr-4" />
          <span className="text-xl font-bold">CipherCast</span>
        </div>
        <div className="space-x-4">
          <Link to="/home" className="hover:text-gray-300">Home</Link>
          <Link to="/add-candidate" className="hover:text-gray-300">Add Candidate</Link>
          <Link to="/candidate-list" className="hover:text-gray-300">Candidate List</Link>
          <Link to="/set-voting-dates" className="hover:text-gray-300">Set Voting Dates</Link>
          <Link to="/vote" className="hover:text-gray-300">Vote</Link>
          <Link to="/voting-status" className="hover:text-gray-300">Voting Status</Link>
          <Link to="/candidate-voting" className="hover:text-gray-300">Candidate Voting</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 p-4">
        <div className="w-1/2  bg-opacity-90 p-6 rounded-lg shadow-lg text-gray-200">
          <div className="flex-1">
            <CandidateList />
          </div>
        </div>

        <div className="w-1/2 p-6 rounded-lg shadow-lg ml-4 text-gray-200">
          <div className="flex-1">
            <VoteComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateVotePage;
