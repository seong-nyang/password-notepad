const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// 탭 전환
loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
});

signupTab.addEventListener("click", () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

// 로그인 처리
loginForm.onsubmit = (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!email || !password) {
    showToast("이메일과 비밀번호를 모두 입력해주세요.");
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => location.href = "dashboard.html")
    .catch((error) => {
      const message = getErrorMessage(error.code);
      showToast(message);
    });
};

// 회원가입 처리
signupForm.onsubmit = (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!email || !password) {
    showToast("이메일과 비밀번호를 입력해주세요.");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => showToast("회원가입 성공! 로그인 해주세요."))
    .catch((error) => {
      const message = getErrorMessage(error.code);
      showToast(message);
    });
};

// 에러 코드 변환
function getErrorMessage(code) {
  switch (code) {
    case "auth/invalid-email":
      return "유효하지 않은 이메일 형식입니다.";
    case "auth/user-disabled":
      return "비활성화된 계정입니다.";
    case "auth/user-not-found":
      return "등록되지 않은 이메일입니다.";
    case "auth/wrong-password":
      return "비밀번호가 틀렸습니다.";
    case "auth/email-already-in-use":
      return "이미 가입된 이메일입니다.";
    case "auth/weak-password":
      return "비밀번호는 6자 이상이어야 합니다.";
    case "auth/missing-email":
      return "이메일을 입력해주세요.";
    case "auth/missing-password":
      return "비밀번호를 입력해주세요.";
    default:
      return "오류가 발생했습니다. 다시 시도해주세요.";
  }
}
