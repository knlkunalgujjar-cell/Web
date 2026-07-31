// ==========================
// HACKER UI SCRIPT.JS
// ==========================

// ---------- Loading Screen ----------
window.onload = () => {
    const loader = document.getElementById("loader");
    const fill = document.getElementById("loaderFill");

    let p = 0;

    const load = setInterval(() => {
        p += 2;
        if (fill) fill.style.width = p + "%";

        if (p >= 100) {
            clearInterval(load);

            setTimeout(() => {
                if (loader) loader.style.display = "none";
            }, 300);
        }
    }, 25);
};

// ---------- Typing Animation ----------
const title = "LIKE DASHBOARD";
let i = 0;

function typing() {
    const typingEl = document.getElementById("typing");
    if (typingEl && i < title.length) {
        typingEl.innerHTML += title.charAt(i);
        i++;
        setTimeout(typing, 120);
    }
}

typing();

// ---------- Matrix Rain ----------
const canvas = document.getElementById("matrix");
if (canvas) {
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = "rgba(0,0,0,0.06)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff88";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(
                Math.floor(Math.random() * letters.length)
            );

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(drawMatrix, 35);

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ---------- Live Clock ----------
function clock() {
    const d = new Date();
    const t = d.toLocaleTimeString();
    const c = document.getElementById("clock");

    if (c) {
        c.innerHTML = t;
    }
}

setInterval(clock, 1000);
clock();

// ---------- Random Ping ----------
setInterval(() => {
    const ping = document.getElementById("ping");

    if (ping) {
        ping.innerHTML = Math.floor(Math.random() * 40 + 20) + " ms";
    }
}, 1500);

// ---------- Terminal Log ----------
const logs = [
    "Initializing...",
    "Connecting Server...",
    "Authentication Success...",
    "Security Bypass OK...",
    "Ready...",
    "System Stable..."
];

let logIndex = 0;

setInterval(() => {
    const box = document.getElementById("terminalLog");

    if (!box) return;

    const p = document.createElement("p");
    p.innerHTML = "&gt; " + logs[logIndex];

    box.appendChild(p);

    if (box.children.length > 8) {
        box.removeChild(box.children[0]);
    }

    logIndex++;

    if (logIndex >= logs.length) logIndex = 0;
}, 1800);

// ---------- Main Dynamic Progress & API Request Handler ----------
const btn = document.getElementById("sendBtn");

if (btn) {
    btn.addEventListener("click", async () => {
        const uidInput = document.getElementById("uid") ? document.getElementById("uid").value.trim() : "";
        const serverInput = document.getElementById("server");
        const server = serverInput ? serverInput.value : "IND";

        // Numeric UID Validation Check
        if (!uidInput || isNaN(uidInput)) {
            alert("❌ UID numeric honi chahiye.");
            return;
        }

        const bar = document.getElementById("bar");
        const status = document.getElementById("statusText");
        const result = document.getElementById("result");

        if (result) result.style.display = "none";
        btn.disabled = true;

        const sleep = ms => new Promise(res => setTimeout(res, ms));

        try {
            // Step 1: Connecting
            if (bar) bar.style.width = "15%";
            if (status) status.innerText = "⚡ Connecting to Server...";
            await sleep(500);

            // Step 2: Fetching
            if (bar) bar.style.width = "40%";
            if (status) status.innerText = "🔍 Fetching Player Details...";
            await sleep(500);

            // Step 3: Injecting Likes
            if (bar) bar.style.width = "75%";
            if (status) status.innerText = "❤️ Injecting Likes...";

            // API Request
            const res = await fetch(`/like?uid=${encodeURIComponent(uidInput)}&server_name=${encodeURIComponent(server)}&key=JMLB`);
            const data = await res.json();

            // Step 4: Verifying
            if (bar) bar.style.width = "95%";
            if (status) status.innerText = "🚀 Verifying Transaction...";
            await sleep(400);

            // Handle API Errors
            if (res.status !== 200 || data.error || data.status === 0) {
                if (bar) bar.style.width = "0%";
                const errMsg = data.error || "API Response Error";
                if (status) status.innerText = "❌ " + errMsg;
                alert("❌ Error: " + errMsg);
                return;
            }

            // Step 5: Finalizing
            if (bar) bar.style.width = "100%";
            if (status) status.innerText = "✨ Finalizing Task... Completed!";
            await sleep(300);

            // Populate Result
            const nameEl = document.getElementById("name");
            const uidEl = document.getElementById("playeruid");
            const serverEl = document.getElementById("resServer");
            const beforeEl = document.getElementById("before");
            const addedEl = document.getElementById("added");
            const afterEl = document.getElementById("after");
            const remainEl = document.getElementById("remain");

            if (nameEl) nameEl.innerText = data.PlayerNickname || "N/A";
            if (uidEl) uidEl.innerText = data.UID || uidInput;
            if (serverEl) serverEl.innerText = server;
            if (beforeEl) beforeEl.innerText = data.LikesbeforeCommand || "0";
            if (addedEl) addedEl.innerText = "+" + (data.LikesGivenByAPI || "0");
            if (afterEl) afterEl.innerText = data.LikesafterCommand || "0";
            if (remainEl) remainEl.innerText = data.remains || "0";

            if (result) result.style.display = "block";

        } catch (e) {
            if (bar) bar.style.width = "0%";
            if (status) status.innerText = "❌ Server Error";
            alert("❌ Server Connection Error!");
        } finally {
            btn.disabled = false;
        }
    });
}
