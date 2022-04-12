import logo from '../assets/logo.svg'
import LogoutBtn from './Logout'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
          <div className="container-fluid px-5">
            <a className="navbar-brand" href="#"><img src={logo}/></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>   
              <div  className=" me-auto ">
                <LogoutBtn/>
                </div>   
          </div>
        </nav>
    )
}

export default Navbar;