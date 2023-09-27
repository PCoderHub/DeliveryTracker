import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './components/Home';
import Login from './components/Login';
import ViewAssigned from './components/ViewAssigned';
import TeamView from './components/TeamView';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Login/>} ></Route>
        <Route path='/' element={<Layout />}>
          <Route path='/home' element={<Home />} ></Route>
          <Route path='/assigned' element={<ViewAssigned />} ></Route>
          <Route path='/teamview' element={<TeamView />} ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
