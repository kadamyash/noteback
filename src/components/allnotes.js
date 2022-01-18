import React, { useState } from 'react';
import { Avatar, Dialog } from 'evergreen-ui'
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';

export default function AllNotes(props) {
    const firestore = props.store;
    const noteRef = firestore.collection('notes'); 
    const auth = props.auth;
    
    const {uid} = auth.currentUser;
    const notesQ = noteRef.where("writer_id", "==", uid);
    // const sharedNotesQ = noteRef.where("shared_ids", "array-contains", uid);
    const [notes] = useCollectionData(notesQ, {idField: 'id'});
    // const [sharedNotes] = useCollectionData(sharedNotesQ, {idField: 'id'});

    return (
        <div id="App" className={props.font}>
                <div style={{textAlign:'left', width:'70%'}}>
                    <div className="title">All Notes</div>
                    <br/>
                    <div className="grid">
                        {notes && notes.map(note => <Note key={note.id} text={note}/>)}
                    </div>
                </div>
        </div>
    );

    function Note(props){
        const [isShown, setIsShown] = useState(false);
        function toDate(sec){
            var date = new Date(sec*1000);
            return date.toString().replace(/GMT.*$/i, "");   
        }

        const deleteNote = async(e) =>{
            
            await firestore.collection('notes').doc(props.text.id).delete();
        }
        return(
                <div className="card">
                    <span className="caption cardelement"> <Link className="hyperlink" to={"/note/"+props.text.id}>{props.text.title}</Link></span>
                    <span className="text-smaller cardelement">{toDate(props.text.createdAt.seconds)}</span>
                    <span className="array cardelement">{props.text.shared_entities && props.text.shared_entities.map(userEntity => <SharedUser key={userEntity.id} name={userEntity.name}/>)}</span>
                    <span className="array cardelement">
                        <FontAwesomeIcon className='ops' icon={faTrashAlt} style={{margin:'10px 20px 10px 0'}} onClick={()=>setIsShown(true)}/>
                        <FontAwesomeIcon className='ops' icon={faPen} style={{margin:'10px 20px 10px 0'}}/>
                    </span>
                    <Dialog
                        isShown={isShown}
                        title="Delete Note?"
                        onCloseComplete={() => {setIsShown(false)}}
                        onConfirm={()=> deleteNote()}
                        confirmLabel="Delete"
                        intent="danger"
                    >
                        Are you sure you want to delete this note "{props.text.tiltle}"?   
                    </Dialog>
                </div>
        );
    }

    function SharedUser(props){
        return(
            <Avatar className="arrayelement" name={props.name} size={20}></Avatar>
        );
    }
}