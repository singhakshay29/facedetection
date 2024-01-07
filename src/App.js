import "./App.css";
//import Home from "./component/Home";
import NavBar from "./component/NavBar";
import VideoPlayer from "./component/VideoPlayer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <VideoPlayer />
      {/* <Home /> */}
    </div>
  );
}

export default App;
