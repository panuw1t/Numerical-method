import { Outlet, Link } from "react-router-dom";


function Navbar() {
    const stylelink = {
        
    }
    return (
        <>
        <nav className="navbar navbar-expand-sm  bg-primary navbar-dark" style={{marginBottom:"1%"}}>
            <div className="container-fluid">
                <Link className="nav-link navbar-brand" style={stylelink} to="/">Numerical Method</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">                        
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" style={stylelink} role="button" data-bs-toggle="dropdown">Root of Equation</Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/Bisection">Biscetion</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/Newton_raphson">Newton raphson</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/Secant">Secant</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/False_position">False position</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="Fixed_point_iteration">Fixed-point iteration</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" style={stylelink} role="button" data-bs-toggle="dropdown">Linear Equation</Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/Cramer_rule">Cramer's rule</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item">1.</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item">2.</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" style={stylelink}>3.</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <Outlet />
      </>
    )
}

export default Navbar;