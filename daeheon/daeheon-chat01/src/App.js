import logo from './logo.svg';
import './App.css';
import MyBody from "./fragment/MyBody";
import MyHeader from "./fragment/MyHeader";
import MyFooter from "./fragment/MyFooter";

function App() {
  return (
    <div className="App">

        <MyHeader/>
      <MyBody/>

      <MyFooter/>
    </div>
  );
}

export default App;
