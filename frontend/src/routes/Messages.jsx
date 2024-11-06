import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Messages = () => {
  return (
    <div className='Messages mt-28 flex flex-col flex-grow justify-between min-h-screen'>
      <Navbar />
      <div>
        Messages
      </div>
      <Footer />
    </div>
  )
}

export default Messages