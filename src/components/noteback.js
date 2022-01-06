import React from 'react' 
import { Avatar } from 'evergreen-ui' 
import sampleNotes from './temp_data/sample_notes.json'
import { Link } from 'react-router-dom';

export default function NoteBack(props){
//     const [isShown, setIsShown] = React.useState(true)
    return(
            <div style={{textAlign:'left', width:'70%'}}>
                <span className="title">Recent Notes</span>
                <div className="grid">
                    {sampleNotes && sampleNotes.map(note => <Note key={note.id} text={note}/>)}
                </div>
                <button className="btn caption fullwidth-cta">view all notes</button>
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
        return(
            <Link className="hyperlink" to={"/note/"+props.text.id}>
                <div className="card">
                    <span className="caption cardelement">{props.text.title}</span>
                    <span className="text-smaller cardelement">{props.text.createdAt}</span>
                    <span className="array cardelement">{props.text.shared_ids && props.text.shared_ids.map(userEntity => <SharedUser key={userEntity.id} name={userEntity.name}/>)}</span>
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
