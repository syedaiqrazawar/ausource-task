
import './App.css';
import SignUp from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Resource from './components/Resource';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element ={<Resource/>}/>
        <Route path="/signup" element ={<SignUp/>}/>
        <Route path ='/home' element={<Home/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
