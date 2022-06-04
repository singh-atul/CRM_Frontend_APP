import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { useAuth0 } from "@auth0/auth0-react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import queryString from 'query-string'
import {userSignin,userSignup,userAuthSignin} from '../api/auth.js'

function Login() {
    const { loginWithRedirect, user,isAuthenticated } = useAuth0();
    const [showSignup, setShowSignup] = useState(false);
    const [message, setMessage] = useState("");
    const [userType, setValue] = useState("CUSTOMER")
    const [userSignUpData,setUserSignUpData] = useState({})

    useEffect(() => {
            if(localStorage.getItem("token")){
                if ( localStorage.getItem("userTypes")=== "CUSTOMER")
                    history('/customer');
                else if ((localStorage.getItem("userTypes") === "ENGINEER"))
                    history('/engineer'); 
                else
                    history('/admin');          
                }
        
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    const history = useNavigate();
    const loginFn = (e) => {
        // const userId = document.getElementById("userId").value;
        // const password = document.getElementById("password").value;

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
        console.log('data',data)
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
        console.log(userSignUpData);
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
    const checkAuth = ()=>{
        if(isAuthenticated){
            const {code} = queryString.parse(window.location.search)
            user.code = code
            userAuthSignin(user).then(function (response) {
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
            if(error.response.status===400 || error.response.status===401)
                console.log(error.response.data.message);
            else
                console.log(error);
        });
        }
        return isAuthenticated
    }
    return (
        
        !checkAuth() && ( <div id="loginPage">
            <div id="loginPage" className="bg-primary d-flex justify-content-center align-items-center vh-100">

                <div className="card m-5 p-5" >
                    <div className="row m-2">
                        <div className="col">

                            {
                                !showSignup ? (
                                    
                                    <div >
                                        <h4 className="text-center">Login</h4>
                                            <form  onSubmit={loginFn}>
                                                <input type="text" className="form-control" placeholder="User Id" id="userId" onChange={updateSignupData} required />
                                                <input type="password" className="form-control" placeholder="Password"  id="password" onChange={updateSignupData} required/>
                                                <input type="submit"  className="form-control btn btn-primary" value="Log in" />
                                            
                                                <div className="signup-btn text-right text-info" onClick={toggleSignup}>Dont have an Account ? Signup</div>
                                                <div className="auth-error-msg text-danger text-center">{message}</div>
                                            </form>
                                            {/* <button className="signup-btn m-2 btn btn-primary text-right text-white" onClick={()=>loginWithRedirect()}>Login Using Third party ? Click here
                                                </button> */}
                                    </div>
                                ) : (
                                    <div>
                                        <h4 className="text-center">Signup</h4>
                                        <form  onSubmit={signupFn}>
                                                <input type="text" className="form-control" placeholder="User Id" id="userId" onChange={updateSignupData} required />
                                            
                                                <input type="text" className="form-control" placeholder="Username" id="username" onChange={updateSignupData} required />
                                                <input type="text" className="form-control" placeholder="Email" id="email" onChange={updateSignupData} required/>
                                                <input type="password" className="form-control" placeholder="Password" id="password" onChange={updateSignupData} required />
                                            <div className="input-group m-1">
                                            <span className="text-muted my-2 mx-2"> User Type</span>
                                                <DropdownButton
                                                    align="end"
                                                    title={userType}
                                                    id="userType"
                                                    onSelect={handleSelect}
                                                variant="light"
                                                className="mx-1"
                                                >
                                                    <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                                    <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                                                </DropdownButton>
                                            </div>
                                            <input type="submit" className="form-control btn btn-primary m-1" value="Sign up"  />
                                            <div className="signup-btn text-center text-info"  onClick={toggleSignup}>Already have an Account ? Login</div>
                                            <div className="auth-error-msg text-danger text-center">{message}</div>
                                        </form>
                                    </div>
                                    
                                        
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
        )   
    )
}

export default Login;