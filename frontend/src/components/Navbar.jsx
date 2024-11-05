import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='nav'>
        <Link to='/'>Home</Link>
        <Link to='/trading-hub'>Trade Hub</Link>
        <Link to='/catalog'>Catalog</Link>
        {/* <Link to='/search'>Search</Link> */}
        <Link to='/messages'>Messages</Link>
        <Link to='/profile'>Profile</Link>
    </div>
  )
}

export default Navbar