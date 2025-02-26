import { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

const AddCandidate = () => {
  const { contract, account } = useWeb3();
  const [name, setName] = useState('');
  const [party, setParty] = useState('');

  const handleAddCandidate = async () => {
    if (!name || !party) return alert('Please fill in all fields');
    try {
      const tx = await contract.methods.addCandidate(name, party).send({ from: account });
      alert(`Candidate added! Transaction Hash: ${tx.transactionHash}`);
      setName('');
      setParty('');
    } catch (error) {
      console.error('Error adding candidate:', error);
      alert('Failed to add candidate');
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Candidate</h2>
      <input
        type="text"
        placeholder="Candidate Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Party Name"
        value={party}
        onChange={(e) => setParty(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={handleAddCandidate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Candidate
      </button>
    </div>
  );
};

export default AddCandidate;