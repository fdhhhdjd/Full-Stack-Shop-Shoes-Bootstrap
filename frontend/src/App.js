import "./App.css";
import logo from "./logo.svg";
import { API_ADMIN } from "./v1/admin_ui/contexts/GlobalStateAdmin";
import CONFIGS from "./v1/configs/config";
import { API_USER } from "./v1/user_ui/contexts/GlobalStateUser";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1>{API_USER}</h1>
          <h1>{API_ADMIN}</h1>
        </a>
      </header>
    </div>
  );
}

export default App;
