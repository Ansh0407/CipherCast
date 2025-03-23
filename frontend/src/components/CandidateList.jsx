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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Candidate List</h2>
        {candidates.length > 0 ? (
          <ul className="divide-y divide-gray-300">
            {candidates.map((candidate) => (
              <li key={candidate.id} className="p-3 flex justify-between items-center bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm mb-2">
                <div>
                  <span className="font-semibold text-gray-900">{candidate.name}</span> 
                  <span className="text-gray-600 ml-2">({candidate.party})</span>
                </div>
                <span className="text-blue-600 font-semibold">Votes: {candidate.voteCount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No candidates found</p>
        )}
      </div>
    );
  };

  export default CandidateList;
