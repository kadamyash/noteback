import React from 'react';
import { Pane} from 'evergreen-ui'
import { useHistory } from 'react-router';
import sampleNotes from './temp_data/sample_notes.json'

export default function NoteBody(props) {
    let history = useHistory();

    function handleURLNotFound() {
        history.push("/help");
    }
    var url = window.location.href;
    const pattern = url.match(/note\/(.*)/);
    let searchParam = null;
    if(pattern!==null){
        searchParam = pattern[1]
    }
    else{
        handleURLNotFound();
        alert("incorrect url");
    }
   
    console.log(searchParam);

    return (
        <div id="App" className={props.font}>
                <Pane display="flex" alignItems="center" flexDirection="column">
                    <div className="header">Note</div>
                    <br/>
                    <div className="subtitle">Need some help? This platform is still in the making, use the beta version <a className='link' rel="noreferrer" href="https://noteback-beta.vercel.app" target="_blank">here</a></div>
                    <br/>
                    <div className='caption'>The content of this sample note is not real, please wait untill the protoype is fully developed into a working application.</div>
                </Pane>
        </div>
    );
}