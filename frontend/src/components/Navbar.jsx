import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="Navbar bg-white  flex justify-between items-center px-16 py-8 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className='text-lg text-slate-600 font-black'>MyIdolList</div>
        <div className='text-sm text-slate-500 font-medium flex space-x-8'>
          <Link to='/'>Home</Link>
          <div className='text-slate-400'>|</div>
          <Link to='/trading-hub'>Trade Hub</Link>
          <div className='text-slate-400'>|</div>
          <Link to='/catalog'>Catalog</Link>
          <div className='text-slate-400'>|</div>
          {/* <Link to='/search'>Search</Link> */}
          <Link to='/messages'>Messages</Link>
          <div className='text-slate-400'>|</div>
          <Link to='/profile'>Profile</Link>
        </div>
    </div>
  )
}

export default Navbar