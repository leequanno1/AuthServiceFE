import "./App.css";
import AppRoute from "./AppRoute";

function App() {
  // const [text, setText] = React.useState("");

  return (
    <div className="App">
      <AppRoute/>
      {/* <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <InputText
          lable="Nigani"
          placeholder="Niagnas"
          value={text}
          onChange={setText}
          Icon={MagnifyingGlass}
        />
        <PoolAccessLabel accessLevel="edit" />
        <PoolAccessLabel accessLevel="view" />
        <NameTag name={"NIGA"} />
        <CountDownButton
          Icon={ArrowClockwise}
          timeLeft={10}
          label={"niga"}
          onClick={() => {}}
        />
        <LoginForm />
        <SignUpForm />
        <ForgotPasswordForm />
        <UserTable />
        <UserPoolTable />
      </header> */}
    </div>
  );
}

export default App;
