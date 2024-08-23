import Iamport, { Pg } from "iamport-typings";

export interface RequestCertificationParams {
  pg?: Pg | `${Pg}.${string}`; //본인인증 설정이 2개이상 되어 있는 경우 필수
  merchant_uid?: string; // 주문 번호
  m_redirect_url?: string; // 모바일환경에서 popup:false(기본값) 인 경우 필수, 예: https://www.myservice.com/payments/complete/mobile
  popup?: boolean;
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

// Iamport를 확장한 새로운 인터페이스 정의
export interface ExtendedIamport extends Iamport {
  certification: (
    params: RequestCertificationParams,
    callback?: RequestCertificationResponseCallback,
  ) => void;
}
