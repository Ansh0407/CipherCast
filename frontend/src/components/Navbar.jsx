import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-[#241c3b] p-4 shadow-md text-white fixed top-0 left-0 w-full z-[200]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold">CipherCast</h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/add-candidate" className="hover:underline">
              Add Candidate
            </Link>
          </li>
          <li>
            <Link to="/set-voting-dates" className="hover:underline">
              Set Voting Dates
            </Link>
          </li>
          <li>
            <Link to="/candidate-vote-page" className="hover:underline">
              Vote
            </Link>
          </li>
          <li>
            <Link to="/status" className="hover:underline">
              Voting Status
            </Link>
          </li>
          <li>
            <Link to="/results" className="hover:underline">
              Results
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
