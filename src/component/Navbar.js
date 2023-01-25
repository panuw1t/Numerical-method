import { Outlet, Link } from "react-router-dom";


function Navbar() {
    const stylelink = {
        
    }
    return (
        <>
        <nav class="navbar navbar-expand-sm  bg-primary navbar-dark" style={{marginBottom:"1%"}}>
            <div class="container-fluid">
                <Link class="nav-link navbar-brand" style={stylelink} to="/">Numerical Method</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">                        
                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle" style={stylelink} role="button" data-bs-toggle="dropdown">Root of Equation</Link>
                            <ul class="dropdown-menu">
                                <li>
                                    <Link class="dropdown-item" to="/Bisection">Biscetion</Link>
                                </li>
                                <li>
                                    <Link class="dropdown-item" to="/Newton_raphson">Newton raphson</Link>
                                </li>
                                <li>
                                    <Link class="dropdown-item" to="/Secant">Secant</Link>
                                </li>
                                <li>
                                    <Link class="dropdown-item" to="/False_position">False position</Link>
                                </li>
                                <li>
                                    <Link class="dropdown-item">5.</Link>
                                </li>
                            </ul>
                        </li>

                        <li class="nav-item">
                            <Link class="nav-link" style={stylelink}>1.</Link>
                        </li>

                        <li class="nav-item">
                            <Link class="nav-link" style={stylelink}>2.</Link>
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