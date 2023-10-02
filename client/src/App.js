import "./App.css";
import Router from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/authContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router />
        <ToastContainer />
      </AuthContextProvider>
    </>
  );
}

export default App;
