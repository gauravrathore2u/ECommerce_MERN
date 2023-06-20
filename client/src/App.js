import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import NewProduct from './pages/NewProduct';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setProductData } from './redux/productsSlice';
import { useDispatch} from 'react-redux';
import Cart from './pages/Cart';


function App() {
  const dispatch = useDispatch();
  useEffect(()=>(
    async ()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/products`);
      const resData = await res.json();
      dispatch(setProductData(resData));
    }
    ),[]);
    
  return (
    <BrowserRouter>
    <Header />
    <Toaster />
    <div className='pt-16 bg-slate-100 min-h-[Calc(100vh)]'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/menu/:filterby' element={<Menu/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contacts' element={<Contacts/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/newproduct' element={<NewProduct/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/cart' element={<Cart/>}/>

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
