import logo from './logo.svg';
import './App.css';

import Detail from './components/Detail';
import { Route,Routes } from 'react-router-dom';
import Homepage from './components/Homepage';

function App() {
  return (
    <>
    <Routes>
      <Route excat path="/" element={<Homepage />} />
       
       
      <Route path="/gym/:id" element={<Detail />} />
         
        
     
    </Routes>
  </> );
}

export default App;
