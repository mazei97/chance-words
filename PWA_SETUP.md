# PWA 설정 완료

## 아이콘 생성 필요

현재 placeholder 아이콘이 설정되어 있습니다. 실제 아이콘을 만들어주세요:

1. 아이콘 이미지 준비 (정사각형, 최소 512x512px)
2. 다음 사이트에서 PWA 아이콘 생성:
   - https://www.pwabuilder.com/imageGenerator
   - https://realfavicongenerator.net/

3. 생성된 아이콘을 다음 위치에 저장:
   - `public/icon-192x192.png` (192x192px)
   - `public/icon-512x512.png` (512x512px)

## PWA 기능

- ✅ 오프라인 지원
- ✅ 홈 화면에 추가 가능
- ✅ 앱처럼 실행
- ✅ 자동 캐싱
- ✅ 백그라운드 동기화

## 설치 방법

### 모바일 (Android/iOS)
1. 브라우저에서 앱 접속
2. 브라우저 메뉴 > "홈 화면에 추가" 선택
3. 홈 화면에서 앱 아이콘 클릭하여 실행

### 데스크톱 (Chrome/Edge)
1. 주소창 오른쪽의 설치 아이콘(+) 클릭
2. "설치" 버튼 클릭

## 테스트

```bash
npm install
npm run build
npx serve out
```

브라우저에서 열고 개발자 도구 > Application > Manifest 확인

## 배포 후 확인사항

- Lighthouse PWA 점수 확인
- 오프라인 동작 테스트
- 홈 화면 추가 테스트
