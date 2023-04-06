import './App.css';
import React,{useState} from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
const store = require('store-js');
function App() {

  const token = store.get('token');
  const [clicked, setClicked] = useState('login');
  const[initial,setInitial] = useState(true)
  if (token===undefined || token.length===0 || token===null ) {
    
    if (clicked === 'register') {
      return <Register setClicked={setClicked} />;
    } else {
      return <Login setClicked={setClicked} />;
    }
  }

  if(token.length>0){
    return <Dashboard initial={initial} setInitial={setInitial}/>;
  }

 
  return (
    <div className="App">
      <div>
        
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Dashboard />}></Route>
          </Routes>
        </BrowserRouter>
        
        
      </div>
    </div>
  );
}

export default App;
