import { Bounce, toast } from "react-toastify";
import "./infoToast.css";
import { FiInfo } from "react-icons/fi"; // 예시로 react-icons를 사용

export const infoToast = (str: string) => {
  return toast.info(str, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    className: "info-toast-custom",
    progressClassName: "info-progress",
    icon: <FiInfo color="orange" />, // 아이콘 커스터마이즈
  });
};
