import { db } from "./firebase.js";
import { collection,addDoc,onSnapshot,Timestamp,query,where,orderBy } from "firebase/firestore";  

export function Chatroom(room,username){

    let curroom = room;
    let curuser = username;
    const dbRef = collection(db,"chats");
    let unsubscribe = null;

    const addChat = async(message)=>{
        
        const now = new Date();
        const chatdata = {
            username:curuser,
            room:curroom,
            message,
            created_at:Timestamp.fromDate(now)

        };

        try{

            const respone = await addDoc(dbRef,chatdata);
            return respone;

        }catch (err){
            console.log(err);
            throw err;
        }
    }

    const getChats = (callback)=>{

        // onSnapshot(
        //     query(dbRef,where("room","==",curroom),orderBy("created_at"))
        //     ,docSnap=>{

        //     docSnap.forEach(doc=>{
        //         console.log(doc);
        //     });

        // });

        if(unsubscribe){
            unsubscribe();
        }

        unsubscribe = onSnapshot(
            query(dbRef,where("room","==",curroom),orderBy("created_at"))
            ,(docSnap)=>{

            docSnap.docChanges().forEach(item=>{
                // console.log(item);
                if(item.type === "added"){
                    callback(item.doc.data());
                }
            })

        });

    }

    const updateChatroom = (newroom)=>{
        curroom = newroom;
        // console.log(`Room updated to ${curroom}`);
    }

    const updateUsername = (newusername)=>{
        curuser = newusername;
        localStorage.setItem("username",curuser);
        // console.log(`Username updated to ${curuser}`);

    }

    return {addChat,getChats,updateChatroom,updateUsername};
}