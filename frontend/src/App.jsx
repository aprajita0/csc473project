import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Catalog from './routes/Catalog'

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Catalog />
      <Footer />
    </div>
  )
}

export default App