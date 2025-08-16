import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button/Button';
import InputText from './components/InputText/InputText';
import { ArrowCircleDown, ArrowClockwise, MagnifyingGlass } from 'phosphor-react';
import PoolAccessLabel from './components/PoolAccessLable/PoolAccessLable';
import CountDownButton from './components/CountDownButton/CountDownButton';

function App() {
  const [text, setText] = React.useState('');
  const [timeLeft, setTimeLeft] = React.useState(10);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <InputText lable='Nigani' placeholder='Niagnas' value={text} onChange={setText} Icon={MagnifyingGlass} />
        <PoolAccessLabel accessLevel="edit" />
        <PoolAccessLabel accessLevel="view" />
        <CountDownButton Icon={ArrowClockwise} timeLeft={timeLeft} timeTotal={10} onClick={async ()=> {
          while (timeLeft > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setTimeLeft(timeLeft => timeLeft - 1);
          }
          setTimeLeft(10);
        }}/>
      </header>
    </div>
  );
}

export default App;
