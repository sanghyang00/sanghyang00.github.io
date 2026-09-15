#!/bin/sh

# 0. (필수) 실행 전에 jekyll serve로 _site 폴더를 업데이트 하고 실행해야 함.

# 1. (필수) 스크립트 실행 전 토큰 설정
# $ export GH_TOKEN="ghp_YOUR_PERSONAL_ACCESS_TOKEN"
# $ bash ./deploy.sh  (이 스크립트 실행)

# 환경 변수($GH_TOKEN) 확인
if [ -z "$GH_TOKEN" ]; then
  echo "오류: GH_TOKEN 환경 변수가 설정되지 않았습니다."
  exit 1
fi

# Git 커밋 유저 정보 확인
COMMIT_EMAIL=$(git config --global user.email)
COMMIT_NAME=$(git config --global user.name)

if [ -z "$COMMIT_EMAIL" ] || [ -z "$COMMIT_NAME" ]; then
  echo "오류: Git 유저 이름 또는 이메일이 설정되지 않았습니다."
  echo "(git config --global user.name ...)"
  exit 1
fi

# 상위 폴더에서 원본 저장소 URL 가져오기
ORIGIN_URL=$(git config --file .git/config remote.origin.url)

# (수정) URL 파싱: '?' 확장 정규식 대신 http와 https를 별도 처리
REPO_PATH=$(echo $ORIGIN_URL | sed \
  -e 's/https:\/\/[^/]*\///' \
  -e 's/http:\/\/[^/]*\///' \
  -e 's/git@github\.com://')

# (추가) 디버깅 출력
echo "--- 디버깅 정보 ---"
echo "Origin URL: $ORIGIN_URL"
echo "Parsed Path: $REPO_PATH"

# (추가) 파싱 결과 확인
if [ -z "$REPO_PATH" ]; then
  echo "오류: 저장소 경로(REPO_PATH)를 파싱하지 못했습니다."
  echo "Origin URL이 올바른지 확인해주세요."
  exit 1
fi

# 토큰을 사용한 인증 URL 생성
AUTH_URL="https://x-access-token:${GH_TOKEN}@github.com/${REPO_PATH}"

echo "Push URL: https://x-access-token:***TOKEN***@github.com/${REPO_PATH}"
echo "--------------------"


# 1. _site 디렉토리로 이동
cd _site

# 2. Git 초기화 및 설정
rm -rf .git
git init
git config user.name "${COMMIT_NAME}"
git config user.email "${COMMIT_EMAIL}"
git checkout -b gh-pages

# 3. 스테이징 및 커밋
git add -A
git commit -m "Deploy to gh-pages"

# 5. (수정) 인증된 URL로 강제 푸시
echo "GitHub Pages로 배포합니다..."
git push -f "${AUTH_URL}" HEAD:gh-pages

# 6. 정리
cd ..
rm -rf _site/.git

echo "✅ 배포 완료!"
