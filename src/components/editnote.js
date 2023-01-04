import React, { useEffect, useReducer, useState } from 'react';
import { Dialog, Pane, toaster} from 'evergreen-ui'
import { useHistory } from 'react-router';
import firebase from 'firebase/compat/app';
import {addSalt} from './salt/addSalt.js';
import { deSalt } from './salt/deSalt.js';

export default function EditNote(props) {
    let history = useHistory();
    const firestore = props.store;
    const auth = props.auth;
    const {uid, displayName} = auth.currentUser;
    var url = window.location.href;
    const pattern = url.match(/edit\/(.*)/);
    let searchParam = null;
    if(pattern!==null){
        searchParam = pattern[1]
    }
    else{
        history.push("/");
        alert("incorrect url");
    }
    const noteDoc = firestore.collection('notes').doc(searchParam);
    const [note, setNote] = useState(null);

    useEffect(() => {
        async function fetchNote(){
            try{
                const doc = await noteDoc.get();
                setNote(doc);
                setTags(doc.data().tags);
            }
            catch(error){
                alert("Something went wrong");
                history.push("/");
            }
        }
        fetchNote();
    },[]);
    const screenWidth = window.innerWidth;
    const noteRef = firestore.collection('notes'); 

    const [tags, setTags] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [isShown, setIsShown] = useState(false);

    const [titleValue, setTitleValue] = useState(note?note.data().title:null);
    const [formValue, setFormValue] = useState(note?note.data().note:null);

    function handleKeyPress(event){
        if(event.charCode === 13){
            event.preventDefault();
            let input = document.getElementById("tags");
            let newTagList = tags;
            newTagList.push(input.value);
            setTags(newTagList);
            input.value = "";
            forceUpdate();
        }
    }

    const updateNote = async(e) => {
        e.preventDefault();
        if(formValue!=='' && titleValue!==''){
            await noteDoc.set({
                createdAt: note?note.data().createdAt:null,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                note: addSalt(formValue, parseInt(uid.match(/[0-9]/))),
                title: titleValue,
                markedBy: [],
                tags: tags,
                writer_id: uid,
                writer_name: displayName
            });
            toaster.success('Your note was saved!');
            history.push("/my-notes")
        }
        else{
            toaster.danger('Your note could not be saved. Try again in some time...');
        }
        setFormValue('');
        setTitleValue('');
    }

    return (
        <div id="App" className={props.font} style={{textAlign:'left', height:'100vh', width:screenWidth>'800'?'50%':'90%', margin:"auto"}}>
                <Pane display="flex" alignItems="left" flexDirection="column" width="100%">
                    <div className="title">Edit Note</div>
                    <br/>
                    <div className='column'>
                        <form onSubmit={updateNote} style={{'gap':'4px'}}>
                            <input className="input" style={{"width": screenWidth>'800'?'70%':'90%'}} type="text" placeholder='Title' onChange={(e)=>setTitleValue(e.target.value)} value={titleValue?titleValue:note?note.data().title:titleValue}/>
                            <br/>
                            <textarea className="input textarea" type="text" placeholder='Put in your thoughts' onChange={(e)=>setFormValue(e.target.value)} value={formValue?formValue:note?deSalt(note.data().note, parseInt(note.data().writer_id.match(/[0-9]/))):null}/>
                            <br/>
                            <div className='overflow'>{tags && tags.map(tag => <div className='tag' key={tags.indexOf(tag)} onClick={()=>{
                                let updatedList = tags;
                                updatedList.splice(updatedList.indexOf(tag),1);
                                setTags(updatedList);
                                forceUpdate();
                                }}>{tag}</div>)}</div>
                            <br/>
                            <input id="tags" className="input" style={{"width": screenWidth>'800'?'70%':'90%'}} type="text" placeholder='Add Tags' onKeyPress={(event)=>handleKeyPress(event)}/>
                            <br/><br/><br/>
                            <div className="array">
                                <button className='btn btn-warning' style={{marginRight:'10px'}} onClick={() => setIsShown(true)} type="button">Cancel</button>
                                <button className='btn btn-success' style={{marginRight:'10px'}} type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </Pane>
                <Dialog
                    isShown={isShown}
                    title="Discard Changes?"
                    onCloseComplete={() => {setIsShown(false)}}
                    onConfirm={()=> history.push("/")}
                    confirmLabel="Discard updates"
                    intent="danger"
                >
                    Any updates you made NOW will be lost. Are you sure you want to continue?   
                </Dialog>
        </div>
    );
}