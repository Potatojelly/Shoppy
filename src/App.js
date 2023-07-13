import './App.css';
import {Outlet} from "react-router-dom";
import Header from './components/Header/Header';
import { AuthContextProvider } from './components/contexts/AuthContext';


function App() {
  return (
    <AuthContextProvider>
      <Header/>
      <Outlet/>
    </AuthContextProvider>
  );
}

export default App;
