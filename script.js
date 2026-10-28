const target = new Date("2026-11-02T08:00:00+07:00").getTime();
const countdownEl = document.getElementById("countdown");
let timer;

function updateCountdown() {
  const selisih = target - Date.now();

  if (selisih <= 0) {
    countdownEl.textContent = "Acara sedang berlangsung atau sudah selesai";
    clearInterval(timer);
    return;
  }

  const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
  const jam = Math.floor((selisih / (1000 * 60 * 60)) % 24);
  const menit = Math.floor((selisih / (1000 * 60)) % 60);
  const detik = Math.floor((selisih / 1000) % 60);

  document.getElementById("hari").textContent = hari;
  document.getElementById("jam").textContent = String(jam).padStart(2, "0");
  document.getElementById("menit").textContent = String(menit).padStart(2, "0");
  document.getElementById("detik").textContent = String(detik).padStart(2, "0");
}

if (countdownEl) {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
}

const btnBuka = document.getElementById("btnBuka");
if (btnBuka) {
  btnBuka.addEventListener("click", () => {
    sessionStorage.setItem("musicOn", "1");
  });
}

const audio = document.getElementById("bgMusic");
const btnMusic = document.getElementById("btnMusic");

if (audio && btnMusic) {
  const musicIcon = btnMusic.querySelector("i");

  function setMusicUI(isPlaying) {
    btnMusic.classList.toggle("active", isPlaying);
    musicIcon.className = isPlaying
      ? "bi bi-volume-up-fill"
      : "bi bi-volume-mute-fill";
  }

  btnMusic.addEventListener("click", () => {
    if (audio.paused) {
      audio
        .play()
        .then(() => setMusicUI(true))
        .catch(() => setMusicUI(false));
    } else {
      audio.pause();
      setMusicUI(false);
    }
  });

  if (sessionStorage.getItem("musicOn") === "1") {
    audio
      .play()
      .then(() => setMusicUI(true))
      .catch(() => setMusicUI(false));
  }
}

const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealEls.forEach((el) => observer.observe(el));
}
