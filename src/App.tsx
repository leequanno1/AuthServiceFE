import { ToastContainer, Zoom } from "react-toastify";
import "./App.css";
import AppRoute from "./AppRoute";

function App() {
  return (
    <div className="App">
      <AppRoute />
      {/* Toast config */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        limit={3}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </div>
  );
}

export default App;
