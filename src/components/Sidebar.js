import { CSidebar, CSidebarNav, CNavTitle, CNavItem } from '@coreui/react';
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


function Sidebar() {
  const { logout } = useAuth0();
  return (
    <CSidebar unfoldable className='vh-100 bg-black' >
      
      <CSidebarNav>
      <CNavItem href="#" className="bg-dark">
      <i className="bi bi-bar-chart-fill text-white m-2"></i>
          <h5 className="text-white mx-3  my-1 fw-bolder">TETHERX</h5>

        </CNavItem>
        <CNavTitle className='text-light fw-normal'>
          A CRM app for all your needs...
        </CNavTitle>
        <CNavItem href="#">
          <i className="bi bi-house text-white m-2"></i>
          <Link to="/admin" className='text-decoration-none text-white mx-3'>Home</Link>
        </CNavItem>
        
        <div onClick={logout}>
        <CNavItem href="#">
          <i className="bi bi-box-arrow-left text-white m-2"></i>
          <div  className='text-decoration-none text-white mx-3'>Logout</div>
        </CNavItem>
        </div>
      </CSidebarNav>
    </CSidebar>

  )
}

export default Sidebar;