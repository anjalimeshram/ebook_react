// import logo from './logo.svg';
import './App.css';
import About from './component/About';
import Home from './component/Home';
import Navbar from './component/Navbar';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import NoteState from './context/NoteState';
import Alert from './component/Alert';
import AddNote from './component/AddNote';
import Notes from './component/Notes';
import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  return (
    <div className="App">
      <NoteState>
    <Router>
      <Navbar/>
      <Alert message='psk technologies app'/>
      {/* <AddNote/> */}
      {/* <Notes/> */}
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>



      </Routes>
    </Router>
    </NoteState>
    
    </div>
  );
}

export default App;
