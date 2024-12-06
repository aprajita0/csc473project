import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import Login from './routes/Login'; 
import Register from './routes/Register'; 
import Add_Card from './routes/Add_Card'; 
import Catalog from './routes/Catalog';
import TradingHub from './routes/TradingHub';
import Messages from './routes/Messages';
import Compose from './components/ComposeMessage';

const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Add_Card" element={<Add_Card />} />
          <Route path="/Compose" element={<Compose/>} />
          <Route path="/messages" element={<Messages />} /> 
          {/* <Route path="/trading-hub" element={<TradingHub />} />
          <Route path="/catalog" element={<Catalog />} />*/}
        </Routes>
    </div>
  );
}

export default App;
