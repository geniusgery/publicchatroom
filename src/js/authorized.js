import {auth} from "./firebase.js"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {  sendPasswordResetEmail } from "firebase/auth";
import {  onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { signOut } from "firebase/auth";

export function Authorize(){

    // sign up
    const registerUser = async(fullname,email,password)=>{
        
        const defaultprofileimg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRBqTeY-dTImnv-0qS4j32of8dVtWelSEMw&s";
        try{

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // console.log(user);

            await updateProfile(auth.currentUser, {
            displayName:fullname,
            photoURL: defaultprofileimg
            }).then(() => {

                setLocalName(fullname);

                // Redirect to index . html
                window.location.href = "../index.html";
            })


        }catch(error){
            console.error("Error registering users : ",error);
        }
    }

    //signin
    const loginUser = (email,password)=>{

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {


            // console.log(userCredential);

            setLocalName(userCredential.user);

             // Redirect to index . html
            window.location.href = "../index.html";
            
        })
        .catch((error) => {
           console.error("Error logging In : ",error.message);
        });
    }

    //sign out
    const logoutUser = ()=>{

        signOut(auth).then(() => {

            // unset name from localstorage
            unsetLocalName();

            window.location.href = "../signin.html";

        }).catch((error) => {
            console.error("Error logging out = ",error.message);
        });

    }

    // reset password
    const resetpassword = async(email,msg)=>{

        try{

           await sendPasswordResetEmail(auth, email);
           msg.textContent = "Password rest email send.Please check your inbox."
           msg.style.color = "green";
           msg.style.fontSize = "11px";
           
        }catch{
            console.error("Error sending password reset email = ",error.message);

            msg.textContent =  `Error ${error.message}`
           msg.style.color = "red";
           msg.style.fontSize = "11px";

        }

    }

    //Google signin
    const googlelogin = ()=>{

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth,provider)
        .then((result) => {

            // console.log(result);

            // set name to localStorage 
            setLocalName(result.user.displayName);

            // Redirect to index . html
            window.location.href = "../index.html";

        }).catch((error) => {
           console.error("Error logging out = ",error.message);
        });

        
    }
    

    //Auth Check
    const isLoggedIn = ()=>{
        onAuthStateChanged(auth, (userdata) => {
        if (userdata) {
            return true;
        } else {
            window.location.href = "../signin.html";
        }
        });

    }


    // Get User Info
    const getUser = (callback)=>{
        // callback("Hello World!") 

        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
                callback(userdata);
            } 
        });
    }

    

    const setLocalName = (userdata)=>{
        localStorage.setItem("username",userdata.displayName);
    }

    const unsetLocalName = ()=>{
        localStorage.removeItem("username");
    }


    
    return {registerUser,loginUser,logoutUser,resetpassword,googlelogin,isLoggedIn,getUser}
}