"use client";

import Button from "@/components/Button";
import { certificationCallback, getUserInfo } from "./action";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LinkButton } from "@/components/LinkButton";
import { ExtendedIamport } from "@/types/iamportExtends";

const V1_IMP_KEY = process.env.NEXT_PUBLIC_API_V1_IMP_KEY;

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

function Adult({ searchParams }: SearchParamProps) {
  // url의 request값을 받아와 변수에 저장
  const request = searchParams?.request;
  const confirmSuccess = searchParams?.confirmSuccess;
  const confirmFailed = searchParams?.confirmFailed;

  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const checkLoggedIn = async () => {
    // 로그인 유무 확인
    if (status === "authenticated") {
      // 회원 정보 불러와서 성인인증 유무 확인
      const userInfo = await getUserInfo(userId!);
      if (userInfo.item.extra.isAdult) {
        // 로그인이 되어있고 성인인증도 돼있을 때
        router.push("/pay");
      } else {
        // 로그인은 되어있지만 성인인증이 되지 않았을 때
        // url의 request값이 true면 모달 띄우기(stateless modal)
        router.push("/adult?request=true");
      }
    } else {
      // 로그인이 안 돼있을 때
      alert("로그인 후 이용하실 수 있습니다.");
      router.push("/login");
    }
  };

  // 본인인증 창 호출 함수
  const onCertification = () => {
    if (!session) return;
    if (!window.IMP) return;

    // 가맹점 식별하기
    const IMP = window.IMP as unknown as ExtendedIamport;
    IMP.init(V1_IMP_KEY);

    // 본인인증 데이터
    IMP.certification(
      {
        // m_redirect_url: "/" + pathname,
        popup: true,
        pg: "inicis_unified",
      },
      certificationCallback,
    );
  };

  return (
    <>
      <h1>성인인증 테스트 페이지</h1>
      <Button onClick={checkLoggedIn}>구매하기</Button>
      <Button onClick={onCertification}>성인인증하기</Button>
      {request && (
        <div
          className={`fixed w-screen h-screen flex justify-center items-center ${request ? "opacity-100" : "opacity-0"} bg-black bg-opacity-50`}
          // onClick={() => router.back()}
        >
          <div className="flex flex-col justify-center items-center w-4/5 px-5 py-8 rounded-2xl bg-white text-center text-black">
            <p className="text-primary font-bold">잠시만요!</p>
            구매 전 최초 1회
            <br />
            성인인증이 필요해요.
            <div className="flex justify-center align-top mt-3 gap-2 w-full">
              <Button
                onClick={() => {
                  router.back();
                  onCertification();
                }}
                className="grow"
              >
                인증하기
              </Button>
              <Button onClick={() => router.back()} className="grow" color="disabled">
                취소
              </Button>
            </div>
          </div>
        </div>
      )}
      {confirmSuccess && (
        <div
          className={`fixed w-screen h-screen flex justify-center items-center ${confirmSuccess ? "opacity-100" : "opacity-0"} bg-black bg-opacity-50`}
        >
          <div className="flex flex-col justify-center items-center w-4/5 px-5 py-8 rounded-2xl bg-white text-center text-black">
            성인인증이 완료되었습니다
            <br />
            상품을 구매해주세요.
            <Button onClick={() => router.back()} className="w-full mt-3">
              구매하러 가기
            </Button>
          </div>
        </div>
      )}
      {confirmFailed && (
        <div
          className={`fixed w-screen h-screen flex justify-center items-center ${confirmFailed ? "opacity-100" : "opacity-0"} bg-black bg-opacity-50`}
        >
          <div className="flex flex-col justify-center items-center w-4/5 px-5 py-8 rounded-2xl bg-white text-center text-black">
            성인부터 구매할 수 있는 상품입니다.
            <br />
            다음 기회에 봬요!
            <LinkButton href="/" className="w-full mt-3">
              홈으로
            </LinkButton>
          </div>
        </div>
      )}
    </>
  );
}

export default Adult;
