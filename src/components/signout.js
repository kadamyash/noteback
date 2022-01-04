import React from 'react'

export default function Signout(props){
    console.log(props.currentUser)
    return props.auth.currentUser && (
        <span onClick={()=>props.auth.signOut() }>Signout</span>
    );
}