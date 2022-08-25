import React, { useEffect, useState,useRef } from 'react'
import SignOut from './SignOut'
import "./chat.css"
import { auth, db } from './firebase';
import { FiSend } from "react-icons/fi";
import firebase from 'firebase/compat/app';

const Chat = ({username}) => {
    const scroll = useRef();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
     // fetch data from database
    useEffect(() => {
        const cleanup = db.collection("messages").orderBy("createdAt").limit(50).onSnapshot((snapshot) => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
        setFetchLoading(false);
        return () => {
            cleanup();
        }
    }, [])
    // post data to the database
    async function postData(e)  {
        e.preventDefault()
        const { uid, photoURL, displayName } = auth.currentUser
        console.log(uid===auth.currentUser.uid);

        if (message) {
            await db.collection("messages").add({
                text: message,
                photoURL,
                uid,
                displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })

        } else {
            alert("Sorry can't send empty messages!")
        }
        setMessage("")
        setLoading(false);
        scroll.current.scrollIntoView({behavior:"smooth"})
    }

    return (
        <>
            <main>
                <section className="chat-screen">
                    {fetchLoading?"Loading":messages.map(({id,text,photoURL,uid,displayName}) => (
                        <div className={`${uid===auth.currentUser.uid ?  "current-user":"message-panel"}`} key={id}>
                            <div className="img-text">
                                <div className="img">
                                    <img src={photoURL} alt="" />
                                </div>
                            
                            <div className="message">
                                <div className="text">
                                    <p>{text}</p>
                                </div>
                            </div>
                            </div>
                            <p style={{
                                color: "gray",
                                fontSize:"0.5rem"
                            }}>{displayName}</p>
                        </div>
                    ))}
                    <div ref={scroll}></div>
                </section>
                <form action="">
                    <input style={{
                        border: "0",
                        background:"none",
                        color:"white"
                    }} type="text"
                        placeholder={loading?"sending...":"Send a message..."}
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                    />
                    <button onClick={postData} style={{
                        background:"none",
                        border: "none",

                    }}>{loading ? "sending" : <FiSend style={{
                            color: "white",
                    }}/>}</button>
                </form>
                <SignOut />

        </main>
        </>
        
)
    }


export default Chat
