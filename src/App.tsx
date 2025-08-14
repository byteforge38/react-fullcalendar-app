import "./App.css";
import Calendar from "./components/Calendar";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Calendar />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;
