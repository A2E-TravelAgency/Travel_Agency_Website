import "./ChatConversations.css";
import{useState, useEffect} from 'react';
import axios from "axios";
import React from 'react';

export default function ChatConversations ({conversation, currentUser}) {
        const [user, setUser] = useState('');
        useEffect(()=>{
            const personId = conversation.members.find((m)=>m !== currentUser);

            const getUser = async ()=>{
                try{
                    
                        const res = await axios.get("/chat/users?userId="+personId);
                        setUser(res.data);
                }catch(err){
                    console.log(err);
                }
            }
           getUser();
        },[currentUser, conversation]);
return(
    <div>
        <div className="conversation">
            <span className="conversationName">
             {user.username}
            </span>
        </div>  
    </div>
        );
}