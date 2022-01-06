import React from 'react'

export default function Signout(props){
    return props.auth.currentUser && (
        <span onClick={()=>props.auth.signOut() }>Signout</span>
    );
}