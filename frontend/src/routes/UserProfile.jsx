import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const UserProfile = () => {
  return (
    <div className='UserProfile mt-28 flex flex-col flex-grow justify-between min-h-screen'>
      <Navbar />
      <div>
        UserProfile
      </div>
      <Footer />
    </div>
  )
}

export default UserProfile