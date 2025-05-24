# 🔐 Password Notepad - Firebase 기반 비밀번호 관리자

이 프로젝트는 Firebase Authentication과 Firestore를 활용한  
**웹 기반 비밀번호 관리 시스템**입니다.  
사용자는 로그인 후 개인 암호화 키를 통해 비밀번호를 안전하게 저장하고,  
필요할 때 복호화하여 확인할 수 있습니다.

---

## 🖥️ 데모

👉 [GitHub Pages에서 보기](https://seong-nyang.github.io/password-notepad/)


---

## ✨ 주요 기능

- 🔐 Firebase 이메일 기반 회원가입 / 로그인
- 🔑 사용자별 AES 암호화 키로 비밀번호 암호화/복호화
- 👁️ 비밀번호 보기 / 숨기기 토글
- ❌ 저장된 비밀번호 개별 삭제
- 🌗 다크모드 / 라이트모드 전환
- 📱 반응형 UI (PC/모바일 지원)

---

## ⚙️ 기술 스택

| 항목       | 기술 |
|------------|------|
| 프론트엔드 | HTML, CSS, JavaScript (Vanilla) |
| 인증       | Firebase Authentication |
| 데이터베이스 | Firebase Firestore |
| 암호화     | CryptoJS (AES) |
| 배포       | GitHub Pages |

---

## 📁 프로젝트 구조

```
📦 password-notepad/
├── index.html             # 로그인 / 회원가입 화면
├── dashboard.html         # 비밀번호 관리 화면
├── style.css              # 스타일
├── firebase-config.js     # Firebase 설정
├── auth.js                # 로그인 / 회원가입 처리
├── passwordManager.js     # 비밀번호 저장/불러오기 + 암호화
├── toast.js               # 팝업 메시지 처리
├── darkmode.js            # 다크모드 전환 기능
└── README.md              # 설명 문서
```

---

## 🔐 암호화 방식

- 로그인 후 Firestore에서 `users/{uid}/encryptionKey` 불러옴
- 해당 키를 사용해 비밀번호를 **AES로 암호화**하여 저장
- 👁 버튼 클릭 시 해당 키로 복호화하여 표시

```js
// 암호화 저장
encryptPassword(plainText);

// 복호화 표시
decryptPassword(cipherText);
```

암호화 키는 사용자별로 생성되며 Firestore에 저장됩니다.

---

## 🔒 Firestore 보안 규칙 예시

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /users/{userId}/passwords/{docId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

이 규칙을 적용하면 **로그인한 사용자만 자신의 데이터에 접근**할 수 있습니다.

---

## 📮 라이선스 & 사용

이 프로젝트는 학습 및 비상업적 목적에 자유롭게 사용할 수 있습니다.  
상용 서비스를 위해 사용할 경우 백엔드 분리 및 키 보호 강화가 필요합니다.
