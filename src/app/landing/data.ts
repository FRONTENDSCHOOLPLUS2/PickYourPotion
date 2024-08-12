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
    productNumber: [5, 6],
    content: ["한알한알 추천문구~~~~", "서울의밤 진토닉 추천문구~~~~"],
  },
  AAB: {
    productNumber: [7],
    content: ["서주감자술 추천문구~~~~"],
  },
  AAC: {
    productNumber: [8],
    content: ["오미로제 연 추천문구~~~~"],
  },
  AAD: {
    productNumber: [9, 15],
    content: ["온지 오 추천문구~~~~", "그랑꼬또 청수 추천문구~~~~"],
  },
  ABA: {
    productNumber: [10, 11],
    content: ["가평잣막걸리 캔 추천문구~~~~", "매실원주 추천문구~~~~"],
  },
  ABB: {
    productNumber: [10, 12],
    content: ["가평잣막걸리 캔 추천문구~~~~", "니모메 추천문구~~~~"],
  },
  ABC: {
    productNumber: [11, 27],
    content: ["매실원주 추천문구~~~~", "여포의 꿈 추천문구~~~~"],
  },
  ABD: {
    productNumber: [13, 14],
    content: ["풍정사계 춘 추천문구~~~~", "모월 인 + 토닉워터 추천문구~~~~"],
  },
  ACA: {
    productNumber: [18],
    content: ["황진이(삼계탕 추천 곁들이면서) 추천문구~~~~"],
  },
  ACB: {
    productNumber: [19, 20],
    content: ["세종알밤주 추천문구~~~~", "대대포블루 추천문구~~~~"],
  },
  ACC: {
    productNumber: [21, 22],
    content: ["허니문 와인 추천문구~~~~", "고도리 복숭아와인 추천문구~~~~"],
  },
  ACD: {
    productNumber: [23, 25],
    content: ["요새로제 추천문구~~~~", "편백숲 스파클링 딸기막걸리 추천문구~~~~"],
  },
  BAA: {
    productNumber: [5, 6],
    content: ["한알한알 추천문구~~~~", "서울의밤 진토닉 추천문구~~~~"],
  },
  BAB: {
    productNumber: [16, 26],
    content: ["동학 1957 특선 추천문구~~~~", "선호생막걸리 추천"],
  },
  BAC: {
    productNumber: [9, 28],
    content: ["온지 오 추천문구~~~~", "여포의꿈 레드와인 추천문구~~~~"],
  },
  BAD: {
    productNumber: [29],
    content: ["김천과하주 추천문구~~~~"],
  },
  BBA: {
    productNumber: [30],
    content: ["백련 생막걸리 Misty 추천문구~~~~"],
  },
  BBB: {
    productNumber: [31, 10],
    content: ["술취한원숭이 추천문구~~~~", "가평잣막걸리 캔 추천문구~~~~"],
  },
  BBC: {
    productNumber: [32, 25],
    content: ["술샘 16 추천문구~~~~"],
  },
  BBD: {
    productNumber: [33, 34],
    content: ["명인안동소주 양반탈 추천문구~~~~", "복순도가 추천문구~~~~"],
  },
  BCA: {
    productNumber: [35],
    content: ["제주 오메기 맑은술 추천문구~~~~"],
  },
  BCB: {
    productNumber: [36, 37],
    content: ["부자 10 추천문구~~~~", "매화깊은밤 추천문구~~~~"],
  },
  BCC: {
    productNumber: [38, 50],
    content: ["복분자음 추천문구~~~~", "샤토미소 로제 스위트 추천문구~~~~"],
  },
  BCD: {
    productNumber: [39, 40],
    content: ["한산소곡주 추천문구~~~~", "문희 오미자 추천문구~~~~"],
  },
  CAA: {
    productNumber: [41, 42],
    content: ["서설 추천문구~~~~", "삼천갑자 동방주 추천문구~~~~"],
  },
  CAB: {
    productNumber: [43],
    content: ["박재서명인 안동소주 22 추천문구~~~~"],
  },
  CAC: {
    productNumber: [44],
    content: ["가무치소주 25% 추천문구~~~~"],
  },
  CAD: {
    productNumber: [45, 46],
    content: ["고운달 백자 추천문구~~~~", "추사 40 추천문구~~~~"],
  },
  CBA: {
    productNumber: [30],
    content: ["백련 생막걸리 Misty 추천문구~~~~"],
  },
  CBB: {
    productNumber: [47, 31],
    content: ["천비향 탁주 추천문구~~~~", "술취한원숭이 추천문구~~~~"],
  },
  CBC: {
    productNumber: [48],
    content: ["문배술 추천문구~~~~"],
  },
  CBD: {
    productNumber: [13, 49],
    content: ["풍정사계 춘 추천문구~~~~", "감홍로 추천문구~~~~"],
  },
  CCA: {
    productNumber: [17],
    content: ["청명주 추천문구~~~~"],
  },
  CCB: {
    productNumber: [40, 24],
    content: ["문희 오미자 추천문구~~~~", "구름을 벗삼아 추천문구~~~~"],
  },
  CCC: {
    productNumber: [38, 50],
    content: ["복분자음 추천문구~~~~", "샤토미소 로제 스위트 추천문구~~~~"],
  },
  CCD: {
    productNumber: [51, 52],
    content: ["면천두견주 추천문구~~~~", "죽향 41 추천문구~~~~"],
  },
};
