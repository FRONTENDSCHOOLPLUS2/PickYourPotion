import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import { login, loginOAuth, signupWithOAuth } from "./model/action/userAction";
import { OAuthUser, RefreshTokenRes, UserData, UserLoginForm } from "./types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { fetchAccessToken } from "./model/fetch/userFetch";
import discord from "next-auth/providers/discord";

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // email/password 정보로 로그인 요청
      async authorize(credentials) {
        // credentials: 서버 액션에서 호출한 signIn('credentials', 사용자 정보) 메소드의 두번째 인수(사용자 정보)
        const resJson = await login(credentials as UserLoginForm);

        if (resJson.ok) {
          const user = resJson.item;
          return {
            id: String(user._id),
            email: user.email,
            name: user.name,
            type: user.type,
            image: user.image && SERVER + user.image,
            accessToken: user.token!.accessToken,
            refreshToken: user.token!.refreshToken,
          };
        } else {
          console.error(resJson);
          throw new CredentialsSignin(resJson.message, { cause: resJson });
        }
      },
    }),
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt", // JSON Web Token 사용(기본값)
    maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
    // maxAge: 60,
  },
  pages: {
    signIn: "/notice", // Default: '/auth/signin'
  },
  callbacks: {
    // 로그인 처리를 계속 할지 여부 결정. 로그인한 후 추가 검증을 하거나 특정 조건에 따라서 로그인 성공/실패를 다시 결정할 때 사용
    // signIn 콜백은 true를 반환하면 로그인 처리를 계속하고,
    // false를 반환하거나 오류를 던지면 로그인 흐름을 중단하여 사용자에게 오류 페이지로 리디렉션
    // user: authorize()가 리턴한 객체
    // account: provider 정보
    // profile: OAuth 제공자가 반환한 사용자 프로필 정보
    // credentials: authorize()에 전달된 로그인 정보(사용자가 입력한 id, password 등)
    async signIn({ user, account, profile, credentials }) {
      /* id/pwd
        callbacks.signIn {
          id: '2',
          email: 's1@market.com',
          name: '네오',
          type: 'seller',
          image: 'http://localhost/files/00-next-level/user-neo.webp',
          accessToken: '...',
          refreshToken: '...'
        } {
          providerAccountId: '2',
          type: 'credentials',
          provider: 'credentials'
        } undefined undefined {
          email: 's1@market.com',
          password: '11111111',
          callbackUrl: '/movies'
        }
      */

      /* github
        callbacks.signIn {
          id: 'b0fcfc5b-2458-4087-b7cb-064647716ff0',
          name: 'Kilyong Jeong',
          email: 'uzoolove@gmail.com',
          image: 'https://avatars.githubusercontent.com/u/7599569?v=4'
        } {
          access_token: '...',
          token_type: 'bearer',
          scope: 'read:user,user:email',
          provider: 'github',
          type: 'oauth',
          providerAccountId: '7599569'
        } {
          login: 'uzoolove',
          id: 7599569,
          node_id: 'MDQ6VXNlcjc1OTk1Njk=',
          ...
        } undefined
      */
      // console.log("callbacks.signIn", user, account, profile, credentials);

      switch (account?.provider) {
        case "credentials":
          // console.log("id/pwd 로그인", user);
          break;
        case "google":

        case "discord":
          /*
            OAuth 로그인 {
              id: '409716c3-f6d3-4988-bf0e-062d85b3114e',
              name: 'dainhome',
              email: 'homedain01@gmail.com',
              image: 'https://lh3.googleusercontent.com/a/ACg8ocKqRBGG4QfyzlASvT7kARFlFHW7s8tQ6XQ-3fDQD6U7lLsqHQ=s96-c'   
            }
          */
          console.log("OAuth 로그인", user);

          // DB에서 id를 조회해서 있으면 로그인 처리를 없으면 자동 회원 가입 후 로그인 처리
          let userInfo: UserData | null = null;
          try {
            // 자동 회원 가입
            const newUser: OAuthUser = {
              type: "user",
              loginType: account.provider,
              name: user.name || "",
              email: user.email || "",
              image: user.image || "",
              extra: { ...profile, providerAccountId: account.providerAccountId },
            };

            // 이미 가입된 회원이면 회원가입이 되지 않고 에러를 응답하므로 무시하면 됨
            const result = await signupWithOAuth(newUser);
            console.log("회원 가입", result);

            // 자동 로그인
            const resData = await loginOAuth(account.providerAccountId);
            if (resData.ok) {
              userInfo = resData.item;
              console.log(userInfo);
            } else {
              // API 서버의 에러 메시지 처리
              throw new Error(resData.message);
            }
          } catch (err) {
            console.error(err);
            throw err;
          }
          user.id = String(userInfo._id);
          user.type = userInfo.type;
          user.accessToken = userInfo.token!.accessToken;
          user.refreshToken = userInfo.token!.refreshToken;
          break;
      }

      return true;
    },

    // JWT 토큰이 생성될 때, 업데이트될 때 호출
    // 로그인 성공한 회원 정보로 token 객체 설정
    // 최초 로그인시 user 객체 전달, 업데이트시나 세션 조회용으로 호출되면 user는 없음
    async jwt({ token, user, account, profile, session, trigger }) {
      /*
        callbacks.jwt {
          name: '네오',
          email: 's1@market.com',
          picture: 'http://localhost/files/00-next-level/user-neo.webp',
          sub: '2'
        } {
          id: '2',
          email: 's1@market.com',
          name: '네오',
          type: 'seller',
          image: 'http://localhost/files/00-next-level/user-neo.webp',
          accessToken: '...',
          refreshToken: '...'
        } {
          providerAccountId: '2',
          type: 'credentials',
          provider: 'credentials'
        } undefined undefined
      */

      /* 로그인 완료 후 메인 페이지로 이동
        signInWithCredentials 로그인한 결과 http://localhost:3000
        ○ Compiling / ...
        ✓ Compiled / in 1005ms (1122 modules)
        callbacks.redirect http://localhost:3000 http://localhost:3000
      */

      /* 메인 페이지로 이동 후 세션 가져옴
        callbacks.jwt {
          name: '네오',
          email: 's1@market.com',
          picture: 'http://localhost/files/00-next-level/user-neo.webp',
          sub: '2',
          id: '2',
          type: 'seller',
          accessToken: '...',
          refreshToken: '...',
          iat: 1723078694,
          exp: 1723165094,
          jti: '1535edee-7491-4bd5-9efe-7daf0e4a6698'
        } undefined undefined undefined undefined
      */
      // console.log('callbacks.jwt', token, user, account, profile, session);

      // 토큰 만료 체크, 리플래시 토큰으로 재발급
      // 리플레시 토큰도 만료되었으면 로그아웃 처리
      if (user) {
        token.id = user.id;
        token.type = user.type;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      // JWT 자체의 만료 시간 추출
      const decodedToken = jwt.decode(token.accessToken) as JwtPayload | null;
      const accessTokenExpires = decodedToken?.exp ? decodedToken?.exp * 1000 : 0; // 밀리초 단위로 변환

      // 토큰 만료 확인
      const shouldRefreshToken = Date.now() > accessTokenExpires;
      if (shouldRefreshToken) {
        try {
          console.log("토큰 만료됨.", Date.now() + " > " + accessTokenExpires);
          const res = await fetchAccessToken(token.refreshToken);
          if (res.ok) {
            const resJson: RefreshTokenRes = await res.json();
            return {
              ...token,
              accessToken: resJson.accessToken,
            };
          } else {
            if (res.status === 401) {
              // 인증 되지 않음(리플래시 토큰 인증 실패)
              console.log("리플래시 토큰 인증 실패. 로그인 페이지로 이동해야 함", await res.json());
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(error);
            return {
              ...token,
              error: error.message,
            };
          }
        }
      } else {
        // console.log(`토큰 ${accessTokenExpires - Date.now()} ms 남음`);
      }

      // 세션 업데이트
      if (trigger === "update" && session) {
        token.name = session.name;
      }

      return token;
    },

    // 클라이언트에서 세션 정보 요청시 호출
    // 세션에 저장할 사용자 정보를 지정(세션 정보 수정)
    // token 객체 정보로 session 객체 설정
    session({ session, token }) {
      /*
        callbacks.session {
          user: {
            name: '네오',
            email: 's1@market.com',
            image: 'http://localhost/files/00-next-level/user-neo.webp'
          },
          expires: '2024-08-09T00:58:15.653Z'
        } {
          name: '네오',
          email: 's1@market.com',
          picture: 'http://localhost/files/00-next-level/user-neo.webp',
          sub: '2',
          id: '2',
          type: 'seller',
          accessToken: '...',
          refreshToken: '...',
          iat: 1723078694,
          exp: 1723165094,
          jti: '1535edee-7491-4bd5-9efe-7daf0e4a6698'
        }
      */
      // console.log('callbacks.session', session, token);
      session.user.id = token.id as string;
      session.user.type = token.type as string;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },

    // 로그인/로그아웃 후 리디렉션할 URL 지정
    // redirect 함수를 제공할 경우 signIn 호출시 두번째 인자로 전달하는 옵션의 redirectTo는 동작하지 않음
    // signIn('google', { redirectTo: '/music' });
    // url: signIn 콜백 함수가 반환한 값
    // baseUrl: NEXTAUTH_URL 환경변수에 설정된 값
    // async redirect({ url, baseUrl }){
    //   console.log('callbacks.redirect', url, baseUrl);
    //   return baseUrl;
    // },
  },
});
