import './App.css';
import {Outlet} from "react-router-dom";
import Header from './components/Header/Header';
import { AuthContextProvider } from '../src/contexts/AuthContext';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";


const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
          <Header/>
          <Outlet/>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
