import { useState, useEffect } from "react";
import { useWeb3 } from "../contexts/Web3Context";

const SetVotingDates = () => {
  const { contract } = useWeb3();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchDates = async () => {
    try {
      const dates = await contract.methods.getDates().call();
      setStartDate(new Date(dates[0] * 1000).toISOString().slice(0, 16));
      setEndDate(new Date(dates[1] * 1000).toISOString().slice(0, 16));
    } catch (error) {
      console.error("Error fetching dates:", error);
    }
  };

  const handleSetDates = async () => {
    try {
      const startTimestamp = new Date(startDate).getTime() / 1000;
      const endTimestamp = new Date(endDate).getTime() / 1000;

      if (endTimestamp <= startTimestamp) {
        alert("End date must be after start date");
        return;
      }

      await contract.methods
        .setDates(startTimestamp, endTimestamp)
        .send({ from: window.ethereum.selectedAddress });

      alert("Voting dates set successfully!");
      fetchDates(); // Refresh after setting
    } catch (error) {
      console.error("Error setting dates:", error);
      alert("Failed to set voting dates");
    }
  };

  useEffect(() => {
    fetchDates();
    const interval = setInterval(fetchDates, 10000);
    return () => clearInterval(interval);
  }, [contract]);

  return (
    <div
      className="p-4 bg-white shadow-lg rounded-lg z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <h2 className="text-2xl font-bold mb-4">Set Voting Dates</h2>
      <input
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleSetDates}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
      >
        Set Voting Dates
      </button>
    </div>
  );
};

export default SetVotingDates;
