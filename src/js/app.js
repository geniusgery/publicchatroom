import {Chatroom} from "./chat.js";
import { Lielements } from "./lielement.js";
import "@fortawesome/fontawesome-free/css/all.css" ;

// UI 
const chatrooms = document.querySelector(".chatrooms");
const getchatul = document.querySelector(".chat-ul");
const chatform = document.querySelector(".chat-form");
const userform = document.querySelector(".user-form");
const msg = document.querySelector(".msg");
const roomtitle = document.querySelector(".roomtitle");

const getlocalname = localStorage.username ? localStorage.username : "Guest";
userform.username.placeholder =`username is ${getlocalname}`;



//Chatroom instance
const chatroom = Chatroom("general",getlocalname);
roomtitle.textContent = "General";

//Lielement instance
const domli = Lielements(getchatul);

//Start chat
chatform.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message = chatform.message.value.trim();
    chatroom.addChat(message)
        .then(()=>chatform.reset())
        .catch((err)=>console.log(err));
});

// Updated Username 
userform.addEventListener("submit",(e)=>{
    e.preventDefault();

    const newusername = userform.username.value.trim();
    chatroom.updateUsername(newusername);
    userform.reset();

    //show & hide msg
    msg.innerText = `Username is updated to ${newusername}`;
    userform.username.placeholder =`username is ${newusername}`;
    setTimeout(()=>msg.innerText,3000);
})

//Updated chatroom

chatrooms.addEventListener("click",(e)=>{
    e.preventDefault();

    const getbtn = e.target.closest("button");
    console.log(getbtn);

    if(getbtn){

        // reset li 
        domli.resetli();   //reset old li

        const getroomid = getbtn.getAttribute("id");
        
        const gettitle = getbtn.querySelector("h3").innerText;

        roomtitle.textContent = gettitle;

        //update chatroom
        chatroom.updateChatroom(getroomid);

        

    }

    //Fetch get chats
    chatroom.getChats((data)=>{
        domli.newli(data);
    })

})

//get chat
chatroom.getChats((data)=>{
    // return data;
    domli.newli(data);
})


