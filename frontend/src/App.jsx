import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import Catalog from './routes/Catalog';
import TradingHub from './routes/TradingHub';
import Messages from './routes/Messages';

const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/trading-hub" element={<TradingHub />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/messages" element={<Messages />} /> */}
        </Routes>
    </div>
  );
}

export default App;
