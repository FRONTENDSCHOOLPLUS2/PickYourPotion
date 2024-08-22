"use client";

import Button from "@/components/Button";
import { certificationCallback, getUserInfo } from "./action";
import { ExtendedIamport } from "./types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  const isLoggedIn = async () => {
    if (status === "authenticated") {
      // 회원 정보 불러와서 성인인증 유무 확인
      const userInfo = await getUserInfo(userId!);
      if (userInfo.item.extra.isAdult) {
        // 로그인이 되어있고 성인인증도 돼있을 때
        alert("술 구매 가능!");
        router.push("/pay");
      } else {
        // 로그인은 되어있지만 성인인증이 되지 않았을 때
        // url의 request값이 true면 모달 띄우기
        router.push("/adult?request=true");
      }
    } else {
      // 로그인이 안 돼있을 때
      alert("로그인 후 이용하실 수 있습니다.");
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
        pg: "inicis_unified",
      },
      certificationCallback,
    );
  };

  return (
    <>
      <h1>성인인증 테스트 페이지</h1>
      <Button onClick={isLoggedIn}>구매하기</Button>
      <Button onClick={onCertification}>성인인증하기</Button>
      {request && (
        <>
          <div className="bg-primary">
            성인인증 해주십시오!!!
            <Button onClick={onCertification}>성인인증하기</Button>
            <Link href="/adult">모달 없애기</Link>
          </div>
        </>
      )}
      {confirmSuccess && (
        <>
          <div>
            성인인증이 완료되었습니다. 상품을 구매해주세요.
            <Link href="/adult">구매하러 가기</Link>
          </div>
        </>
      )}
      {confirmFailed && (
        <>
          <div>
            성인부터 구매할 수 있는 상품입니다. 다음 기회에 봬요.
            <Link href={"/"}>홈으로</Link>
          </div>
        </>
      )}
    </>
  );
}

export default Adult;
