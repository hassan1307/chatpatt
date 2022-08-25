import { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import Signup from './SignUp';
import './App.css';
import Chat from './Chat';

function App() {
  // states to maintain user,usernname,email,password
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  // authenticating the user
  //setting up the useEffect to avoid re-redering
  useEffect(() => {
    const cleanUp = auth.onAuthStateChanged((user) => {
      // if there is a user, set the user to the current user
      if (user) {
        console.log(user.displayName);
        setUser(user);
        setUsername(user.displayName);
      } else {
        // if there isn't a user or the user logged out,set the user to null 
        console.log("user logged out")
        setUser(null);
        setUsername(null);

      }
    })
    //cleanup function
    return () => {
      cleanUp();
    }  
  }, [])
      console.log(auth.currentUser);

  return (
    <div className="App">
      {/* if there is a user, show chat screen,else show login screen */}
      {user ? <Chat
        username={username}
      /> : <Signup
        username = {username}
        email = {email}
        password= {password}
        setUsername= {setUsername}
        setEmail= {setEmail}
        setPassword = {setPassword}
      />}
      {/* <Chat 
        username = {username}
      /> */}
      
    </div>
  );
}

export default App;
