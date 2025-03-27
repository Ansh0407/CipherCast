import { Web3Provider } from "./contexts/Web3Context";
import Home from "./pages/Home";


const App = () => {
  return (
    <Web3Provider>
      <Home />
      
    </Web3Provider>
  );
};

export default App;
