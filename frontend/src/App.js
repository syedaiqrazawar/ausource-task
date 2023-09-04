
import SignUp from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Resource from './components/Resource';
import UsersList from './components/UsersList';

function App() {
  return (
    <div className="App">
      {/* public routes */}
      <Routes>
        <Route path="/" element ={<Login/>}/>
        <Route path="/Resource" element ={<Resource/>}/>
        <Route path="/UsersList" element ={<UsersList/>}/>
        <Route path="/signup" element ={<SignUp/>}/>
        <Route path ='/home' element={<Home/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
