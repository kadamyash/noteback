import React from 'react' 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app' 
import { Pane, Avatar, Menu, Popover, Position, Dialog} from 'evergreen-ui'
import Signin from './components/signin';
import NoteBack from './components/noteback';
import logo from './logo.svg'
import Signout from './components/signout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faPalette, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

firebase.initializeApp({
  apiKey: "AIzaSyCQ3pkrRqLAG1KQO8aUfPcNIEFOGD_zd24",
  authDomain: "noteback-web.firebaseapp.com",
  projectId: "noteback-web",
  storageBucket: "noteback-web.appspot.com",
  messagingSenderId: "1039153064777",
  appId: "1:1039153064777:web:6522dd88b8bbd7eb4a4898",
  measurementId: "G-8P110LJ7P7"
});
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  const [isShown, setIsShown] = React.useState(false)

  const cookieFont = localStorage.getItem('font');
  const cookieTheme = localStorage.getItem('theme');
  
  const [selectedTheme, setSelectedTheme] = React.useState(cookieTheme?cookieTheme:'light-theme')
  const [selectedFont, setSelectedFont] = React.useState(cookieFont?cookieFont:'font-inter')

  function switchTheme(chosenTheme){
    console.log(chosenTheme);
    localStorage.setItem('theme', chosenTheme);
  }

  function switchFont(chosenFont){
    console.log(chosenFont);
    localStorage.setItem('font', chosenFont);
  }
  
  return (
    <div id="main" className={selectedTheme}>
      {user?
      <Pane display="flex" className="navbar">
        <img src={logo} width={20} style={{marginRight:'15px'}} alt="brand-logo"/>
        <Pane flex={1} className="subtitle">noteback</Pane>
        <button style={{marginRight:15}} className="btn btn-dark btn-sm btn-fx">+create</button>
        {user?
          <Popover
          position={Position.BOTTOM_RIGHT}
          className="font-override"
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item onClick={() => setIsShown(true)}><FontAwesomeIcon icon={faPalette} style={{marginRight:'1em'}}/>Customize UI</Menu.Item>
                <Menu.Item><FontAwesomeIcon icon={faClipboard} style={{marginRight:'1em'}}/>My Notes</Menu.Item>
                <Menu.Item><FontAwesomeIcon icon={faQuestionCircle} style={{marginRight:'1em'}}/>Help</Menu.Item>
              </Menu.Group>
              <Menu.Divider />
              <Menu.Group>
                <Menu.Item intent="danger">
                  <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight:'1em'}}/><Signout auth={auth}/>
                </Menu.Item>
              </Menu.Group>
            </Menu>
          }
        >
          <Avatar className="avatar" name={user.displayName} size={40} />
        </Popover>
        :null}
      </Pane>
      :null}
      <div id="App" className={selectedFont}>
        {user?<NoteBack auth={auth} store={firestore}/>:<Signin auth={auth}/>}
      </div>

      <Dialog
        isShown={isShown}
        title="Customize UI"
        hasFooter={false}
        onCloseComplete={() => setIsShown(false)}
      >
        <Menu>
          <Menu.OptionsGroup
            title="Theme"
            options={[
              { label: 'Light', value: 'light-theme'},
              { label: 'Dark', value: 'dark-theme' },
            ]}
            selected={selectedTheme}
            onChange={(selected) => {switchTheme(selected);setSelectedTheme(selected)}}
          />
          <Menu.Divider />
          <Menu.OptionsGroup
            title="Font"
            options={[
              { label: 'Inter', value: 'font-inter', className: 'font-inter' },
              { label: 'Cursive', value: 'font-kalam', className: 'font-kalam' },
              { label: 'Slab', value: 'font-slab', className: 'font-slab' }
            ]}
            selected={selectedFont}
            onChange={(selected) => {switchFont(selected);setSelectedFont(selected)}}
          />
        </Menu>
      </Dialog>
    </div>
  );
}

export default App;
