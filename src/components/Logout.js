const LogoutBtn = () => {
    const logoutBtn = e => {
      e.preventDefault()
      localStorage.clear();
      window.location.href ="/"
    }
  
    return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className=" me-auto mb-2 mb-lg-0">
                <form className="d-flex" onSubmit={logoutBtn}>
                    <button className="btn btn-outline-primary" type="submit">Logout</button>
                </form>
            </ul>
        </div>
    )
  
  }

  export default LogoutBtn;