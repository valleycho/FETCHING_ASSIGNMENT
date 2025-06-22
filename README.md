## ⭐️ 프로젝트 실행
- 라이브러리 설치: npm i
- 프로젝트 빌드: npm run build
- 프로젝트 실행: npm run start 또는 npm run dev

<br>

## 📁 폴더 구조
```
📦app
 ┣ 📂components
 ┃ ┣ 📂checkbox
 ┃ ┃ ┗ 📜Checkbox.tsx
 ┃ ┣ 📂header
 ┃ ┃ ┗ 📜Header.tsx
 ┃ ┣ 📂product
 ┃ ┃ ┣ 📜ProductCard.tsx
 ┃ ┃ ┗ 📜ProductList.tsx
 ┃ ┣ 📂rangeSlider
 ┃ ┃ ┗ 📜RangeSlider.tsx
 ┃ ┣ 📂searchBar
 ┃ ┃ ┗ 📜SearchBar.tsx
 ┃ ┣ 📂sideNavigator
 ┃ ┃ ┗ 📜SideNavigator.tsx
 ┃ ┗ 📂toggleSwitch
 ┃ ┃ ┗ 📜ToggleSwitch.tsx
 ┣ 📂data
 ┃ ┣ 📜dummyProductData.ts
 ┃ ┗ 📜productConstant.ts
 ┣ 📂hooks
 ┃ ┗ 📜useDebounce.ts
 ┣ 📂lib
 ┃ ┗ 📜ReactQueryProvider.tsx
 ┣ 📂service
 ┃ ┣ 📂product
 ┃ ┃ ┗ 📜useProductService.ts
 ┃ ┗ 📂search
 ┃ ┃ ┗ 📜useSearchService.ts
 ┣ 📂types
 ┃ ┣ 📜productTypes.ts
 ┃ ┗ 📜searchTypes.ts
 ┣ 📜favicon.ico
 ┣ 📜globals.css
 ┣ 📜layout.tsx
 ┗ 📜page.tsx
```

처음의 FSD 디자인 패턴으로 사용할까 고민하였지만, 프로젝트의 규모가 작고 상품 리스트 화면만 있으므로 직관적으로 components(컴포넌트들), data(api의 사용할 더미데이터 및 공용 상수 데이터들), hooks(공용 훅스), lib(라이브러리), service(모킹 api), types(타입들 정의)로 간단히 분류하였습니다.

## 💁 간략한 프로젝트 소개
<img width="800" alt="스크린샷 2025-06-22 오전 10 00 56" src="https://github.com/user-attachments/assets/0cf2cfc9-e8ca-4697-9f87-8b054d75ee68" />  
디자인을 어떻게 할지 고민하다가 최종적으로 이렇게 마무리하였습니다. 이렇게 한 이유는 FETCHING 로고 클릭으로 메인화면으로 이동이 쉽게하였고, 검색과 필터링을 분리하여 2개의 역할이 아닌 1가지의 역할만 수행하도록 하였습니다.(2개로 병합하면 헷갈릴 수 있으므로) 그래서 필터링이랑 검색은 따로 동작하면 검색한 후에 필터링을 적용하면 검색된 결과에서 필터링이 새로 적용되며, 검색을 새로 할 시에는 필터링을 초기화하여 유저의 불편함을 최소화하고 복잡성을 줄였습니다.   

<br>
<br>

<img width="506" alt="스크린샷 2025-06-22 오전 10 06 46" src="https://github.com/user-attachments/assets/b3f73d92-f87b-44bf-aa47-29c27d0b060a" />   
<img width="1427" alt="스크린샷 2025-06-22 오전 10 06 55" src="https://github.com/user-attachments/assets/aa86bb51-9f08-4815-acd3-7703856da32c" />   

그 외에 키보드로 검색하면 자동완성 기능 및 키보드 검색 후 품절 상품 표시 토글을 ON으로 한 뒤 필터조건 검색하면 필터된 조건이 검색되게 구현하였습니다. 가격 필터 또한 동작하는데 10만원 단위로 범위를 지정하였고, 가격 범위 내에서 검색이 되게 하였습니다.  

<br>

<img width="1211" alt="스크린샷 2025-06-22 오전 10 11 26" src="https://github.com/user-attachments/assets/44110eb4-1fb1-45c6-ac8b-ce5db95d6748" />
무한 스크롤 부분은 tanstack query의 useInfiniteQuery를 사용하여 무한 스크롤을 구현하였습니다. 데이터를 불러오는 도중의 위의 첨부이미지와 같이 데이터를 불러오는 중입니다. 로딩이 출력되게 구성하였습니다.
