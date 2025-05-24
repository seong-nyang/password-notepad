let encryptionKey = "";


async function loadEncryptionKey() {
  const user = auth.currentUser;
  if (!user) return;

  const doc = await db.collection("users").doc(user.uid).get();
  const data = doc.data();

  if (data && data.encryptionKey) {
    encryptionKey = data.encryptionKey;
  } else {
    encryptionKey = generateRandomKey();
    await db.collection("users").doc(user.uid).set({ encryptionKey }, { merge: true });
  }
}

function generateRandomKey() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

function encryptPassword(plainText) {
  return CryptoJS.AES.encrypt(plainText, encryptionKey).toString();
}

function decryptPassword(cipherText) {
  const bytes = CryptoJS.AES.decrypt(cipherText, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

auth.onAuthStateChanged(async user => {
  if (!user) {
    location.href = "index.html";
  } else {
    await loadEncryptionKey(); // 🔐 암호화 키 로딩 후
    loadPasswords();           // 🔓 비밀번호 목록 불러오기
  }
});

const logoutBtn = document.getElementById("logout-btn");
logoutBtn.onclick = () => auth.signOut();

const saveForm = document.getElementById("save-form");
const site = document.getElementById("site");
const userid = document.getElementById("userid");
const userpw = document.getElementById("userpw");
const list = document.getElementById("password-list");

saveForm.onsubmit = async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  const encryptedPassword = encryptPassword(userpw.value);

  await db.collection("users").doc(user.uid).collection("passwords").add({
    site: site.value,
    userid: userid.value,
    password: encryptedPassword
  });

  showToast("저장 완료!");
  site.value = userid.value = userpw.value = "";
  loadPasswords();
};

function loadPasswords() {
  const user = auth.currentUser;
  if (!user) return;
  list.innerHTML = "";

  db.collection("users").doc(user.uid).collection("passwords")
    .get().then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        const row = document.createElement("div");
        row.className = "pw-row";

        row.innerHTML = `
          <div><strong>${data.site}</strong></div>
          <div>${data.userid}</div>
          <div><span class="pw" data-show="false">••••••</span></div>
          <div>
            <button class="eye-btn">👁️</button>
            <button class="delete-btn">❌</button>
          </div>
        `;

        const pwSpan = row.querySelector(".pw");
        const eyeBtn = row.querySelector(".eye-btn");
        eyeBtn.onclick = () => {
          const show = pwSpan.getAttribute("data-show") === "true";
          const decrypted = decryptPassword(data.password);
          pwSpan.textContent = show ? "••••••" : decrypted;
          pwSpan.setAttribute("data-show", !show);
        };

        row.querySelector(".delete-btn").onclick = () => {
          doc.ref.delete();
          row.remove();
          showToast("삭제 완료!");
        };

        list.appendChild(row);
      });
    });
}
