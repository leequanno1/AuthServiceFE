import React from 'react';
import logo from './logo.svg';
import './App.css';
import InputText from './components/InputText/InputText';
import { ArrowClockwise, MagnifyingGlass } from 'phosphor-react';
import PoolAccessLabel from './components/PoolAccessLable/PoolAccessLable';
import CountDownButton from './components/CountDownButton/CountDownButton';
import NameTag from './components/NameTag/NameTag';
import LoginForm from './compine-components/LoginForm/LoginForm';
import SignUpForm from './compine-components/SignUpForm/SignUpForm';

function App() {
  const [text, setText] = React.useState('');

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <InputText lable='Nigani' placeholder='Niagnas' value={text} onChange={setText} Icon={MagnifyingGlass} />
        <PoolAccessLabel accessLevel="edit" />
        <PoolAccessLabel accessLevel="view" />
        <NameTag name={"NIGA"} />
        <CountDownButton Icon={ArrowClockwise} timeLeft={10} label={"niga"} onClick={() => {}}/> */}
        {/* <LoginForm /> */}
        {/* <SignUpForm /> */}
      </header>
    </div>
  );
}

export default App;
