import { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

const CandidateList = () => {
  const { contract } = useWeb3();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const count = await contract.methods.getCountCandidates().call();
        const candidateArray = [];
        for (let i = 1; i <= count; i++) {
          const candidate = await contract.methods.getCandidate(i).call();
          candidateArray.push({
            id: candidate[0],
            name: candidate[1],
            party: candidate[2],
            voteCount: candidate[3]
          });
        }
        setCandidates(candidateArray);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    
    fetchCandidates();
  }, [contract]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Candidate List</h2>
      {candidates.length > 0 ? (
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.id} className="p-2 border-b">
              <span className="font-semibold">{candidate.name}</span> - {candidate.party}
              <span className="ml-4 text-sm text-gray-600">Votes: {candidate.voteCount}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates found</p>
      )}
    </div>
  );
};

export default CandidateList;
