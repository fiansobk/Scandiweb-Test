import './App.scss';
import Products from './screens/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './screens/AddProduct';
import NotFound from './screens/NotFound';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Products/>} />
          <Route path='/addproduct' element={<AddProduct/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
