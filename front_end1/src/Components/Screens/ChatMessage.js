import React from 'react';
import "./ChatMessage.css";
import {format} from "timeago.js";
import{useState, useEffect} from 'react';

import axios from "axios";


export default function ChatMessage({message, own}){
    const [user, setUser] = useState('');
    useEffect(()=>{

        const getUser = async ()=>{
            try{
                
                    const res = await axios.get("/chat/users?userId="+message.sender);
                    setUser(res.data);
            }catch(err){
                console.log(err);
            }
        }
       getUser();
    },[message]);
    return(
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <span className="messageName">
                {user.username}
                </span>
                <p className="messageText">
                {message.text}
                </p>
            </div>
            <div className="messageBottom">
            {format(message.createdAt)}
            </div>
        </div>

    )
}