import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="Navbar bg-white  flex justify-between items-center px-16 py-8 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className='text-2xl text-slate-600 font-black hover:scale-110'>
        <Link to='/'>MyIdolList</Link>
      </div>

      <div className='text-sm text-slate-600 font-medium flex space-x-4'>
        <Link className='hover:underline' to='/'>Home</Link>
        <div className='text-slate-400'>|</div>

        <Link className='hover:underline' to='/trading-hub'>Trade Hub</Link>
        <div className='text-slate-400'>|</div>

        <Link className='hover:underline' to='/catalog'>Catalog</Link>
        <div className='text-slate-400'>|</div>

        {/* <Link to='/search'>Search</Link> */}

        <Link className='hover:underline' to='/messages'>Messages</Link>
        <div className='text-slate-400'>|</div>

        <Link className='hover:underline' to='/profile'>Profile</Link>
      </div>
    </div>
  )
}

export default Navbar