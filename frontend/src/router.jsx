import { createBrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import Catalog from './routes/Catalog.jsx'
import TradingHub from './routes/TradingHub.jsx'
import Messages from './routes/Messages.jsx'
import UserProfile from './routes/UserProfile.jsx'
import UserTradePost from "./routes/UserTradePost.jsx"

export const router = createBrowserRouter([
    // NavBar
    { path:'/', element:<App /> },
    { path:'/catalog', element:<Catalog /> },
    { path:'/trading-hub', element:<TradingHub /> },
    { path:'/messages', element:<Messages /> },
    { path:'/profile', element:<UserProfile /> },

    { path:'/tradepost', element:<UserTradePost /> },

  ]);