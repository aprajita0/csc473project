import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserTradePostCard from '../components/UserTradePostCard';

const TradingHub = () => {
  const repeatCount = 20;

  return (
    <div>
      <Navbar />
      <div className='TradingHub mt-28 flex flex-col flex-grow justify-between min-h-screen'>
        <div className='flex px-16 pb-6'>

          <aside className="TradingHub-Sidebar bg-neutral-100 h-screen sticky top-28 border rounded-md p-4
                            drop-shadow-lg">
            <input className="border rounded-md p-2" type="search" placeholder="Search" />
            <div>buying or selling</div>
            <div>price-range</div>
            <div>group</div>
            <div>gender</div>
            <div>year</div>
          </aside>

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