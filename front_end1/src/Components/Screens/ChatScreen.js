import React from 'react';
import "./chat.css";
import ChatConversations from "./ChatConversations";
import ChatNewConv from "./ChatNewConv";
import {io} from "socket.io-client";
import ChatMessage from "./ChatMessage.js";
import{useState, useEffect, useRef} from 'react';
import axios from "axios";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";



export default function ChatScreen () {
        const[conversations, setConversations] = useState([]);
        const[currentChat, setCurrentChat] = useState(null);
        const[messages, setMessages] = useState([]);
        const[ArrivalMessage, setArrivalMessage] = useState(null);
        const[Users, setUsers] = useState("");
        const[newMessage, setNewMessage] = useState("");
        const scrollRef = useRef();
        const socket = useRef();


        useEffect(()=>{
            socket.current = io("ws://localhost:8900");
            socket.current.on("getMessage", data =>{
                setArrivalMessage({
                    sender: data.senderId,
                    text: data.text,
                    createdAt: Date.now(),
                })
            })
        },[]);

        useEffect(()=>{
           ArrivalMessage && currentChat?.members.includes(ArrivalMessage.sender) && 
           setMessages((prev)=>[...prev, ArrivalMessage]);
        },[ArrivalMessage, currentChat]);


        useEffect(()=>{
            socket.current.emit("addUser", localStorage.getItem("id"));
            socket.current.on("getUsers",(users)=>{console.log(users)})
        },[]);

        useEffect(()=>{
            console.log(new Date(Date.now()))
            const getConversations = async ()=>{
                try{
                    const res = await axios.get("/chat/conversation/"+localStorage.getItem("id"));
                    setConversations(res.data);
                }catch(err){
                    console.log(err);
                }
               
            }
            getConversations();
        },[localStorage.getItem("id")]);

        useEffect(()=>{
            const getMessages = async ()=>{
                try{
                    const res = await axios.get("/messages/message/"+currentChat._id);
                    setMessages(res.data);
                }catch(err){
                    console.log(err);
                }
        
            }
            getMessages();
        },[currentChat]);
        
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
                    setUsers(res.data.users);
                }catch(err){
                    console.log(err);
                }
        
            }
            getUsers();
        },[]);

        useEffect(()=>{
            
           scrollRef.current?.scrollIntoView({behavior:"smooth",block: "nearest",inline: "start"});
        },[messages]);


        const handleSubmit = async (e)=> {
            e.preventDefault();
 
            const message = {
                sender: localStorage.getItem("id"),
                text: newMessage,
                conversationId: currentChat._id,
                createdAt:new Date(Date.now()),
            };

            const receiverId = currentChat.members.find(member=> member !== localStorage.getItem("id"));

              socket.current.emit("sendMessage",{
                  senderId: localStorage.getItem("id"),
                  receiverId: receiverId,
                  text : newMessage,
              })
            try{
                const res = await axios.post("/messages/message", message);
                setMessages([...messages, res.data]);
                setNewMessage("");

            }catch(err){
                console.log(err);
            }
        }
        const getMessages = async ()=>{
            try{
                const res = await axios.get("/messages/message/"+currentChat._id);
                setMessages(res.data);
            }catch(err){
                console.log(err);
            }
    
        }
        const setChat = async (c)=>{
            setCurrentChat(c);
            try{
                const res = await axios.get("/messages/message/"+c._id);
                setMessages(res.data);
            }catch(err){
                console.log(err);
            }
    
        }


return(
    <div>
    <NavbarAdmin/> 
      <main>
        <div className="chat">
        <div className="chatMenu">
                <div className="chatMenuWrapper">
                <p className="ChatMenuInput">Existing conversations</p>
                {conversations.map((c)=>(
                    <div onClick={()=>setChat(c)}>
                        <ChatConversations conversation={c} currentUser={localStorage.getItem("id")}/>
                    </div> 
                ))}
                
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                     {
                         currentChat ? (
                            <div>
                            <div className="chatBoxTop">
                                {messages.map((m)=>(
                                    <div ref={scrollRef}>
                                        <ChatMessage message={m} own={m.sender === localStorage.getItem("id")}/> 
                                    </div>
                                    
                                ))}
                                
                            </div>
                            <div className="chatBoxBottom">
                            <textarea className="chatMessageInput" 
                                placeholder="write something" 
                                onChange={(e)=>setNewMessage(e.target.value)}
                                value={newMessage}/> 

                            <button type='submit' className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                            </div> 
                            </div>
                    ) : <span className="noConversationText">Open a conversation to start a chat</span>}
                </div>
            </div>
            <div className="chatMenu1">
                <div className="chatMenuWrapper">
                <p className="ChatMenuInput">Make a new conversation</p>
                {Users && Users.map((u)=>(
                    <div >
                        <ChatNewConv   users={u} currentUser={localStorage.getItem("id")}/>
                    </div> 
                ))}
                
                </div>
            </div>
        </div>
        <Footer/> 
        </main>
    </div>
        );
}