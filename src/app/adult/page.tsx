"use client";

import Button from "@/components/Button";
import { certificationCallback } from "./action";
import { ExtendedIamport } from "./types";

const V1_IMP_KEY = process.env.NEXT_PUBLIC_API_V1_IMP_KEY;
function Adult() {
  const onCertification = () => {
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
      <Button onClick={onCertification}>성인인증하기</Button>
    </>
  );
}

export default Adult;
