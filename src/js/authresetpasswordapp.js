import { Authorize } from "./authorized.js";

//UI
const resetpasswordform  = document.getElementById("resetpasswordform");

//Login
resetpasswordform.addEventListener("submit",(e)=>{
    e.preventDefault();

    const resetemail = document.getElementById("resetemail").value.trim();
    const msg = document.getElementById("msg");


    const {resetpassword} = Authorize();
    resetpassword(resetemail,msg);

})

