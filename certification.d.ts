import { RequestCertificationParams, RequestCertificationResponseCallback } from "@/app/adult/page";

export declare module "iamport-typings" {
  interface Iamport {
    certification: (
      params: RequestCertificationParams,
      callback?: RequestCertificationResponseCallback,
    ) => void;
  }
}
