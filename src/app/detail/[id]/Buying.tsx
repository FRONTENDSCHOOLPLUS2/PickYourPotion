import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { certificationCallback, getUserInfo } from "@/app/adult/action";
import Button from "@/components/Button";
import { ExtendedIamport } from "@/types/iamportExtends";
import { LinkButton } from "@/components/LinkButton";
import { errorToast } from "@/toast/errorToast";

const V1_IMP_KEY = process.env.NEXT_PUBLIC_API_V1_IMP_KEY;

export default function Buying() {
  const session = useSession();
  const router = useRouter();
  const token = session.data?.accessToken;

  // url의 request값을 받아와 변수에 저장
  const request = useSearchParams().get("request");
  const confirmSuccess = useSearchParams().get("confirmSuccess");
  const confirmFailed = useSearchParams().get("confirmFailed");

  const sessionCheckEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (token) {
      // 회원 정보 불러와서 성인인증 유무 확인
      const userInfo = await getUserInfo(session.data?.user?.id!);
      if (userInfo.item.extra.isAdult) {
        // 로그인이 되어있고 성인인증도 돼있을 때
        router.push("/pay");
      } else {
        // 로그인은 되어있지만 성인인증이 되지 않았을 때
        // url의 request값이 true면 모달 띄우기(stateless modal)
        router.push(`?request=true`);
      }
    } else {
      e.preventDefault();
      errorToast("구매를 하려면 로그인해야 합니다.");
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
      <button
        className={`contentMedium w-[244px] h-[62px] flex items-center justify-center cursor-pointer bg-primary text-white round`}
        onClick={sessionCheckEvent}
      >
        구매하기
      </button>
      {confirmSuccess && (
        <div
          className={`fixed top-0 left-0 z-[100] w-screen h-screen flex justify-center items-center ${confirmSuccess ? "opacity-100" : "opacity-0"} bg-black bg-opacity-50`}
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
          className={`fixed top-0 left-0 z-[100] w-screen h-screen flex justify-center items-center ${confirmFailed ? "opacity-100" : "opacity-0"} bg-black bg-opacity-50`}
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
      {request && (
        <div
          className={`fixed top-0 left-0 z-[100] w-screen h-screen flex justify-center items-center ${request ? "opacity-100" : "opacity-0"} bg-black bg-opacity-50`}
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
    </>
  );
}
