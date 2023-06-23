import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = ({onLogout}) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Visual Mind</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className='nav-link active' to="/" > Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link active' to="/recognition" >Recognition</Link>
                            
                        </li>
                    </ul>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button 
                            onClick={() => onLogout()}
                            className="btn btn-outline-danger me-md-2" 
                            type="button">Logout</button>
                    </div>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar objetos" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}
