import React from 'react';
import { Avatar } from 'evergreen-ui'
import { useHistory } from 'react-router'
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Link } from 'react-router-dom';

export default function AllNotes(props) {
    const firestore = props.store;
    const noteRef = firestore.collection('notes'); 
    const auth = props.auth;
    
    const {uid} = auth.currentUser;
    console.log(uid);
    const notesQ = noteRef.where("writer_id", "==", uid);
    const sharedNotesQ = noteRef.where("shared_ids", "array-contains", uid);
    const [notes] = useCollectionData(notesQ, {idField: 'id'});
    const [sharedNotes] = useCollectionData(sharedNotesQ, {idField: 'id'});
    console.log(notes, sharedNotes);

    return (
        <div id="App" className={props.font}>
                <div style={{textAlign:'left', width:'70%'}}>
                    <div className="header">All Notes</div>
                    <br/>
                    <div className="grid">
                        {notes && notes.map(note => <Note key={note.id} text={note}/>)}
                    </div>
                </div>
        </div>
    );

    function Note(props){
        return(
            <Link className="hyperlink" to={"/note/"+props.text.id}>
                <div className="card">
                    <span className="caption cardelement">{props.text.title}</span>
                    {/* <span className="text-smaller cardelement">{props.text.createdAt}</span> */}
                    <span className="array cardelement">{props.text.shared_entities && props.text.shared_entities.map(userEntity => <SharedUser key={userEntity.id} name={userEntity.name}/>)}</span>
                </div>
            </Link>
        );
    }

    function SharedUser(props){
        return(
            <Avatar className="arrayelement" name={props.name} size={20}></Avatar>
        );
    }
}