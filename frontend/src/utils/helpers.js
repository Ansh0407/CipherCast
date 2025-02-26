export const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };
  
  export const shortenAddress = (address) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  };
  