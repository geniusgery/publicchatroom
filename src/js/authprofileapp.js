import { Authorize } from "./authorized.js";
import { UIElement } from "./uielement.js";

//UI
const userinfodiv  = document.getElementById("userinfo");
const logoutbtn = document.getElementById("logoutbtn");

//Authorize instance
const authorize = Authorize();

//Uielement instance
const uiele = UIElement(userinfodiv);

// Get info & render 
authorize.getUser((data)=>{
    // console.log(data);
    uiele.userInfoEle(data);
})

//Log Out
logoutbtn.addEventListener("click",(e)=>{

    const {logoutUser} = Authorize();
    logoutUser();

});