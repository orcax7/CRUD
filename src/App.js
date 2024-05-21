import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";



import UserTable from './user-table/userTable';
import Add from './Add/add';
import Edit from './Edit/Edit';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserTable/>}/>
      <Route path="/Edit/:id" element={<Edit />} />
      <Route path='/Add' element={<Add/>}/>
    </Routes>
  </BrowserRouter>
  
  );
}

export default App;