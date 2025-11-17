import { toast, Zoom } from "react-toastify";

export const toastService = {

  toast: (content: string) => {
    return toast(content, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Zoom,
    });
  },

  error: (error: string) => {
    return toast.error(error, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Zoom,
    });
  },
  
};
