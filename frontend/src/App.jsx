import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import Login from './routes/Login'; 
import Register from './routes/Register'; 
import Catalog from './routes/Catalog';
import TradingHub from './routes/TradingHub';
import Messages from './routes/Messages';

const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          {/* <Route path="/trading-hub" element={<TradingHub />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/messages" element={<Messages />} /> */}
        </Routes>
    </div>
  );
}

export default App;
