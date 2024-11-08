import { createBrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import Catalog from './routes/Catalog.jsx'
import TradingHub from './routes/TradingHub.jsx'
import Messages from './routes/Messages.jsx'
import UserProfile from './routes/UserProfile.jsx'
import Login from './routes/Login.jsx'
import Register from './routes/Register.jsx'
import UserTradePost from "./routes/UserTradePost.jsx"
import Add_Card from "./routes/Add_Card.jsx"

export const router = createBrowserRouter([
    // NavBar
    { path:'/', element:<App /> },
    { path:'/catalog', element:<Catalog /> },
    { path:'/trading-hub', element:<TradingHub /> },
    { path:'/messages', element:<Messages /> },
    { path:'/profile', element:<UserProfile /> },
    { path:'/Login', element:<Login/> },
    { path:'/Register', element:<Register/> },
    { path:'/Add_Card', element:<Add_Card/> },

    { path:'/tradepost', element:<UserTradePost /> },

  ]);
