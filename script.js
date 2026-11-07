
/* =========================
   NAMA TAMU UNDANGAN
========================= */

const urlParams = new URLSearchParams(window.location.search);

const guestName = urlParams.get("to");

const guestElement = document.getElementById("guestName");

if (guestElement && guestName && guestName.trim()) {
    guestElement.textContent = guestName.trim();
}


function openInvitation() {

    const music = document.getElementById("weddingMusic");

    if (!music) {
        window.location.href = "halaman-kedua.html";
        return;
    }

    music.play()
        .then(function () {

            // Musik berhasil dimulai
            sessionStorage.setItem("musicStarted", "true");

            // Buka halaman kedua
            window.location.href = "halaman-kedua.html";

        })
        .catch(function () {

            // Jika musik gagal diputar,
            // undangan tetap bisa dibuka
            window.location.href = "halaman-kedua.html";

        });

}


function continueWeddingMusic() {
    const music = document.getElementById("weddingMusic");

    if (!music) return;

    const musicStarted = sessionStorage.getItem("musicStarted");
    const savedTime = sessionStorage.getItem("musicTime");

    if (musicStarted === "true") {

        // Lanjutkan dari posisi lagu terakhir
        if (savedTime !== null) {
            music.currentTime = Number(savedTime);
        }

        // Putar musik kembali
        music.play().catch(function () {
            console.log("Musik perlu dimulai kembali.");
        });
    }

    // Simpan posisi lagu saat berpindah halaman
    window.addEventListener("beforeunload", function () {
        if (!music.paused) {
            sessionStorage.setItem(
                "musicTime",
                music.currentTime
            );
        }
    });
}


/* COUNTDOWN PERNIKAHAN */

// GANTI tanggal dan waktu sesuai hari pernikahan
const weddingDate = new Date("2026-12-04T08:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }

    if (distance <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (distance / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (distance / 1000) % 60
    );

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);


