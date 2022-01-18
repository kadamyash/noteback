import React, { useReducer } from 'react'
import firebase from 'firebase/compat/app'
import { Pane, Spinner } from 'evergreen-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

export default function Signin(props) {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    console.log(ignored);
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        props.auth.signInWithPopup(provider);
    }
    setTimeout(
        function() {
            document.getElementById("throbber").style.display="none";
            document.getElementById("throbber-text").style.display="none";
            forceUpdate();
        },
        3000
    );
    return (
        <div className="App">
                <Pane display="flex" alignItems="center" flexDirection="column">
                    <div className="header">Welcome to Noteback</div>
                    <br/>
                    <button className="btn btn-primary" onClick={signInWithGoogle}><FontAwesomeIcon icon={faGoogle} style={{marginRight:'1em'}}/>SIGN IN WITH GOOGLE</button>
                    <Pane id="throbber">
                        <Spinner marginX="auto" marginY={120} />
                    </Pane>
                    <div id="throbber-text" className='almost-muted'>Checking for previous sign-in...</div>
                </Pane>
        </div>
    );
}