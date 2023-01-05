import React, { useState } from 'react' 
import { Avatar, Dialog } from 'evergreen-ui' 
import { Link } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import 'firebase/firestore';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NoteBack(props){
    const firestore = props.store;
    const noteRef = firestore.collection('notes'); 
    const auth = props.auth;
    const {uid} = auth.currentUser;
    const notesQ = noteRef.where("writer_id", "==", uid).limit(4);
    // const sharedNotesQ = noteRef.where("shared_ids", "array-contains", uid);
    const [notes] = useCollectionData(notesQ, {idField: 'id'});
    // const [sharedNotes] = useCollectionData(sharedNotesQ, {idField: 'id'});
    
    return(
            <div className="App" style={{textAlign:'left', width:'100%'}}>
                <span className="title">Recent Notes</span>
                <div className="grid" style={{width: '70%'}}>
                    {notes && notes.sort((a,b) => (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0)).map(note => <Note key={note.id} text={note}/>)}
                </div>
                <Link to="/my-notes" className="hyperlink"><button className="btn caption fullwidth-cta">view all notes</button></Link>
                <br/><br/>
                {/* <span className="title">Quick Access</span>
                <br/><br/>
                <div className="grid-4">
                    <div className="tool-card bg-dark">
                        TOOL 1
                    </div>
                    <div className="tool-card bg-dark">
                        TOOL 2
                    </div>
                    <div className="tool-card bg-dark">
                        TOOL 3
                    </div>
                    <div className="tool-card bg-dark">
                        TOOL 4
                    </div>
                </div> */}
            </div>
    );

    function Note(props){
        // return(
            // <Link className="hyperlink" to={"/note/"+props.text.id}>
            //     <div className="card">
            //         <span className="caption cardelement">{props.text.title}</span>
            //         <span className="text-smaller cardelement">{props.text.createdAt}</span>
            //         <span className="array cardelement">{props.text.shared_ids && props.text.shared_ids.map(userEntity => <SharedUser key={userEntity.id} name={userEntity.name}/>)}</span>
            //     </div>
            // </Link>
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
                        <Link className="hyperlink" to={"/edit/"+props.text.id}><FontAwesomeIcon className='ops' icon={faPen} style={{margin:'10px 20px 10px 0'}}/></Link>
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
