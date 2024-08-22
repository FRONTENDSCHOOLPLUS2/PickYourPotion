"use client";

import Button from "@/components/Button";
import { certificationCallback } from "./action";
import { Pg } from "iamport-typings/src";

export interface RequestCertificationParams {
  pg?: Pg | `${Pg}.${string}`; //본인인증 설정이 2개이상 되어 있는 경우 필수
  merchant_uid?: string; // 주문 번호
  m_redirect_url?: string; // 모바일환경에서 popup:false(기본값) 인 경우 필수, 예: https://www.myservice.com/payments/complete/mobile
  popup: boolean;
}

export interface RequestCertificationResponse {
  success: boolean;
  imp_uid: string | null;
  merchant_uid: string;
  pg_provider: string;
  pg_type: string;
  error_code: string | null;
  error_msg: string | null;
}

export type RequestCertificationResponseCallback = (response: RequestCertificationResponse) => void;

// export interface IMPType extends Iamport {
//   certification: (params:RequestCertificationParams, callback?:RequestCertificationResponseCallback) => void
// }

function Adult() {
  const onCertification = () => {
    if (!window.IMP) return;

    // 가맹점 식별하기
    const { IMP } = window;
    IMP.init("imp84722743");

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
      <Button onClick={onCertification}>성인인증하기</Button>
    </>
  );
}

export default Adult;
