import React, { useReducer, useState } from 'react';
import { Dialog, Pane, toaster} from 'evergreen-ui'
import { useHistory } from 'react-router';
import firebase from 'firebase/compat/app' 

export default function AddNote(props) {
    let history = useHistory();
    const firestore = props.store;
    const screenWidth = window.innerWidth;
    const auth = props.auth;
    const {uid, displayName} = auth.currentUser;
    const noteRef = firestore.collection('notes'); 

    const [tags, setTags] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [isShown, setIsShown] = useState(false);
    console.log(ignored);

    const [titleValue, setTitleValue] = useState('');
    const [formValue, setFormValue] = useState('');

    function handleKeyPress(event){
        if(event.charCode === 13){
            event.preventDefault();
            let input = document.getElementById("tags");
            let newTagList = tags;
            newTagList.push(input.value);
            setTags(newTagList);
            input.value = ""
            forceUpdate();
        }
    }

    const sendNote = async(e) => {
        e.preventDefault();
        if(formValue!=='' && titleValue!==''){
            await noteRef.add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: null,
                note: formValue,
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
            toaster.danger('Your note could not be saved. Check if you filled all fields...');
        }
        setFormValue('');
        setTitleValue('');
    }

    return (
        <div id="App" className={props.font} style={{textAlign:'left', width:screenWidth>'800'?'50%':'90%', margin:"auto"}}>
                <Pane display="flex" alignItems="left" flexDirection="column" width="100%">
                    <div className="title">Create a note</div>
                    <br/>
                    <div className='column'>
                        <form onSubmit={sendNote}>
                            <input className="input" style={{"width": screenWidth>'800'?'70%':'90%'}} type="text" placeholder='Title' onChange={(e)=>setTitleValue(e.target.value)}/>
                            <br/>
                            <textarea className="input textarea" type="text" placeholder='Put in your thoughts' onChange={(e)=>setFormValue(e.target.value)}/>
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
                                <button className='btn btn-warning' style={{marginRight:'10px'}} onClick={() => setIsShown(true)}>Discard</button>
                                <button className='btn btn-success' style={{marginRight:'10px'}} type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </Pane>
                <Dialog
                    isShown={isShown}
                    title="Discard Progress?"
                    onCloseComplete={() => {setIsShown(false)}}
                    onConfirm={()=> history.push("/")}
                    confirmLabel="Discard my progress"
                    intent="danger"
                >
                    Your current typed in data will be lost. Are you sure you want to continue?   
                </Dialog>
        </div>
    );
}