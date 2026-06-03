# 황금비 포토 연구소

QR 코드로 접속해 자신의 얼굴 사진을 촬영하거나 기존 셀피를 업로드하면, 얼굴 랜드마크를 찾아 여러 얼굴 비율을 확인하는 수학 체험용 웹앱입니다.

## 주요 기능

- 모바일 사진 업로드 및 촬영 입력
- 얼굴 랜드마크 기반 분석
- 얼굴 길이, 얼굴 너비, 눈 사이 거리, 입 너비 측정
- 얼굴 길이 ÷ 얼굴 너비, 입 너비 ÷ 눈 사이 거리 등 비율 계산
- 황금비 1.618과 가까운 정도를 교육용 지수로 표시
- 사진 위에 측정선과 라벨 표시
- 결과 포토카드 PNG 저장

## 배포 주소

GitHub Pages 배포 주소:

```text
https://deepseamath.github.io/golden-ratio-photo-lab/
```

QR 코드는 이 주소로 만들면 됩니다.

## GitHub Pages 설정

GitHub 저장소에서 아래처럼 설정합니다.

1. `Settings` 메뉴를 엽니다.
2. 왼쪽 메뉴에서 `Pages`를 누릅니다.
3. `Build and deployment`의 `Source`를 `Deploy from a branch`로 선택합니다.
4. Branch는 `main`, Folder는 `/docs`로 선택합니다.
5. `Save`를 누릅니다.

## 로컬 실행 방법

React/Vite 버전을 로컬에서 실행하려면 Node.js 설치 후 아래 명령어를 사용합니다.

```bash
npm install
npm run dev
```

보통 `http://localhost:5173` 주소에서 확인할 수 있습니다.

## 현재 구현 기준

이 앱은 MediaPipe 얼굴 랜드마크 모델을 사용합니다. 정면 셀피일수록 측정선이 자연스럽게 맞습니다. 결과는 수학 체험용 추정값이며 실제 외모 평가나 의학적 판단이 아닙니다.
