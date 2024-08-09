interface resultType {
  [result: string]: { productNumber: number[]; content: string[] };
}

export const question = [
  {
    title: "평소 주량이 어떻게 되세요?",
    A: "소주 반 병",
    B: "소주 한 병",
    C: "소주 두 병",
  },
  { title: "원하시는 당도를 선택해주세요!", A: "0%", B: "50%", C: "100%" },
  {
    title: "술과 언제 함께 하실건가요?",
    A: "더운 날",
    B: "비오는 날",
    C: "연인과 함께",
    D: "친구와 함께",
  },
];

export const result: resultType = {
  AAA: {
    productNumber: [1, 2],
    content: ["한알한알 추천문구~~~~", "서울의밤 진토닉 추천문구~~~~"],
  },
  AAB: {
    productNumber: [1],
    content: ["서주감자술 추천문구~~~~"],
  },
  AAC: {
    productNumber: [1],
    content: ["오미로제 연 추천문구~~~~"],
  },
  AAD: {
    productNumber: [1, 2],
    content: ["온지 오 추천문구~~~~", "그랑꼬또 청수 추천문구~~~~"],
  },
  ABA: {
    productNumber: [1, 2],
    content: ["가평잣막걸리 캔 추천문구~~~~", "매실원주 추천문구~~~~"],
  },
  ABB: {
    productNumber: [1, 2],
    content: ["가평잣막걸리 캔 추천문구~~~~", "니모메 추천문구~~~~"],
  },
  ABC: {
    productNumber: [1, 2],
    content: ["매실원주 추천문구~~~~", "여포의 꿈 추천문구~~~~"],
  },
  ABD: {
    productNumber: [1, 2],
    content: ["풍정사계 춘 추천문구~~~~", "모월 인 + 토닉워터 추천문구~~~~"],
  },
  ACA: {
    productNumber: [1],
    content: ["황진이(삼계탕 추천 곁들이면서) 추천문구~~~~"],
  },
  ACB: {
    productNumber: [1, 2],
    content: ["세종알밤주 추천문구~~~~", "대대포블루 추천문구~~~~"],
  },
  ACC: {
    productNumber: [1, 2],
    content: ["허니문 와인 추천문구~~~~", "고도리 복숭아와인 추천문구~~~~"],
  },
  ACD: {
    productNumber: [1, 2],
    content: ["요새로제 추천문구~~~~", "편백숲 스파클링 딸기막걸리 추천문구~~~~"],
  },
  BAA: {
    productNumber: [1, 2],
    content: ["한알한알 추천문구~~~~", "서울의밤 진토닉 추천문구~~~~"],
  },
  BAB: {
    productNumber: [1],
    content: ["동학 1957 특선 추천문구~~~~", "선호생막걸리 추천"],
  },
  BAC: {
    productNumber: [1, 2],
    content: ["온지 오 추천문구~~~~", "여포의꿈 레드와인 추천문구~~~~"],
  },
  BAD: {
    productNumber: [1],
    content: ["김천과하주 추천문구~~~~"],
  },
  BBA: {
    productNumber: [1],
    content: ["백련 생막걸리 Misty 추천문구~~~~"],
  },
  BBB: {
    productNumber: [1, 2],
    content: ["술취한원숭이 추천문구~~~~", "가평잣막걸리 캔 추천문구~~~~"],
  },
  BBC: {
    productNumber: [1, 2],
    content: ["추성주 추천문구~~~~", "술샘 16 추천문구~~~~"],
  },
  BBD: {
    productNumber: [1, 2],
    content: ["명인안동소주 양반탈 추천문구~~~~", "복순도가 추천문구~~~~"],
  },
  BCA: {
    productNumber: [1],
    content: ["제주 오메기 맑은술 추천문구~~~~"],
  },
  BCB: {
    productNumber: [1, 2, 3],
    content: ["부자 10 추천문구~~~~", "매화깊은밤 추천문구~~~~"],
  },
  BCC: {
    productNumber: [1, 2],
    content: ["복분자음 추천문구~~~~", "샤토미소 로제 스위트 추천문구~~~~"],
  },
  BCD: {
    productNumber: [1, 2],
    content: ["한산소곡주 추천문구~~~~", "문희 오미자 추천문구~~~~"],
  },
  CAA: {
    productNumber: [1, 2],
    content: ["서설 추천문구~~~~", "삼천갑자 동방주 추천문구~~~~"],
  },
  CAB: {
    productNumber: [1],
    content: ["박재서명인 안동소주 추천문구~~~~"],
  },
  CAC: {
    productNumber: [1],
    content: ["가무치소주 25% 추천문구~~~~"],
  },
  CAD: {
    productNumber: [1, 2],
    content: ["고운달 백자 추천문구~~~~", "추사 40 추천문구~~~~"],
  },
  CBA: {
    productNumber: [1],
    content: ["백련 생막걸리 Misty 추천문구~~~~"],
  },
  CBB: {
    productNumber: [1, 2],
    content: ["천비향 탁주 추천문구~~~~", "술취한원숭이 추천문구~~~~"],
  },
  CBC: {
    productNumber: [1],
    content: ["문배술 추천문구~~~~"],
  },
  CBD: {
    productNumber: [1, 2],
    content: ["풍정사계 춘 추천문구~~~~", "감홍로 추천문구~~~~"],
  },
  CCA: {
    productNumber: [1],
    content: ["청명주 추천문구~~~~"],
  },
  CCB: {
    productNumber: [1, 2],
    content: ["문희 오미자 추천문구~~~~", "구름을 벗삼아 추천문구~~~~"],
  },
  CCC: {
    productNumber: [1, 2],
    content: ["복분자음 추천문구~~~~", "샤토미소 로제 스위트 추천문구~~~~"],
  },
  CCD: {
    productNumber: [1, 2],
    content: ["면천두견주 추천문구~~~~", "죽향 41 추천문구~~~~"],
  },
};
