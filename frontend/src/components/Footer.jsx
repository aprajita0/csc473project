import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="Footer bg-neutral-100 p-8 w-full flex justify-center space-x-12">
      <div className='my-idol-list flex flex-col justify-center'>
        <p className='text-2xl font-bold'>MyIdolList</p>
        <div className='text-sm'>
          <p>The City College of New York</p>
          <p>160 Convent Ave, New York, NY 10031</p>
        </div>
      </div>

      <div className='nav-links flex space-x-12'>
        <div>
          <p className='font-bold'>Main Menu</p>
          <div className='text-sm flex flex-col'>
            <Link className='hover:underline' to='/'>Home</Link>
            <Link className='hover:underline' to='/trading-hub'>Trade Hub</Link>
            <Link className='hover:underline' to='/catalog'>Catalog</Link>
            {/* <Link to='/search'>Search</Link> */}
            <Link className='hover:underline' to='/messages'>Messages</Link>
            <Link className='hover:underline' to='/profile'>Profile</Link>
          </div>
        </div>
        <div>
          <p className='font-bold'>About Us</p>
          <div className='text-sm flex flex-col'>
            <Link className='hover:underline' to='/'>Meet the Team</Link>
            <Link className='hover:underline' to='/trading-hub'>Instagram</Link>
            <Link className='hover:underline' to='/catalog'>Twitter/X</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
