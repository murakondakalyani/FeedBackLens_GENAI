const serverNode = document.getElementById("serverData");
const serverData = serverNode ? JSON.parse(serverNode.textContent) : null;

const demoData = {
    trends: { positive: 72, negative: 18, neutral: 10 },
    issues: { delivery: 38, quality: 24, service: 19, price: 12 },
    keywords: ["delivery", "quality", "refund", "packaging", "support"],
    insight: "Neural Engine forecast: prioritize delivery reliability, protect packaging quality, and convert positive product mentions into marketing proof."
};

const data = {
    trends: serverData?.trends || demoData.trends,
    issues: serverData?.issues || demoData.issues,
    keywords: serverData?.keywords || demoData.keywords,
    insight: serverData?.insight || demoData.insight
};

function initCursorGlow() {
    const glow = document.getElementById("cursorGlow");
    if (!glow) return;
    window.addEventListener("pointermove", (event) => {
        glow.style.opacity = "1";
        glow.style.transform = `translate(${event.clientX - 130}px, ${event.clientY - 130}px)`;
    });
    window.addEventListener("pointerleave", () => {
        glow.style.opacity = "0";
    });
}

function initParticles() {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const particles = [];
    const count = window.innerWidth < 760 ? 58 : 118;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();

    for (let i = 0; i < count; i += 1) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.8 + 0.5,
            vx: (Math.random() - 0.5) * 0.36,
            vy: (Math.random() - 0.5) * 0.36,
            hue: Math.random() > 0.5 ? "34, 211, 238" : "139, 92, 246"
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.hue}, 0.62)`;
            ctx.fill();

            for (let j = index + 1; j < particles.length; j += 1) {
                const q = particles[j];
                const distance = Math.hypot(p.x - q.x, p.y - q.y);
                if (distance < 126) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(34, 211, 238, ${0.14 * (1 - distance / 126)})`;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    draw();
}

function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function initWordRotator() {
    const target = document.getElementById("wordRotator");
    if (!target) return;
    const words = ["Reviews", "Complaints", "Trends", "Growth"];
    let index = 0;
    setInterval(() => {
        index = (index + 1) % words.length;
        if (window.gsap) {
            gsap.to(target, {
                y: -10,
                opacity: 0,
                duration: 0.22,
                onComplete: () => {
                    target.textContent = words[index];
                    gsap.fromTo(target, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28 });
                }
            });
        } else {
            target.textContent = words[index];
        }
    }, 1700);
}

function initTiltCards() {
    document.querySelectorAll(".tilt-card, .neural-stage").forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
            const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
            card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
}

function initUploadScanner() {
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("reviewFile");
    const fileName = document.getElementById("fileName");
    const scanState = document.getElementById("scanState");
    const scannerTitle = document.getElementById("scannerTitle");
    const form = document.getElementById("analysisForm");
    if (!dropZone || !fileInput) return;

    function setFile(file) {
        if (!file) return;
        fileName.textContent = file.name;
        scannerTitle.textContent = "Review signal locked";
        scanState.textContent = "Analyzing...";
        dropZone.classList.add("scanning");
        setTimeout(() => {
            scanState.textContent = "Ready to activate neural analysis";
        }, 900);
    }

    ["dragenter", "dragover"].forEach((eventName) => {
        dropZone.addEventListener(eventName, (event) => {
            event.preventDefault();
            dropZone.classList.add("dragover");
            scanState.textContent = "Drop to inject review data";
        });
    });
    ["dragleave", "drop"].forEach((eventName) => {
        dropZone.addEventListener(eventName, (event) => {
            event.preventDefault();
            dropZone.classList.remove("dragover");
        });
    });
    dropZone.addEventListener("drop", (event) => {
        const file = event.dataTransfer.files[0];
        if (!file) return;
        fileInput.files = event.dataTransfer.files;
        setFile(file);
    });
    fileInput.addEventListener("change", () => setFile(fileInput.files[0]));
    form?.addEventListener("submit", () => {
        dropZone.classList.add("scanning");
        scannerTitle.textContent = "Neural scan running";
        scanState.textContent = "Analyzing sentiment, issues, trends...";
    });
}

function animateRadials() {
    const trendTotal = Math.max((data.trends.positive || 0) + (data.trends.negative || 0) + (data.trends.neutral || 0), 1);
    document.querySelectorAll(".radial-meter").forEach((meter) => {
        let value = Number(meter.dataset.value || 0);
        if (meter.classList.contains("percent-meter")) {
            value = Math.round(((data.trends[meter.dataset.kind] || 0) / trendTotal) * 100);
        }
        const span = meter.querySelector("span");
        const start = performance.now();
        function frame(now) {
            const progress = Math.min((now - start) / 1200, 1);
            const current = Math.round(value * (1 - Math.pow(1 - progress, 3)));
            meter.style.setProperty("--value", `${current * 3.6}deg`);
            if (span) span.textContent = `${current}%`;
            if (progress < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    });
}

function initTyping() {
    const target = document.getElementById("homeTyping");
    if (!target) return;
    let index = 0;
    target.textContent = "";
    function tick() {
        target.textContent += data.insight.charAt(index);
        index += 1;
        if (index < data.insight.length) setTimeout(tick, 18);
    }
    tick();
}

function initCharts() {
    if (!window.Chart) return;
    Chart.defaults.color = "#95a4bd";
    Chart.defaults.font.family = "Inter, system-ui, sans-serif";
    const sentimentChart = document.getElementById("sentimentChart");
    const heatmapChart = document.getElementById("heatmapChart");
    const trendChart = document.getElementById("trendChart");
    const keywordChart = document.getElementById("keywordChart");
    const issueLabels = Object.keys(data.issues).map((label) => label.charAt(0).toUpperCase() + label.slice(1));
    const issueValues = Object.values(data.issues);

    if (sentimentChart) {
        new Chart(sentimentChart, {
            type: "doughnut",
            data: { labels: ["Positive", "Negative", "Neutral"], datasets: [{ data: [data.trends.positive || 0, data.trends.negative || 0, data.trends.neutral || 0], backgroundColor: ["#34d399", "#fb7185", "#60a5fa"], borderColor: "rgba(255,255,255,.12)", borderWidth: 2, hoverOffset: 16 }] },
            options: { responsive: true, maintainAspectRatio: false, cutout: "72%", plugins: { legend: { position: "bottom", labels: { usePointStyle: true, padding: 18 } } } }
        });
    }
    if (heatmapChart) {
        new Chart(heatmapChart, {
            type: "bar",
            data: { labels: issueLabels, datasets: [{ label: "Complaint intensity", data: issueValues, borderRadius: 16, backgroundColor: ["#22d3ee", "#8b5cf6", "#ec4899", "#f59e0b"] }] },
            options: { responsive: true, maintainAspectRatio: false, indexAxis: "y", plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, grid: { color: "rgba(148,163,184,.13)" } }, y: { grid: { display: false } } } }
        });
    }
    if (trendChart) {
        const positive = data.trends.positive || 72;
        const negative = data.trends.negative || 18;
        new Chart(trendChart, {
            type: "line",
            data: { labels: ["Scan 01", "Scan 02", "Scan 03", "Scan 04", "Scan 05", "Now"], datasets: [{ label: "Positive", data: [positive * .42, positive * .52, positive * .61, positive * .72, positive * .84, positive], borderColor: "#34d399", backgroundColor: "rgba(52,211,153,.12)", tension: .44, fill: true }, { label: "Negative", data: [negative * .92, negative * 1.05, negative * .82, negative * 1.16, negative * .94, negative], borderColor: "#fb7185", backgroundColor: "rgba(251,113,133,.1)", tension: .44, fill: true }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { usePointStyle: true, padding: 18 } } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: "rgba(148,163,184,.13)" } } } }
        });
    }
    if (keywordChart) {
        const labels = data.keywords.length ? data.keywords : demoData.keywords;
        new Chart(keywordChart, {
            type: "radar",
            data: { labels, datasets: [{ label: "Keyword pulse", data: labels.map((_, index) => 88 - index * 9), borderColor: "#22d3ee", pointBackgroundColor: "#ec4899", backgroundColor: "rgba(34,211,238,.14)" }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { r: { beginAtZero: true, grid: { color: "rgba(148,163,184,.16)" }, angleLines: { color: "rgba(148,163,184,.16)" }, pointLabels: { color: "#dbeafe" }, ticks: { display: false } } } }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initCursorGlow();
    initParticles();
    initReveal();
    initWordRotator();
    initTiltCards();
    initUploadScanner();
    animateRadials();
    initTyping();
    initCharts();
});
