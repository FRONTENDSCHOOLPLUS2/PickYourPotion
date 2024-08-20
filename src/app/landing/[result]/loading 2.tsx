import Soju1bottle from "@/components/icons/Soju1bottle";

function loading() {
  return (
    <div className="result pt-20 flex flex-col justify-center items-center gap-10 px-12 py-8 min-h-screen text-center bg-[#FFFAED]">
      술창고를 열심히 뒤지는 중입니다
      <br />
      잠시만 기다려주세요!
      <Soju1bottle />
    </div>
  );
}

export default loading;
