import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='nav flex justify-between items-center px-16 py-8'>
        <div className='text-lg text-slate-600 font-black'>MyIdolList</div>
        <div className='text-sm text-slate-500 font-medium flex space-x-8'>
          <Link className='hover:scale-105' to='/'>Home</Link>
          <div className='text-slate-400'>|</div>
          <Link className='hover:scale-105' to='/trading-hub'>Trade Hub</Link>
          <div className='text-slate-400'>|</div>
          <Link className='hover:scale-105' to='/catalog'>Catalog</Link>
          <div className='text-slate-400'>|</div>
          {/* <Link to='/search'>Search</Link> */}
          <Link className='hover:scale-105' to='/messages'>Messages</Link>
          <div className='text-slate-400'>|</div>
          <Link className='hover:scale-105' to='/profile'>Profile</Link>
        </div>
    </div>
  )
}

export default Navbar