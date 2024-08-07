export default function Page() {
  return (
    <div className="max-w-[428px] mt-28 ml-10">
      <div className="font-light leading-6 text-black">
        <p className="font-medium text-[36px] text-primary">삐빅!!</p>
        <p className="mt-2">너무 동안이세요!!</p>
        <p>실례지만 민증검사 하겠습니다!!</p>
      </div>
      <div className="flex flex-col">
        <button>카카오톡 계정으로 로그인</button>
        <button>구글 계정으로 로그인</button>
      </div>
    </div>
  );
}
