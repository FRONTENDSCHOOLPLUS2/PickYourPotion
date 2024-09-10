## 🍶조지주(調持酒)

---

배포 URL : https://pick-your-potion.verce

## 1. 프로젝트 소개

<img width="1062" alt="PickYourPotion_Logo" src="https://github.com/user-attachments/assets/9ee8f251-520b-464f-9be1-b6d7ad7449e5">

여러분의 인생에서 가장 완벽한 술을 찾아드리는 ‘조지주’를 소개합니다. ‘조지주’는 ‘고를 조(挑)’, ‘가질 지(持)’, 그리고 ‘술 주(酒)’의 의미를 담은 주류 이커머스 플랫폼으로, 여러분의 취향을 고려한 최적의 술을 추천해드립니다. 술BTI 테스트를 통해 나만의 맞춤 주류를 발견하고, 간편하게 구매까지 할 수 있는 새로운 주류 쇼핑 경험을 지금 ‘조지주’에서 만나보세요.

## 2. 팀원 소개

조지주(調持酒) 팀을 소개합니다!

안녕하세요. 저희는 4명의 Front-end 개발자로 구성된 조지주(調持酒)팀입니다.

<div align="center">

|                                                                                          |                                                                                         |                                                                                         |                                                                                       |
| :--------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/122030243?v=4" width="120px;" alt=""/> | <img src="https://avatars.githubusercontent.com/u/76080643?v=4" width="120px;" alt=""/> | <img src="https://avatars.githubusercontent.com/u/88381607?v=4" width="120px;" alt=""/> | <img src="https://avatars.githubusercontent.com/u/87270448?v=4" width="120" alt="" /> |
|                         [박재웅](https://github.com/donguramee)                          |                        [조정현](https://github.com/hardy-is-cat)                        |                            [송재웅](https://github.com/AYFG)                            |                       [이재영](https://github.com/jaeyounging)                        |

</div>

## 3. 기술 및 개발 환경

 <div align="center">

|                                                                                                                                                                                                                                                                            FrontEnd                                                                                                                                                                                                                                                                             |  BackEnd   |                                               Design                                               |                                                                                                                                                                                                      협업방식                                                                                                                                                                                                       |                                                                                                                                        컨벤션                                                                                                                                        |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------: | :------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"> <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=plastic&logo=react%20query&logoColor=white"> <img src="https://img.shields.io/badge/Zustand-582d3e?style=flat-square&logo=Zustand&logoColor=white"> <img src="https://img.shields.io/badge/Typescript-3178C6.svg?style=flat-square&logo=Typescript&logoColor=black"> | 제공된 API | <img src="https://img.shields.io/badge/figma-FBCEB1?style=flat-square&logo=figma&logoColor=white"> | <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000.svg?style=flat-square&logo=Notion&logoColor=white"> <img src="https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=Discord&logoColor=white"> | <img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat-square&logo=Prettier&logoColor=black"> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/ESLint-3A33D1?logo=eslint"> |

</div>

## 4.기획

<img width="1062" alt="PickYourPotion_wireFrame" src="https://github.com/user-attachments/assets/5eea04e0-736b-4ced-9669-09e0780129e5">
 
## 5. 폴더 구조

```
🍶 PickYourPotion
📦src
 ┣ 📂app
 ┃ ┣ 📂(user)
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┣ 📂activity
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📜replies.ts
 ┃ ┃ ┃ ┃ ┣ 📜ReviewList.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ReviewToWrite.tsx
 ┃ ┃ ┃ ┃ ┣ 📜WrittenReviewCard.tsx
 ┃ ┃ ┃ ┃ ┣ 📜WrittenReviewDetail.tsx
 ┃ ┃ ┃ ┃ ┗ 📜WrittenReviewList.tsx
 ┃ ┃ ┃ ┣ 📜MyPageButton.tsx
 ┃ ┃ ┃ ┣ 📜MyPageList.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📂signup
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📜AdminInput.tsx
 ┃ ┃ ┣ 📜AdminSelect.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂adult
 ┃ ┃ ┣ 📜action.ts
 ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📂[...nextauth]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┗ 📂payments
 ┃ ┃ ┃ ┗ 📂[...tossPayments]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂brewery
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂cart
 ┃ ┃ ┣ 📜CartPage.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂community
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂detail
 ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┣ 📜AddCart.tsx
 ┃ ┃ ┃ ┣ 📜Buying.tsx
 ┃ ┃ ┃ ┣ 📜Detail.tsx
 ┃ ┃ ┃ ┣ 📜DetailClient.tsx
 ┃ ┃ ┃ ┣ 📜NoReply.tsx
 ┃ ┃ ┃ ┣ 📜NoReview.tsx
 ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┣ 📜Reply.tsx
 ┃ ┃ ┃ ┣ 📜ReplyForm.tsx
 ┃ ┃ ┃ ┗ 📜ReplyItem.tsx
 ┃ ┣ 📂landing
 ┃ ┃ ┣ 📂question
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂[result]
 ┃ ┃ ┃ ┣ 📜Detail.tsx
 ┃ ┃ ┃ ┣ 📜loading.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜AnswerImage.tsx
 ┃ ┃ ┣ 📜data.ts
 ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┣ 📜setCookie.ts
 ┃ ┃ ┗ 📜Splash.tsx
 ┃ ┣ 📂market
 ┃ ┃ ┣ 📂fruit
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂liquor
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂raw
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂refined
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂order
 ┃ ┃ ┣ 📜Empty.tsx
 ┃ ┃ ┣ 📜order.ts
 ┃ ┃ ┣ 📜OrderList.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂pay
 ┃ ┃ ┣ 📂complete
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜Address.tsx
 ┃ ┃ ┣ 📜OrderedCard.tsx
 ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┗ 📜ProgressBar.tsx
 ┃ ┣ 📂search
 ┃ ┃ ┣ 📜fetchAllData.ts
 ┃ ┃ ┣ 📜fetchSearch.ts
 ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┗ 📜useDebounce.ts
 ┃ ┣ 📂[id]
 ┃ ┃ ┣ 📂cart
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂order
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂posts
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜Banner.tsx
 ┃ ┣ 📜CardItemSmall.tsx
 ┃ ┣ 📜CardSwiper.tsx
 ┃ ┣ 📜ChannelTalkManager.tsx
 ┃ ┣ 📜error.tsx
 ┃ ┣ 📜fonts.ts
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜loading.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components
 ┃ ┣ 📂icons
 ┃ ┃ ┣ 📜CartIcon.tsx
 ┃ ┃ ┣ 📜Cheers.tsx
 ┃ ┃ ┣ 📜Heart.tsx
 ┃ ┃ ┣ 📜LikeIcon.tsx
 ┃ ┃ ┣ 📜Rainy.tsx
 ┃ ┃ ┣ 📜Soju1bottle.tsx
 ┃ ┃ ┣ 📜Soju2bottle.tsx
 ┃ ┃ ┣ 📜SojuGlass.tsx
 ┃ ┃ ┣ 📜Spoon.tsx
 ┃ ┃ ┣ 📜SugarDice.tsx
 ┃ ┃ ┗ 📜Sunny.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜Button.tsx
 ┃ ┣ 📜Card.tsx
 ┃ ┣ 📜CartButton.tsx
 ┃ ┣ 📜CartCard.tsx
 ┃ ┣ 📜Category.tsx
 ┃ ┣ 📜DegreeBar.tsx
 ┃ ┣ 📜Input.tsx
 ┃ ┣ 📜InputError.tsx
 ┃ ┣ 📜LinkButton.tsx
 ┃ ┣ 📜MovingArrow.tsx
 ┃ ┣ 📜OrderDetail.tsx
 ┃ ┣ 📜ProductCard.tsx
 ┃ ┣ 📜ReviewCardItem.tsx
 ┃ ┣ 📜Submit.tsx
 ┃ ┗ 📜ThemeButton.tsx
 ┣ 📂model
 ┃ ┣ 📂action
 ┃ ┃ ┗ 📜userAction.ts
 ┃ ┗ 📂fetch
 ┃ ┃ ┗ 📜userFetch.ts
 ┣ 📂provider
 ┃ ┗ 📜TanstackProvider.tsx
 ┣ 📂third-party
 ┃ ┗ 📜channelTalk.ts
 ┣ 📂toast
 ┃ ┣ 📜errorToast.ts
 ┃ ┣ 📜infoToast.css
 ┃ ┗ 📜infoToast.tsx
 ┣ 📂types
 ┃ ┣ 📜file.ts
 ┃ ┣ 📜iamportExtends.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜kakao.ts
 ┃ ┣ 📜post.ts
 ┃ ┣ 📜product.ts
 ┃ ┣ 📜response.ts
 ┃ ┗ 📜user.ts
 ┣ 📂zustand
 ┃ ┗ 📜Store.ts
 ┣ 📜auth.ts
 ┗ 📜middleware.ts


```

## 7. 역할 분담

## 8. 트러블 슈팅
