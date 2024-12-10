import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserTradePostCard from '../components/UserTradePostCard';
import Sidebar from '../components/Sidebar';

const TradingHub = () => {
  const repeatCount = 20;

  return (
    <div>
      <Navbar />
      <div className='TradingHub mt-28 flex flex-col flex-grow justify-between min-h-screen'>
        <div className='flex px-16 pb-6'>

          <Sidebar />

          <div className='TradingHub-Content flex-grow pl-8'>
            <div className='gap-4 grid grid-flow-row auto-rows-max' style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
              {Array.from({ length: repeatCount }).map((_, index) => (
                <UserTradePostCard key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TradingHub