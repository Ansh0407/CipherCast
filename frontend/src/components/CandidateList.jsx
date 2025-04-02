import { useState, useEffect } from "react";
import { useWeb3 } from "../contexts/Web3Context";

const CandidateList = () => {
  const { contract } = useWeb3();
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCandidates = async () => {
    if (!contract) return;

    try {
      setIsLoading(true);
      const count = await contract.methods.getCountCandidates().call();
      const candidateArray = [];
      for (let i = 1; i <= count; i++) {
        const candidate = await contract.methods.getCandidate(i).call();
        candidateArray.push({
          id: candidate[0],
          name: candidate[1],
          party: candidate[2],
          voteCount: parseInt(candidate[3], 10),
        });
      }
      setCandidates(candidateArray);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setCandidates([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
    const interval = setInterval(fetchCandidates, 5000);
    return () => clearInterval(interval);
  }, [contract]);

  const getTopCandidateId = () => {
    if (candidates.length === 0) return null;
    const topCandidate = candidates.reduce((prev, current) =>
      prev.voteCount > current.voteCount ? prev : current
    );
    return topCandidate.id;
  };

  const topCandidateId = getTopCandidateId();

  return (
    <div className="bg-white w-full max-w-4xl mt-30 p-6 relative z-50">
      <h2 className="align-center text-2xl font-bold mb-4 text-black">
        Candidate List
      </h2>
      {isLoading ? (
        <p className="text-center text-gray-600">Loading candidates...</p>
      ) : candidates.length > 0 ? (
        <table className="text-center text-black table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-3 text-left">ID</th>
              <th className="border border-gray-300 p-3 text-left">Name</th>
              <th className="border border-gray-300 p-3 text-left">Party</th>
              <th className="border border-gray-300 p-3 text-left">Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr
                key={candidate.id}
                className={`hover:bg-gray-100 ${
                  candidate.id === topCandidateId ? "bg-green-100" : ""
                }`}
              >
                <td className="border border-gray-300 p-3">{candidate.id}</td>
                <td className="border border-gray-300 p-3">{candidate.name}</td>
                <td className="border border-gray-300 p-3">
                  {candidate.party}
                </td>
                <td className="border border-gray-300 p-3">
                  {candidate.voteCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">No candidates found</p>
      )}
    </div>
  );
};

export default CandidateList;
