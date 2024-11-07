import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
    console.log('logged in:', loggedInStatus); 
  }, []);

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate('/login'); 
    } else {
      navigate('/profile'); 
    }
  };

  return (
    <div className="Navbar bg-white flex justify-between items-center px-16 py-8 fixed top-0 left-0 right-0 z-50 shadow-md">
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

        <Link className='hover:underline' to='/messages'>Messages</Link>
        <div className='text-slate-400'>|</div>

        <button onClick={handleProfileClick} className='hover:underline'>
          Profile
        </button>
      </div>
    </div>
  );
};

export default Navbar;
