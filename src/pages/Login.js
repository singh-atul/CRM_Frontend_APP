import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { Dropdown, DropdownButton } from "react-bootstrap";
import {userSignin,userSignup} from '../api/auth.js'
function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const [message, setMessage] = useState("");
    const [userType, setValue] = useState("CUSTOMER")
    const [userSignUpData,setUserSignUpData] = useState({})
    const navigate = useNavigate();
    useEffect(() => {
        console.log(localStorage.getItem("token"),localStorage.getItem("userTypes"))
            if(localStorage.getItem("token")){
                if ( localStorage.getItem("userTypes")=== "CUSTOMER")
                    navigate('/customer');
                else if ((localStorage.getItem("userTypes") === "ENGINEER"))
                    navigate('/engineer'); 
                else
                    navigate('/admin');          
                }
        
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    const history = useNavigate();
    const loginFn = (e) => {
        const userId = userSignUpData.userId;
        const password = userSignUpData.password


        const data = {
            userId: userId,
            password: password
        };
        e.preventDefault();
        userSignin(data).then(function (response) {
                
                if (response.status === 200) {
                    if (response.data.message) {
                        setMessage(response.data.message)
                    }
                    else {
                        localStorage.setItem("name", response.data.name)
                        localStorage.setItem("userId", response.data.userId);
                        localStorage.setItem("email", response.data.email);
                        localStorage.setItem("userTypes", response.data.userTypes);
                        localStorage.setItem("userStatus", response.data.userStatus);
                        localStorage.setItem("token", response.data.accessToken);
                        if (response.data.userTypes === "CUSTOMER")
                            history('/customer');
                        else if ((response.data.userTypes === "ENGINEER"))
                            history('/engineer'); 
                        else
                            history('/admin');          
                        }
                }
            })
            .catch(function (error) {
                if(error.response.status===401)
                setMessage(error.response.data.message);
            else
                console.log(error);
            });
    }

    const signupFn = (e) => {
        const username =  userSignUpData.username;
        const userId = userSignUpData.userId;
        const email = userSignUpData.email;
        const password = userSignUpData.password


        const data = {
            name: username,
            userId: userId,
            email: email,
            userType: userType,
            password: password
        };
        e.preventDefault();
        userSignup(data).then(function (response) {
                if (response.status === 201) {
                   history(0);
                }
            })
            .catch(function (error) {
                if(error.response.status===400)
                    setMessage(error.response.data.message);
                else
                    console.log(error);
            });
    }

    const  updateSignupData =(e)=>{
        userSignUpData[e.target.id]=e.target.value;
    }

    const toggleSignup = () => {

        setShowSignup(!showSignup);
        if(showSignup){
            setUserSignUpData({});
    }
    }

    const handleSelect = (e) => {
        setValue(e)

    }

    return (

        <div id="loginPage">
            <div id="loginPage" className="bg-primary d-flex justify-content-center align-items-center vh-100">

                <div className="card m-5 p-5 " >
                    <div className="row m-2 ">
                                    <div >
                                        <h4 className="text-center ">{showSignup ? 'Sign up' : 'Login'}</h4>
                                            
                                            <form  onSubmit={showSignup ? signupFn: loginFn}>
                                                <div className="input-group ">
                                                    <input type="text" className="form-control" placeholder="User Id" id="userId" onChange={updateSignupData}  autoFocus required />
                                                
                                                </div>
                                                <input type="password" className="form-control" placeholder="Password"  id="password" onChange={updateSignupData} required/>
                                                {showSignup && <>
                                                <div className="input-group ">
                                                    <input type="text" className="form-control" placeholder="Username" id="username" onChange={updateSignupData} required />
                                                </div>
                                                <div className="input-group ">    
                                                    <input type="text" className="form-control" placeholder="Email" id="email" onChange={updateSignupData} required/>
                                                </div>    
                                                <div className="row">
                                                    <div className="col">
                                                        <span className="mx-1 my-1"> User Type</span>
                                                    </div>
                                                    <div className="col">
                                                        <DropdownButton
                                                            align="end"
                                                            title={userType}
                                                            id="userType"
                                                            onSelect={handleSelect}
                                                        variant="light"
                                                        >
                                                            <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                                            <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                                                        </DropdownButton>
                                                    </div>
                                                </div>
                                                
                                                </>
                                                   }
                                                <div className="input-group">
                                                    <input type="submit" className="form-control btn btn-primary" value={showSignup ? "Sign Up" : "Log In"} />
                                                </div>
                                                <div className="signup-btn text-center" onClick={toggleSignup}>{showSignup ? 'Already have an Account ? Login' : "Don't have an Account? Signup"}</div>
                                                <div className="auth-error-msg text-danger text-center">{message}</div>
                                            </form>
                                    </div>
                                
                    </div>
                </div>
            
            </div>
            <div style={{
                position: "fixed",
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: "white"
                }}>
                <footer className="page-footer">
                    <div className="text-center py-3">© 2022 Copyright:
                        <a href="https://relevel.com">Relevel by Unacademy</a>
                    </div>
                </footer>
            </div>
        </div>
        
          
    )
}

export default Login;