import "./ChatConversations.css";
import{useState, useEffect} from 'react';
import axios from "axios";
import React from 'react';

export default function ChatConversations ({currentUser,users}) {
        const [user, setUser] = useState('');
        useEffect(()=>{
            const getUsers = async ()=>{
                const config = {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                  };
                try{
                    const res = await axios.get("/private/admin/users",
                    config);
                    setUser(res.data.users);
                }catch(err){
                    console.log(err);
                }
        
            }
            getUsers();
        },[currentUser,users]);
        
        const handleNewConv = async (e)=> {
            e.preventDefault();
            const message = {
                senderId: localStorage.getItem("id"),
                receiverId: users._id,
                
            };
            try{
                const res = await axios.post("/chat/conversation", message);


            }catch(err){
                console.log(err);
            }
            window.location.reload();
        }
        
return(
    <div>
        <div  onClick={handleNewConv} className="conversation">
            <span className="conversationName">
                {users.username}<br/>
                <small className="conversationName">
                    {users.role}
                </small>
            </span>
        </div>  
    </div>
        );
}