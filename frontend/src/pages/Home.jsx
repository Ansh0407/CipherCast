import CandidateList from "../components/CandidateList";
import Vote from "../components/Vote";

const Home = () => {
    return (
        <div>
            <h1>Voting DApp</h1>
            <CandidateList />
            <Vote />
        </div>
    );
};

export default Home;
