"use server";

const IMP_API_KEY = process.env.NEXT_PUBLIC_API_V1_REST_API_KEY;
const IMP_API_SECRET = process.env.NEXT_PUBLIC_API_V1_REST_API_SECRET;

// 서버로부터 access-token을 받아오는 함수
export const getToken = async () => {
  try {
    const data = await fetch("https://api.iamport.kr/users/getToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imp_key: IMP_API_KEY,
        imp_secret: IMP_API_SECRET,
      }),
    });
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

// 본인인증 완료 후 실행될 콜백함수
export const certificationCallback = async (response) => {
  console.log(response);
  const { success, error_msg } = response;

  if (success) {
    const userImpUid = response.imp_uid;

    const tokenData = await getToken();
    const { access_token } = tokenData.response;

    // imp_uid를 바탕으로 서버에 고객 정보 조회 요청하는 함수
    const getCertifications = await fetch(`https://api.iamport.kr/certifications/${userImpUid}`, {
      method: "GET",
      headers: { Authorization: access_token },
    });
    const userInfoJsonData = await getCertifications.json();

    console.log("사용자의 생년월일", userInfoJsonData.response.birthday);
  } else {
    console.error(`본인인증 실패! : ${error_msg}`);
  }
};
