# Search disease

# 💡 프로젝트 개요

질병명 검색 및 검색어 추천을 구현한 웹 프로젝트입니다.

- 진행 기간: 약 3일(2023.09.06 ~ 2023.09.07)

- 개발 인원 : 1인 [@김현진](https://github.com/JJineu)

- 배포 주소 : [https://search-disease.vercel.app/](https://search-disease.vercel.app/)

<br>

※ 개발 과정은 Notion으로 정리했습니다.

- [Notion](https://www.notion.so/ongoingjin/week-03-like-react-query-7ace65753c054860b957115aff724363)

※ 개인 과제를 바탕으로 팀 과제를 진행했습니다. (2023.09.08 ~ 2023.09.09)

- [팀 Domain](https://2team-github-issue-page.netlify.app/)
- [팀 과제 Git](https://github.com/wanted-internship-team/pre-onboarding-12th-3-2)
- [팀 Notion](https://www.notion.so/somtha/2-05d97d2ea34f4c9e9828ebe5e0a051fa)

<br>

주요 구현 사항

- 검색어 캐싱 기능

- 키보드 반응

- 디바운스 


<br>
<br>

# 🧑🏻‍💻 프로젝트 정보

### 실행 방법

- 다음 링크를 클릭하시거나, [https://search-disease.vercel.app/](https://search-disease.vercel.app/)

- 프로젝트를 clone 하여 실행할 수 있습니다.

  ```jsx
  // 실행하기 위해서는 Node.js가 설치된 환경이 필요합니다.
  git clone https://github.com/JJineu/github-issue-web.git
  npm install
  npm start
  ```

  ```jsx
  // .env 설정이 필요합니다.
  REACT_APP_API_KEY = 발급받은 토큰
  ```

### 프로젝트 구조

```jsx
src
 ┣ 📂 api         네트워크 api 호출관련 로직
 ┣ 📂 components  컴포넌트 분리
 ┃ ┣ auth
 ┃ ┣ common
 ┃ ┗ issue
 ┣ 📂 constants   상수 처리
 ┣ 📂 context     전역 상태
 ┣ 📂 hooks       커스텀 훅
 ┣ 📂 pages       페이지 분리
 ┃ ┗ issue
 ┣ 📂 routes      라우팅
 ┣ 📂 types       타입 정의
 ┗ 📂 utils       분리되는 함수

```


### 개발 환경

<img src="https://img.shields.io/badge/Node.js v18 (LTS)-grey?style=for-the-badge&logo=nodedotjs"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>

### Convention

<img src="https://img.shields.io/badge/husky-brown?style=for-the-badge&logo=npm"> <img src="https://img.shields.io/badge/lint staged-white?style=for-the-badge&logo=npm"> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

### Network & Route

<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>

### Styling

<img src="https://img.shields.io/badge/styled component-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

<br>

```jsx
// dependency
```

<br>
<br>

# 📝 구현 상세 내용

### 1. 이슈 목록 화면

- 1-1) 이슈 목록 불러오기

>
> 공식문서를 살펴보니 한 가지 함정이 있었는데요, 깃헙에서는 풀 리쿼스트까지 이슈로 간주해, 응답 데이터에는 순수한 이슈 뿐 아니라, 풀 리퀘스트도 응답값으로 함께 들어왔습니다.
>
> 그래서 팀에서는 이슈 리스트를 호출하고 나서, 그 응답값을 `pull_request` 키 기준으로 필터링하여 전역 상태에 업데이트를 했습니다.
>
> `Axios`를 사용하고 있는 팀원들이 많아, Octokit 대신 Axios를 선택하였습니다.

- 1-2) 리스폰스 데이터의 타입지정

> 타입지정 - Octokit을 사용하는 경우에는 @octokit/types 타입 패키지를 통해 리스폰스 타이핑을 진행하였고, Axios를 사용한 팀원들은 Github API 공식문서를 확인하여 필요한 데이터만 인터페이스를 통해 타입지정하여 사용하였습니다.
>
> 팀에서는 Axios사용을 합의하여, 합의된 인터페이스로 리스폰스 타입지정 후 응답값을 사용하였습니다.
>

### 4. 에러 화면

> 라우팅 에러, 데이터 fetching 과정에서의 에러처리
>
> 1. 라우팅 에러
>    잘못된 주소 기입으로 인한 에러는, `Router` 에서 `path="*"` 를 적용하여 에러 컴포넌트를 노출시켜 주었습니다.
> 2. 데이터 fetching 과정의 에러
>
> 1) 이슈리스트
>    데이터 호출 시, `try - catch` 문을 이용하여 에러 여부를 판단했습니다.
>    에러 상태는 `UseState` 에러를 판단하는 _`IsError` 를_ 사용하여, 데이터의 성공 여부에 따라 `에러 컴포넌트`를 노출시켜주었습니다.
> 2) 이슈 디테일
>    데이터 호출 과정에서 발생하는 에러는 `interceptors` 를 사용하였습니다. 데이터 호출 시, `errorState` 가 `500`번 혹은 `600`번 이라면 미리 제작해 > 둔, `에러페이지`로 리다이렉트 해주었습니다.
>

### staged된 파일만 신경 쓰고싶어요 😢 - lint-staged

상황: main 배포 시 오류가 발생하지 않도록 
문제: husky 만 사용할 경우, 모든 파일을 검사하여 commit 까지의 시간이 걸렸습니다. 
과정:  lint-staged 적용을 했습니다.
결과:

husky 가 적용된 파일을 클론해서 사용하려고 하다보니, 첫 인스톨 후 husky 명령어를 인식하지 못하는 문제가 발생했습니다. 
husky 를 적용할 경우, 
1. 커밋 예정이 아닌 파일도 포매팅이 되어버리고, 린트 규칙이 적용되어 수정해줘야 한다.
2. 작업 상황을 나누어 커밋하고 싶은데 할 수 없다.

pre-push 대신 pre-commit 단계에서 처리할 수 있도록 했습니다.