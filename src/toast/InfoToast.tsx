import { Bounce, toast } from "react-toastify";
import "./infoToast.css";
import { FiInfo } from "react-icons/fi"; // 예시로 react-icons를 사용

const TOAST_ID = "info-toast"; // 고유한 토스트 ID를 생성

export const InfoToast = (str: string) => {
  // 이미 동일한 ID의 토스트가 활성화되어 있는지 확인
  if (!toast.isActive(TOAST_ID)) {
    return toast.info(str, {
      toastId: TOAST_ID, // 고유 ID를 설정
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
  }
};
