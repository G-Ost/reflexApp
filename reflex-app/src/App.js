import './App.css';
import Frame from "./Containers/Frame"
import { PassStyles } from "./Contexts/SyleContext"

function App() {
  return (
    <div className="App">
      <PassStyles>
        <Frame></Frame>
      </PassStyles>
    </div>
  );
}

export default App;
