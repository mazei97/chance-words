# CSV/Excel 파일 업로드 가이드

## CSV 특수문자 처리

### 쉼표(,) 포함하기
큰따옴표로 감싸세요:
```csv
"hello, world","안녕, 세상"
"yes, no","예, 아니오"
```

### 큰따옴표(") 포함하기
두 개의 큰따옴표("")로 표현:
```csv
"He said ""Hello""","그는 ""안녕""이라고 말했다"
```

### 줄바꿈 포함하기
큰따옴표로 감싸면 줄바꿈도 가능:
```csv
"first line
second line","첫 줄
둘째 줄"
```

## 지원 파일 형식

- Excel (.xlsx, .xls)
- CSV (.csv)

## 파일 형식

첫 번째 열: 영어 단어
두 번째 열: 한글 뜻

### CSV 예시
```csv
english,korean
apple,사과
book,책
cat,고양이
```

### Excel 예시
| A열 (영어) | B열 (한글) |
|-----------|-----------|
| apple     | 사과      |
| book      | 책        |
| cat       | 고양이    |

## Excel에서 만들기

1. Excel 열기
2. A열: 영어 단어 입력
3. B열: 한글 뜻 입력
4. 파일 > 저장 (Excel 파일로 저장)
   - 또는 CSV로 저장: 파일 > 다른 이름으로 저장 > CSV 선택

## 샘플 파일

- `public/sample.csv` - CSV 샘플
- `public/sample.xlsx` - Excel 샘플

## 주의사항

- 첫 번째 행은 헤더로 자동 무시됩니다 (선택사항)
- 빈 행은 자동으로 제외됩니다
- Excel(.xlsx, .xls), CSV(.csv) 모두 지원
- 한 번에 수백 개의 단어도 업로드 가능
