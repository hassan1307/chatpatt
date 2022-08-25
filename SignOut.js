import React from 'react'
import { auth } from './firebase'

const SignOut = () => {
return(
    <>
        <button style={{
            color: "white",
            background:"#0D7ABE",
            padding: "0.4rem",
            border: "none",
            cursor:"pointer"
        }} onClick={()=>auth.signOut()}>Logout</button>
    </>
)
}

export default SignOut
