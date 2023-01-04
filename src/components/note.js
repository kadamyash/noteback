import { Avatar } from 'evergreen-ui';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { deSalt } from './salt/deSalt';

export default function NoteBody(props) {
    let history = useHistory();

    function handleURLNotFound() {
        history.push("/help");
    }

    function toDate(sec){
        var date = new Date(sec*1000);
        return date.toString().replace(/GMT.*$/i, "");   
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
    const firestore = props.store;
    const noteRef = firestore.collection('notes').doc(searchParam);
    const [note, setNote] = useState(null);

    useEffect(() => {
        async function fetchNote(){
            try{
            const doc = await noteRef.get();
            setNote(doc);
            }
            catch(error){
                alert("Something went wrong");
                history.push("/");
            }
        }
        fetchNote();
    },[]);


    return (
        <div id="App" className={props.font}>
                {/* <Pane display="flex" alignItems="center" flexDirection="column" padding="10%">
                    <div className="header"></div>
                    <br/>
                    <div className="subtitle">Need some help? This platform is still
                     in the making, use the beta version <a className='link' rel="noreferrer" 
                     href="https://noteback-beta.vercel.app" target="_blank">here</a></div>
                    <br/>
                    <div className='caption'>The content of this sample note is not real,
                     please wait untill the protoype is fully developed
                      into a working application.</div>
                </Pane> */}

                <div className='note-viewer'>
                    <div className='title'>{note?note.data().title:<ContentPreLoad/>}</div>
                    <ul className='tags'>
                        {note?note.data().tags.map(tag => <li className='tag tag-small non-removable'>{tag}</li>):<ContentPreLoad/>}
                    </ul>
                    <div className='text'>{note?deSalt(note.data().note, parseInt(note.data().writer_id.match(/[0-9]/))):<ContentPreLoad/>}</div>
                    <br/>
                    <div className='credits'>
                        <Avatar className="avatar" name={note?note.data().writer_name:"..."} size={40} />
                        <div className='almost-muted'>{note?toDate(note.data().createdAt.seconds):null}</div>
                    </div>
                </div>
        </div>
    );

    function ContentPreLoad(){
        return(
            <div class="preloader"></div>
        );
    }
}