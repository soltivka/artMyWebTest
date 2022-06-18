import logo from './logo.svg';
import './App.css';
import Root from "./Root";
import AppContainer from "./AppContainer";
import {AlertContextProvider} from "./Components/Alert/Alert";

function App() {
  return (
    <div className="App">
        <AlertContextProvider>
            <AppContainer>
                <Root>

                </Root>
            </AppContainer>
        </AlertContextProvider>
    </div>
  );
}

export default App;
