import { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

const SetVotingDates = () => {
  const { contract } = useWeb3();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSetDates = async () => {
    try {
      const startTimestamp = new Date(startDate).getTime() / 1000;
      const endTimestamp = new Date(endDate).getTime() / 1000;

      if (endTimestamp <= startTimestamp) {
        alert('End date must be after start date');
        return;
      }

      await contract.methods.setDates(startTimestamp, endTimestamp).send({ from: window.ethereum.selectedAddress });
      alert('Voting dates set successfully!');
    } catch (error) {
      console.error('Error setting dates:', error);
      alert('Failed to set voting dates');
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Set Voting Dates</h2>
      <input
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={handleSetDates}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Set Voting Dates
      </button>
    </div>
  );
};

export default SetVotingDates;
