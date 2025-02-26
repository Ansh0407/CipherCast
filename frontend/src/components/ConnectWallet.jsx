import { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

const ConnectWallet = () => {
  const { connectWallet, account } = useWeb3();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      await connectWallet();
    } catch (error) {
      console.error('Wallet connection failed:', error);
      alert('Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {account ? (
        <p className="text-green-500">Connected: {account}</p>
      ) : (
        <button
          onClick={handleConnect}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
