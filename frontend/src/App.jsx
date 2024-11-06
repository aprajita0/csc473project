import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Catalog from './routes/Catalog';

const App = () => {
  return (
    <div className="App flex flex-col justify-between"> {/* Flex container with full height */}
      <Navbar />
      <div className="flex-grow"> {/* Main content area that grows */}
        <Catalog />
      </div>
      <Footer />
    </div>
  );
}

export default App;
