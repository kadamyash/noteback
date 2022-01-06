import React from 'react';
import { Pane} from 'evergreen-ui'

export default function Help(props) {
   
    return (
        <div id="App">
                <Pane display="flex" alignItems="center" flexDirection="column">
                    <div className="header">Help</div>
                    <br/>
                    <div className="subtitle">Need some help? This platform is still in the making, use the beta version <a className='link' rel="noreferrer" href="https://noteback-beta.vercel.app" target="_blank">here</a></div>
                    <br/>
                    <div className='caption'>Want to contact the developers/mods for some reason? Click <a className='link' rel="noreferrer" href="https://forms.gle/jHZUaks7JWgg5TKKA" target="_blank">here</a> to submit a query</div>
                </Pane>
        </div>
    );
}