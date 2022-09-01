import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserName,
  setUserLoginDetails,
} from "../features/user/userSlice";
import { useEffect } from "react";
import { LoginServiceClient } from "./proto/login_grpc_web_pb";
import $ from "jquery";
import { LoginRequest, LoginForm } from "./proto/login_pb";
import "./styles.css";
import "./normalize.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const formService = new LoginServiceClient('http://localhost:8080', null, null);
  const INTERVAL = 1000;

  useEffect(() => {
    // console.log("userName in useEffect: "+userName)
    if(userName != null && userName != '') {
      setTimeout(() => navigate('/'), INTERVAL);
    }
  }, [userName])

  class user {
    constructor(name, email, reservations){
      this.name = name;
      this.email = email;
      this.reservations = reservations;
    }
  }

  // dispatch to redux store
  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.name,
        email: user.email,
        reservations: user.reservations,
      })
    );
  };
  
  function login(e) {
      e.preventDefault();
      
      var formData = $("#login_form").serializeArray();
      var email = formData[0].value.trim();
      var password = formData[1].value.trim();
      var form = new LoginForm();
      form.setEmail(email);
      form.setPassword(password);
      if (!form)
        return false;
      var request = new LoginRequest();
      request.setForm(form);
      
      var call = formService.login(request, {}, function (err, response) {
        if (err) {
          console.log(err);
          return null;
        } else {
          var result = document.getElementById("result");
          if (!response.getSuccess()) {
              // show the error message in red color
              result.innerHTML = `<span style="color:red">${response.getMessage()}</span>`;
          } else {
            const reservations = response.getReservationsList(); // returns the array of reservation
            var myReservatioin = []
            reservations.forEach(element => {
              myReservatioin.push(element["array"])
            });
            // show success, and redirect to the login page in 10sec
            const name = response.getName(); 
            result.innerHTML = `<span style="color:green"><p>${"Successfully logged in!"}</br>${"Redirecting to the home page..."}</p></span>`;
            setUser(new user(name, email, myReservatioin));
          }
        }
      });
    }

  return (
  <div className="card-wrapper">
    <div className="card">
      <h1 className="center">Login</h1>
      <form name="login_form" id="login_form" >
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className="field" placeholder="Enter email" required />
        
        <label htmlFor="password">Password</label>
        <input type="password" name="password" className="field" placeholder="Enter password" required />
        
        <div id="result" className="center"></div><br/>
        <div id="goSignup" className="center">
         <Link> <a href="/signup" >Create an account</a></Link>
        </div>

        <input type="submit" value="Log in" className="btn" onClick={login}/>
      </form>
    </div>
  </div>
  )
};
          
const Link = styled.div`
  a {
    color:blue;
  }
`;
export default Login;
