import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {


    const goAPI = async () => {
        await axios.get('/api/trigger')
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <button onClick={goAPI}>Trigger</button>

            </header>
        </div>
    );
}

export default App;
