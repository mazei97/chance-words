# GitHub Pages 배포 가이드

## 설정 방법

1. GitHub 저장소 생성
   - 저장소 이름: `words` (또는 원하는 이름)

2. 코드 푸시
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/words.git
   git push -u origin main
   ```

3. GitHub Pages 활성화
   - 저장소 Settings > Pages로 이동
   - Source: "GitHub Actions" 선택

4. 자동 배포
   - main 브랜치에 푸시하면 자동으로 배포됩니다
   - Actions 탭에서 배포 진행 상황 확인 가능

## 배포 URL

배포 후 다음 URL에서 접근 가능합니다:
- `https://maze197.github.io/chance-words/`

## 저장소 이름 변경 시

`next.config.js`에서 `basePath`를 수정하세요:
```js
basePath: process.env.GITHUB_ACTIONS ? '/YOUR_REPO_NAME' : '',
```

## 로컬 빌드 테스트

```bash
npm run build
npx serve out
```
