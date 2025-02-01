import AddCandidate from "../components/AddCandidate";
import SetVotingDates from "../components/SetVotingDates";

const Admin = () => {
    return (
        <div>
            <h1>Admin Panel</h1>
            <AddCandidate />
            <SetVotingDates />
        </div>
    );
};

export default Admin;
