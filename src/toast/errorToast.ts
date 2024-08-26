import { Slide, toast } from "react-toastify";

export const errorToast = (str: string) => {
  return toast.error(str, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  });
};
