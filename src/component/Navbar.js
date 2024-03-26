import React, {useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  var navigate=useNavigate();
  var location=useLocation();

  
  useEffect(()=>{
    console.log(location.pathname);
  },[location])
  const clicklogout=()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">PSK</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="collapsibleNavbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/" ? 'active':''}`} to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about" ? 'active':''}`} to="/about">About us</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/" ? 'active':''}`} to="#">Link</Link>
        </li>  
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Dropdown</Link>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Link</a></li>
            <li><a className="dropdown-item" href="#">Another link</a></li>
            <li><a className="dropdown-item" href="#">A third link</a></li>
          </ul>
        </li>
      </ul>
    </div>
    {!localStorage.getItem('token')?
    <form className="d-flex">
        
        <Link to="/login"><button className="btn btn-primary mx-2"  type="button">Login</button></Link>
        <Link to="/signup"><button className="btn btn-primary mx-2"  type="button">signup</button></Link>
      </form>:
      <button className="btn btn-primary mx-2" type="button" onClick={clicklogout}>Logout</button>
  }
  </div>
</nav>
    </div>
  )
}

export default Navbar;
