import React from 'react'
import firebase from 'firebase/compat/app'
import { Pane } from 'evergreen-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

export default function Signin(props) {
    const signInWithGoogle = () => {
        console.log(props);
        const provider = new firebase.auth.GoogleAuthProvider();
        props.auth.signInWithPopup(provider);
    }
    return (
        <div className="App">
                <Pane display="flex" alignItems="center" flexDirection="column">
                    <div className="header">Welcome to Noteback</div>
                    <br/>
                    <button className="btn btn-primary" onClick={signInWithGoogle}><FontAwesomeIcon icon={faGoogle} style={{marginRight:'1em'}}/>SIGN IN WITH GOOGLE</button>
                </Pane>
        </div>
    );
}