import './App.css';
import { NavBar } from './Components/NavBar/NavBar';
import { BrowserRouter, Routes,  Route} from 'react-router-dom'
import { All } from './Pages/All';
import {AllCategory} from './Pages/AllCategory';
import {Product} from './Pages/Product';
import {Cart} from './Pages/Cart';
import {LoginSignup} from './Pages/LoginSignup';
import { Footer } from './Components/Footer/Footer';


function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<All/>}/>
        <Route path='/painting' element={<AllCategory category = "painting"/>}/>
        <Route path='/paperart' element={<AllCategory category = "paperart"/>}/>
        <Route path='/knitting' element={<AllCategory category = "knitting"/>}/>
        {/* <Route path='/home-decor' element={<AllCategory category = "home-decosr"/>}/> */}
        <Route path='/embroidary' element={<AllCategory category = "embroidary"/>}/>
        <Route path='/jwellery' element={<AllCategory category = "jwellery"/>}/>
        {/* <Route path='/origami' element={<AllCategory category = "origamis"/>}/> */}
        <Route path='/beadwork' element={<AllCategory category = "beadwork"/>}/>
        <Route path='/pottery' element={<AllCategory category = "pottery"/>}/>
        <Route path = '/product' element ={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>

      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
