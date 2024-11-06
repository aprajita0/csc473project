import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const TradingHub = () => {
  return (
    <div className='TradingHub mt-28 flex flex-col flex-grow justify-between min-h-screen'>
      <Navbar />
      <div>
        Trading Hub
      </div>
      <Footer />
    </div>
  )
}

export default TradingHub