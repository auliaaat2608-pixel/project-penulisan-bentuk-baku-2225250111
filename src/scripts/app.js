
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. PENGATURAN DAN PENYIMPANAN DATA
    // ==========================================

    const app = document.getElementById("app");

    if (!app) {
        console.error("Elemen #app tidak ditemukan.");
        return;
    }

    const KEY_NAMA = "mathlearnNickname";
    const KEY_LEVEL = "mathlearnUnlockedLevel";
    const KEY_SELESAI = "mathlearnCompletedLevels";
    const KEY_NILAI = "mathlearnBestScores";

    const KEY_PUZZLE_LEVEL = "mathlearnPuzzleUnlocked";
    const KEY_PUZZLE_SELESAI = "mathlearnPuzzleCompleted";

    let nickname = localStorage.getItem(KEY_NAMA) || "";

    let unlockedLevel = Number(localStorage.getItem(KEY_LEVEL) || 0);
    let completedLevels = readArray(KEY_SELESAI);
    let bestScores = readObject(KEY_NILAI);

    let puzzleUnlocked = Number(localStorage.getItem(KEY_PUZZLE_LEVEL) || 0);
    let puzzleCompleted = readArray(KEY_PUZZLE_SELESAI);

    function readArray(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(value) ? value : [];
        } catch {
            return [];
        }
    }

    function readObject(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "{}");
            return value && typeof value === "object" && !Array.isArray(value)
                ? value
                : {};
        } catch {
            return {};
        }
    }

    function saveProgress() {
        localStorage.setItem(KEY_LEVEL, String(unlockedLevel));
        localStorage.setItem(KEY_SELESAI, JSON.stringify(completedLevels));
        localStorage.setItem(KEY_NILAI, JSON.stringify(bestScores));

        localStorage.setItem(KEY_PUZZLE_LEVEL, String(puzzleUnlocked));
        localStorage.setItem(KEY_PUZZLE_SELESAI, JSON.stringify(puzzleCompleted));
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }[character];
        });
    }

    // ==========================================
    // 2. DATA LATIHAN SOAL
    // ==========================================

    const levels = [
        {
            name: "Level 1 - Pemula",
            questions: [
                {
                    question: "Bentuk baku dari 5.000 adalah ...",
                    choices: [
                        "5 × 10³",
                        "5 × 10²",
                        "5 × 10⁴",
                        "5 × 10⁵"
                    ],
                    answer: 0,
                    hint: "Perhatikan berapa tempat koma bergeser ke kiri.",
                    explanation: "5.000 = 5 × 1.000 = 5 × 10³. Jadi, pangkatnya adalah 3."
                },
                {
                    question: "Bentuk baku dari 72.000 adalah ...",
                    choices: [
                        "7,2 × 10³",
                        "7,2 × 10⁴",
                        "7,2 × 10⁵",
                        "72 × 10³"
                    ],
                    answer: 1,
                    hint: "Ubah 72.000 menjadi 7,2 terlebih dahulu.",
                    explanation: "72.000 = 7,2 × 10⁴. Koma bergeser empat tempat ke kiri."
                },
                {
                    question: "Bentuk baku dari 0,004 adalah ...",
                    choices: [
                        "4 × 10⁻²",
                        "4 × 10⁻³",
                        "4 × 10³",
                        "4 × 10⁻⁴"
                    ],
                    answer: 1,
                    hint: "Bilangan kecil memiliki pangkat negatif.",
                    explanation: "0,004 = 4 × 10⁻³. Koma bergeser tiga tempat ke kanan."
                },
                {
                    question: "Bilangan 3,5 × 10² sama dengan ...",
                    choices: [
                        "35",
                        "350",
                        "3.500",
                        "35.000"
                    ],
                    answer: 1,
                    hint: "Pangkat positif berarti koma bergeser ke kanan.",
                    explanation: "3,5 × 100 = 350."
                }
            ]
        },
        {
            name: "Level 2 - Menengah",
            questions: [
                {
                    question: "Bentuk baku dari 625.000 adalah ...",
                    choices: [
                        "6,25 × 10⁴",
                        "6,25 × 10⁵",
                        "62,5 × 10⁴",
                        "6,25 × 10⁶"
                    ],
                    answer: 1,
                    hint: "Angka di depan harus lebih besar atau sama dengan 1 dan kurang dari 10.",
                    explanation: "625.000 = 6,25 × 10⁵."
                },
                {
                    question: "Bentuk baku dari 0,00056 adalah ...",
                    choices: [
                        "5,6 × 10⁻³",
                        "5,6 × 10⁻⁴",
                        "5,6 × 10⁻⁵",
                        "56 × 10⁻⁴"
                    ],
                    answer: 1,
                    hint: "Hitung jumlah pergeseran koma sampai menjadi 5,6.",
                    explanation: "0,00056 = 5,6 × 10⁻⁴."
                },
                {
                    question: "Nilai dari (2 × 10³) × (3 × 10²) adalah ...",
                    choices: [
                        "6 × 10⁵",
                        "5 × 10⁶",
                        "6 × 10¹",
                        "6 × 10⁶"
                    ],
                    answer: 0,
                    hint: "Kalikan angka depan dan jumlahkan pangkat.",
                    explanation: "(2 × 3) × 10⁽³⁺²⁾ = 6 × 10⁵."
                },
                {
                    question: "Nilai dari (8 × 10⁶) ÷ (2 × 10²) adalah ...",
                    choices: [
                        "4 × 10⁸",
                        "4 × 10⁴",
                        "6 × 10⁴",
                        "4 × 10³"
                    ],
                    answer: 1,
                    hint: "Bagi angka depan dan kurangkan pangkat.",
                    explanation: "(8 ÷ 2) × 10⁽⁶⁻²⁾ = 4 × 10⁴."
                }
            ]
        },
        {
            name: "Level 3 - Mahir",
            questions: [
                {
                    question: "Hasil dari (4 × 10⁵) × (2 × 10³) adalah ...",
                    choices: [
                        "8 × 10⁸",
                        "6 × 10⁸",
                        "8 × 10²",
                        "8 × 10¹⁵"
                    ],
                    answer: 0,
                    hint: "Kalikan 4 dengan 2, kemudian jumlahkan 5 dan 3.",
                    explanation: "(4 × 2) × 10⁽⁵⁺³⁾ = 8 × 10⁸."
                },
                {
                    question: "Hasil dari (9 × 10⁷) ÷ (3 × 10²) adalah ...",
                    choices: [
                        "3 × 10⁹",
                        "3 × 10⁵",
                        "6 × 10⁵",
                        "3 × 10⁴"
                    ],
                    answer: 1,
                    hint: "9 dibagi 3, lalu 7 dikurangi 2.",
                    explanation: "(9 ÷ 3) × 10⁽⁷⁻²⁾ = 3 × 10⁵."
                },
                {
                    question: "Bentuk biasa dari 4,25 × 10⁴ adalah ...",
                    choices: [
                        "425",
                        "4.250",
                        "42.500",
                        "425.000"
                    ],
                    answer: 2,
                    hint: "Geser koma empat tempat ke kanan.",
                    explanation: "4,25 × 10⁴ = 42.500."
                },
                {
                    question: "Bentuk biasa dari 7,2 × 10⁻³ adalah ...",
                    choices: [
                        "0,072",
                        "0,0072",
                        "0,00072",
                        "720"
                    ],
                    answer: 1,
                    hint: "Pangkat negatif membuat koma bergeser ke kiri.",
                    explanation: "7,2 × 10⁻³ = 0,0072."
                }
            ]
        },
        {
            name: "Level 4 - Tantangan",
            questions: [
                {
                    question: "Hasil dari (3 × 10⁴) × (5 × 10⁻²) adalah ...",
                    choices: [
                        "15 × 10²",
                        "8 × 10²",
                        "15 × 10⁶",
                        "15 × 10⁻⁶"
                    ],
                    answer: 0,
                    hint: "Kalikan angka depan dan jumlahkan pangkatnya.",
                    explanation: "15 × 10². Dalam bentuk baku yang sudah disederhanakan, hasilnya 1,5 × 10³."
                },
                {
                    question: "Hasil dari (6 × 10⁵) ÷ (2 × 10³) adalah ...",
                    choices: [
                        "3 × 10²",
                        "4 × 10²",
                        "3 × 10⁸",
                        "3 × 10³"
                    ],
                    answer: 0,
                    hint: "6 dibagi 2, kemudian 5 dikurangi 3.",
                    explanation: "(6 ÷ 2) × 10⁽⁵⁻³⁾ = 3 × 10²."
                },
                {
                    question: "Bentuk baku dari 0,0000081 adalah ...",
                    choices: [
                        "8,1 × 10⁻⁵",
                        "8,1 × 10⁻⁶",
                        "8,1 × 10⁻⁷",
                        "81 × 10⁻⁶"
                    ],
                    answer: 1,
                    hint: "Ubah bilangan menjadi 8,1 terlebih dahulu.",
                    explanation: "0,0000081 = 8,1 × 10⁻⁶."
                },
                {
                    question: "Sebuah jarak adalah 3,2 × 10⁵ meter. Bentuk biasanya adalah ...",
                    choices: [
                        "32.000 meter",
                        "320.000 meter",
                        "3.200.000 meter",
                        "3.200 meter"
                    ],
                    answer: 1,
                    hint: "Geser koma lima tempat ke kanan.",
                    explanation: "3,2 × 100.000 = 320.000 meter."
                }
            ]
        }
    ];

    // ==========================================
    // 3. HALAMAN WELCOME
    // ==========================================

    function showWelcome() {
        app.innerHTML = `
            <div class="welcome-container">
                <div class="welcome-card">

                    <img
                        src="public/images/maskot-mathlearn.png"
                        alt="Maskot MathLearn"
                        class="welcome-mascot"
                    >

                    <h1>MathLearn 🌸</h1>
                    <p class="subtitle">
                        Belajar matematika dengan cara menyenangkan!
                    </p>

                    <h2>Halo, Teman Belajar! 💜</h2>
                    <p>Masukkan nama panggilanmu untuk memulai.</p>

                    <form id="nickname-form">
                        <label for="nickname">Nama panggilan</label>
                        <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            placeholder="Contoh: Aulia"
                            maxlength="25"
                            required
                        >
                        <button type="submit">Mulai Belajar ✨</button>
                    </form>

                    <p class="footer-text">
                        Petualangan matematika dimulai dari sini!
                    </p>
                </div>
            </div>
        `;
    }

    // ==========================================
    // 4. HALAMAN DASHBOARD
    // ==========================================

    function showHomePage() {
        app.innerHTML = `
            <div class="dashboard-container">

                <header class="dashboard-header">
                    <div class="dashboard-greeting">
                        <span class="greeting-label">
                            SELAMAT DATANG DI
                        </span>
                        <h1>MathLearn 🌸</h1>
                        <p>Halo, ${escapeHTML(nickname)}! 💜</p>
                    </div>

                    <img
                        src="public/images/maskot-mathlearn.png"
                        alt="Maskot Kucing MathLearn"
                        class="dashboard-mascot"
                    >
                </header>

                <section class="dashboard-hero">
                    <span class="hero-label">
                        ✨ Ayo Belajar Bersama!
                    </span>
                    <h2>Petualangan Matematika Dimulai!</h2>
                    <p>
                        Pelajari Penulisan Bentuk Baku dengan cara
                        yang menyenangkan dan interaktif.
                    </p>
                    <div class="hero-decoration">📚 ✏️ 🔢</div>
                </section>

                <section class="dashboard-menu">
                    <h2>Menu Pembelajaran</h2>
                    <p class="menu-description">
                        Pilih kegiatan yang ingin kamu lakukan.
                    </p>

                    <div class="menu-grid">

                        <button class="menu-item material-item"
                            data-action="material">
                            <span class="menu-icon">📖</span>
                            <span class="menu-title">Materi</span>
                            <span class="menu-info">
                                Pelajari bentuk baku
                            </span>
                            <span class="menu-arrow">→</span>
                        </button>

                        <button class="menu-item practice-item"
                            data-action="practice">
                            <span class="menu-icon">✏️</span>
                            <span class="menu-title">Latihan Soal</span>
                            <span class="menu-info">
                                Uji pemahamanmu
                            </span>
                            <span class="menu-arrow">→</span>
                        </button>

                        <button class="menu-item game-item"
                            data-action="game">
                            <span class="menu-icon">🧩</span>
                            <span class="menu-title">Permainan</span>
                            <span class="menu-info">
                                Susun puzzle matematika
                            </span>
                            <span class="menu-arrow">→</span>
                        </button>

                        <button class="menu-item progress-item"
                            data-action="progress">
                            <span class="menu-icon">🏆</span>
                            <span class="menu-title">Progres Belajar</span>
                            <span class="menu-info">
                                Lihat pencapaianmu
                            </span>
                            <span class="menu-arrow">→</span>
                        </button>

                    </div>
                </section>

                <div class="dashboard-footer">
                    <button class="change-name-button"
                        data-action="change-name">
                        ⚙️ Ganti Nama Panggilan
                    </button>

                    <p>
                        Belajar sedikit demi sedikit,
                        menjadi hebat setiap hari! 💜
                    </p>
                    <small>MathLearn © 2026</small>
                </div>

            </div>
        `;
    }

    // ==========================================
    // 5. HALAMAN MATERI
    // ==========================================

    function showMaterial() {
        app.innerHTML = `
            <div class="material-container">

                <header class="material-header">
                    <button class="material-back" data-action="home">
                        ← Beranda
                    </button>

                    <div class="material-heading">
                        <span>📚 RUANG BELAJAR MATHLEARN</span>
                        <h1>Penulisan Bentuk Baku</h1>
                        <p>Yuk, belajar matematika bersama! 💜</p>
                    </div>

                    <img
                        src="public/images/maskot-mathlearn.png"
                        alt="Maskot MathLearn"
                        class="material-mascot"
                    >
                </header>

                <main class="material-content">

                    <section class="material-card definition-card">
                        <span class="material-number">01</span>
                        <h2>🌸 Pengertian Bentuk Baku</h2>
                        <p>
                            Bentuk baku adalah cara menuliskan bilangan
                            yang sangat besar atau sangat kecil dengan
                            menggunakan perpangkatan 10.
                        </p>
                    </section>

                    <section class="material-card formula-card">
                        <span class="material-number">02</span>
                        <h2>✨ Bentuk Umum</h2>
                        <div class="formula-box">a × 10ⁿ</div>
                        <p>
                            Dengan ketentuan:
                            <strong>1 ≤ a &lt; 10</strong> dan
                            <strong>n</strong> merupakan bilangan bulat.
                        </p>
                    </section>

                    <section class="material-card large-number-card">
                        <span class="material-number">03</span>
                        <h2>🔢 Bilangan Besar</h2>
                        <div class="example-box">
                            <p>Contoh bilangan:</p>
                            <h3>45.000</h3>
                            <div class="formula-box">
                                45.000 = 4,5 × 10⁴
                            </div>
                        </div>
                        <p>
                            Koma digeser empat tempat ke kiri
                            sehingga pangkatnya positif.
                        </p>
                    </section>

                    <section class="material-card small-number-card">
                        <span class="material-number">04</span>
                        <h2>🪄 Bilangan Kecil</h2>
                        <div class="example-box">
                            <p>Contoh bilangan:</p>
                            <h3>0,00032</h3>
                            <div class="formula-box">
                                0,00032 = 3,2 × 10⁻⁴
                            </div>
                        </div>
                        <p>
                            Koma digeser empat tempat ke kanan
                            sehingga pangkatnya negatif.
                        </p>
                    </section>

                    <section class="material-card multiplication-card">
                        <span class="material-number">05</span>
                        <h2>✖️ Operasi Perkalian</h2>
                        <div class="calculation-box">
                            <p>(2 × 10³) × (3 × 10²)</p>
                            <p>= (2 × 3) × 10⁽³⁺²⁾</p>
                            <h3>= 6 × 10⁵</h3>
                        </div>
                        <p>
                            Kalikan angka di depan, kemudian
                            jumlahkan pangkatnya.
                        </p>
                    </section>

                    <section class="material-card division-card">
                        <span class="material-number">06</span>
                        <h2>➗ Operasi Pembagian</h2>
                        <div class="calculation-box">
                            <p>(8 × 10⁶) ÷ (2 × 10²)</p>
                            <p>= (8 ÷ 2) × 10⁽⁶⁻²⁾</p>
                            <h3>= 4 × 10⁴</h3>
                        </div>
                        <p>
                            Bagi angka di depan, kemudian
                            kurangkan pangkatnya.
                        </p>
                    </section>

                </main>

                <footer class="material-footer">
                    <p>🌷 Hebat! Terus semangat belajar!</p>
                    <button data-action="home">
                        Kembali ke Beranda
                    </button>
                </footer>

            </div>
        `;
    }

    // ==========================================
    // 6. HALAMAN PILIHAN LEVEL LATIHAN
    // ==========================================

    function showPractice() {
        const levelCards = levels.map(function (level, index) {
            const isUnlocked = index <= unlockedLevel;
            const isCompleted = completedLevels.includes(index);

            return `
                <div class="practice-level-card level-color-${index + 1}">
                    <div class="practice-level-icon">
                        ${
                            index === 0 ? "🌱" :
                            index === 1 ? "🌷" :
                            index === 2 ? "⭐" : "👑"
                        }
                    </div>

                    <h3>${level.name}</h3>

                    <div class="practice-status ${
                        isCompleted ? "status-completed" :
                        isUnlocked ? "status-unlocked" : "status-locked"
                    }">
                        ${
                            isCompleted ? "✓ Selesai" :
                            isUnlocked ? "🔓 Terbuka" : "🔒 Terkunci"
                        }
                    </div>

                    <p>📝 4 soal latihan</p>

                    <button
                        class="practice-level-button"
                        data-action="start-level"
                        data-level="${index}"
                        ${isUnlocked ? "" : "disabled"}
                    >
                        ${
                            isUnlocked
                            ? "Mulai Belajar →"
                            : "Selesaikan Level Sebelumnya"
                        }
                    </button>
                </div>
            `;
        }).join("");

        app.innerHTML = `
            <div class="practice-container">

                <header class="practice-header">
                    <button data-action="home" class="practice-back">
                        ← Beranda
                    </button>

                    <div class="practice-heading">
                        <span>✏️ RUANG LATIHAN</span>
                        <h1>Latihan Soal MathLearn</h1>
                        <p>
                            Yuk, asah kemampuanmu dalam Penulisan Bentuk Baku!
                        </p>
                    </div>

                    <img
                        src="public/images/maskot-mathlearn.png"
                        alt="Maskot MathLearn"
                        class="practice-mascot"
                    >
                </header>

                <section class="practice-intro">
                    <h2>🌸 Pilih Level Tantanganmu</h2>
                    <p>
                        Selesaikan semua soal pada setiap level
                        untuk membuka tantangan berikutnya.
                    </p>
                </section>

                <div class="practice-level-list">
                    ${levelCards}
                </div>

                <div class="practice-footer">
                    <p>
                        💜 Jangan takut salah, karena setiap kesalahan
                        adalah kesempatan belajar!
                    </p>
                    <button data-action="home">
                        Kembali ke Beranda
                    </button>
                </div>

            </div>
        `;
    }

    // ==========================================
    // 7. PROSES LATIHAN SOAL
    // ==========================================

    let currentPracticeLevel = 0;
    let currentQuestionIndex = 0;
    let practiceScore = 0;
    let practiceAttempt = 0;
    let practiceFeedbackVisible = false;

    function startPracticeLevel(levelIndex) {
        currentPracticeLevel = levelIndex;
        currentQuestionIndex = 0;
        practiceScore = 0;
        practiceAttempt = 0;
        practiceFeedbackVisible = false;

        showPracticeQuestion();
    }

    function showPracticeQuestion() {
        const level = levels[currentPracticeLevel];
        const question = level.questions[currentQuestionIndex];

        const choices = question.choices.map(function (choice, index) {
            return `
                <button
                    class="answer-option"
                    data-action="answer-practice"
                    data-answer="${index}"
                    ${practiceFeedbackVisible ? "disabled" : ""}
                >
                    <span>${String.fromCharCode(65 + index)}.</span>
                    ${choice}
                </button>
            `;
        }).join("");

        app.innerHTML = `
            <div class="question-container">

                <div class="question-header">
                    <button data-action="practice-menu">
                        ← Daftar Level
                    </button>
                    <p>${level.name}</p>
                    <p>
                        Soal ${currentQuestionIndex + 1}
                        dari ${level.questions.length}
                    </p>
                </div>

                <div class="question-progress">
                    <div style="width: ${
                        ((currentQuestionIndex + 1) / level.questions.length) * 100
                    }%"></div>
                </div>

                <section class="question-card">
                    <img
                        src="public/images/maskot-mathlearn.png"
                        alt="Maskot MathLearn"
                        class="question-mascot"
                    >

                    <h2>📝 Soal Latihan</h2>
                    <p class="question-text">
                        ${question.question}
                    </p>

                    <div class="answer-list">
                        ${choices}
                    </div>

                    <div id="practice-feedback"></div>
                </section>

            </div>
        `;
    }

    function answerPractice(selectedAnswer) {
        if (practiceFeedbackVisible) return;

        const question = levels[currentPracticeLevel]
            .questions[currentQuestionIndex];

        const feedback = document.getElementById("practice-feedback");

        if (selectedAnswer === question.answer) {
            practiceScore += 25;
            practiceFeedbackVisible = true;

            feedback.innerHTML = `
                <div class="feedback-correct">
                    <h3>🎉 Jawaban Benar!</h3>
                    <p>${question.explanation}</p>
                    <button data-action="next-practice">
                        ${currentQuestionIndex === 3
                            ? "Lihat Hasil Level"
                            : "Soal Berikutnya →"}
                    </button>
                </div>
            `;

        } else {
            practiceAttempt++;

            if (practiceAttempt === 1) {
                feedback.innerHTML = `
                    <div class="feedback-hint">
                        <h3>Belum tepat, coba lagi! 🌷</h3>
                        <p>Petunjuk: ${question.hint}</p>
                        <button data-action="retry-practice">
                            Coba Lagi
                        </button>
                    </div>
                `;
            } else {
                practiceFeedbackVisible = true;

                feedback.innerHTML = `
                    <div class="feedback-wrong">
                        <h3>Belum berhasil, tidak apa-apa! 💜</h3>
                        <p><strong>Pembahasan:</strong> ${question.explanation}</p>
                        <button data-action="next-practice">
                            ${currentQuestionIndex === 3
                                ? "Lihat Hasil Level"
                                : "Soal Berikutnya →"}
                        </button>
                    </div>
                `;
            }
        }
    }

    function nextPracticeQuestion() {
        if (!practiceFeedbackVisible) return;

        if (currentQuestionIndex < 3) {
            currentQuestionIndex++;
            practiceAttempt = 0;
            practiceFeedbackVisible = false;
            showPracticeQuestion();
        } else {
            finishPracticeLevel();
        }
    }

    function retryPracticeQuestion() {
        practiceAttempt = 0;
        showPracticeQuestion();
    }

    function finishPracticeLevel() {
        const levelNumber = currentPracticeLevel + 1;
        const key = String(levelNumber);

        if (!completedLevels.includes(currentPracticeLevel)) {
            completedLevels.push(currentPracticeLevel);
        }

        if (bestScores[key] === undefined || practiceScore > bestScores[key]) {
            bestScores[key] = practiceScore;
        }

        if (currentPracticeLevel < levels.length - 1) {
            unlockedLevel = Math.max(unlockedLevel, currentPracticeLevel + 1);
        }

        saveProgress();

        app.innerHTML = `
            <div class="result-container">
                <div class="result-card">
                    <img
                        src="public/images/maskot-mathlearn.png"
                        alt="Maskot MathLearn"
                        class="result-mascot"
                    >

                    <h1>🎉 Level Selesai!</h1>
                    <h2>${levels[currentPracticeLevel].name}</h2>

                    <div class="result-score">
                        ${practiceScore} / 100
                    </div>

                    <p>
                        Jawaban benar berdasarkan percobaan pertama:
                        ${practiceScore / 25} dari 4 soal.
                    </p>

                    <p>
                        ${
                            currentPracticeLevel < levels.length - 1
                            ? "Level berikutnya berhasil dibuka! 🔓"
                            : "Selamat! Kamu sudah menyelesaikan semua level latihan!"
                        }
                    </p>

                    <button data-action="practice-menu">
                        Kembali ke Daftar Level
                    </button>

                    <button data-action="home">
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        `;
    }

    // ==========================================
    // 8. DATA PERMAINAN PUZZLE
    // ==========================================

    const puzzleLevels = [
        {
            name: "Puzzle Level 1 - Pemula",
            questions: [
                {
                    prompt: "Susun bentuk baku dari 3.000.",
                    pieces: ["3", "× 10", "³"],
                    hint: "3.000 sama dengan 3 dikali 1.000.",
                    explanation: "3.000 = 3 × 10³."
                },
                {
                    prompt: "Susun bentuk baku dari 40.000.",
                    pieces: ["4", "× 10", "⁴"],
                    hint: "Ubah 40.000 menjadi 4 terlebih dahulu.",
                    explanation: "40.000 = 4 × 10⁴."
                },
                {
                    prompt: "Susun bentuk baku dari 0,005.",
                    pieces: ["5", "× 10", "⁻³"],
                    hint: "Bilangan kecil menggunakan pangkat negatif.",
                    explanation: "0,005 = 5 × 10⁻³."
                },
                {
                    prompt: "Susun bentuk biasa dari 2 × 10³.",
                    pieces: ["2.000", "=", "2 × 10³"],
                    hint: "Pangkat positif menggeser koma ke kanan.",
                    explanation: "2 × 10³ = 2.000."
                }
            ]
        },
        {
            name: "Puzzle Level 2 - Menengah",
            questions: [
                {
                    prompt: "Susun bentuk baku dari 56.000.",
                    pieces: ["5,6", "× 10", "⁴"],
                    hint: "Angka depannya harus antara 1 dan kurang dari 10.",
                    explanation: "56.000 = 5,6 × 10⁴."
                },
                {
                    prompt: "Susun bentuk baku dari 0,0008.",
                    pieces: ["8", "× 10", "⁻⁴"],
                    hint: "Koma harus digeser empat tempat ke kanan.",
                    explanation: "0,0008 = 8 × 10⁻⁴."
                },
                {
                    prompt: "Susun hasil perkalian (2 × 10³) × (4 × 10²).",
                    pieces: ["8", "× 10", "⁵"],
                    hint: "Kalikan 2 dan 4, lalu jumlahkan 3 dan 2.",
                    explanation: "(2 × 4) × 10⁽³⁺²⁾ = 8 × 10⁵."
                },
                {
                    prompt: "Susun hasil pembagian (6 × 10⁵) ÷ (2 × 10²).",
                    pieces: ["3", "× 10", "³"],
                    hint: "Bagi 6 dengan 2 dan kurangkan 5 dengan 2.",
                    explanation: "(6 ÷ 2) × 10⁽⁵⁻²⁾ = 3 × 10³."
                }
            ]
        },
        {
            name: "Puzzle Level 3 - Mahir",
            questions: [
                {
                    prompt: "Susun bentuk baku dari 725.000.",
                    pieces: ["7,25", "× 10", "⁵"],
                    hint: "Geser koma sampai angka depannya 7,25.",
                    explanation: "725.000 = 7,25 × 10⁵."
                },
                {
                    prompt: "Susun bentuk baku dari 0,000045.",
                    pieces: ["4,5", "× 10", "⁻⁵"],
                    hint: "Bilangan kecil memiliki pangkat negatif.",
                    explanation: "0,000045 = 4,5 × 10⁻⁵."
                },
                {
                    prompt: "Susun hasil perkalian (3 × 10⁴) × (2 × 10²).",
                    pieces: ["6", "× 10", "⁶"],
                    hint: "Kalikan 3 dan 2, kemudian jumlahkan pangkat.",
                    explanation: "(3 × 2) × 10⁽⁴⁺²⁾ = 6 × 10⁶."
                },
                {
                    prompt: "Susun hasil pembagian (8 × 10⁷) ÷ (4 × 10³).",
                    pieces: ["2", "× 10", "⁴"],
                    hint: "Bagi 8 dengan 4, lalu kurangkan pangkatnya.",
                    explanation: "(8 ÷ 4) × 10⁽⁷⁻³⁾ = 2 × 10⁴."
                }
            ]
        }
    ];

    // ==========================================
    // 9. HALAMAN PILIHAN LEVEL PUZZLE
    // ==========================================

    function showGame() {
        const cards = puzzleLevels.map(function (level, index) {
            const isUnlocked = index <= puzzleUnlocked;
            const isCompleted = puzzleCompleted.includes(index);

            return `
                <div class="puzzle-level-card">
                    <div class="puzzle-level-icon">
                        ${index === 0 ? "🧩" : index === 1 ? "🌟" : "👑"}
                    </div>

                    <h3>${level.name}</h3>

                    <p>
                        ${
                            isCompleted ? "✅ Selesai" :
                            isUnlocked ? "🔓 Terbuka" : "🔒 Terkunci"
                        }
                    </p>

                    <p>4 tantangan puzzle</p>

                    <button
                        data-action="start-puzzle"
                        data-level="${index}"
                        ${isUnlocked ? "" : "disabled"}
                    >
                        ${isUnlocked ? "Mainkan Puzzle" : "Selesaikan Level Sebelumnya"}
                    </button>
                </div>
            `;
        }).join("");

        app.innerHTML = `
            <div class="game-container">

                <header class="game-header">
                    <button data-action="home">← Beranda</button>

                    <img
                        src="public/images/maskot-mathlearn.png"
                        alt="Maskot MathLearn"
                        class="game-mascot"
                    >

                    <h1>🧩 Puzzle MathLearn</h1>
                    <p>
                        Susun potongan jawaban untuk menyelesaikan
                        tantangan matematika!
                    </p>
                </header>

                <section class="puzzle-level-list">
                    ${cards}
                </section>

                <button data-action="home">
                    Kembali ke Beranda
                </button>

            </div>
        `;
    }

    // ==========================================
    // 10. PROSES PERMAINAN PUZZLE
    // ==========================================

    let currentPuzzleLevel = 0;
    let currentPuzzleQuestion = 0;
    let puzzleScore = 0;
    let puzzleSlots = [];
    let selectedPiece = null;
    let puzzleFeedbackVisible = false;

    function startPuzzle(levelIndex) {
        currentPuzzleLevel = levelIndex;
        currentPuzzleQuestion = 0;
        puzzleScore = 0;
        showPuzzleQuestion();
    }

    function showPuzzleQuestion() {
        const level = puzzleLevels[currentPuzzleLevel];
        const question = level.questions[currentPuzzleQuestion];

        puzzleSlots = new Array(question.pieces.length).fill(null);
        selectedPiece = null;
        puzzleFeedbackVisible = false;

        const shuffled = question.pieces
            .map(function (piece, index) {
                return { piece: piece, originalIndex: index };
            })
            .sort(function () {
                return Math.random() - 0.5;
            });

        const tiles = shuffled.map(function (item) {
            return `
                <button
                    class="puzzle-piece"
                    draggable="true"
                    data-piece="${item.originalIndex}"
                >
                    ${item.piece}
                </button>
            `;
        }).join("");

        const slots = question.pieces.map(function (_, index) {
            return `
                <button
                    class="puzzle-slot"
                    data-slot="${index}"
                >
                    ?
                </button>
            `;
        }).join("");

        app.innerHTML = `
            <div class="puzzle-play-container">

                <header class="puzzle-play-header">
                    <button data-action="game">← Daftar Puzzle</button>
                    <h2>${level.name}</h2>
                    <p>
                        Tantangan ${currentPuzzleQuestion + 1} dari 4
                    </p>
                </header>

                <div class="puzzle-progress">
                    <div style="width: ${
                        ((currentPuzzleQuestion + 1) / 4) * 100
                    }%"></div>
                </div>

                <section class="puzzle-question-card">
                    <img
                        src="public/images/maskot-mathlearn.png"
                        alt="Maskot MathLearn"
                        class="puzzle-mascot"
                    >

                    <h2>🧩 Susun Potongan Jawaban</h2>
                    <p>${question.prompt}</p>

                    <h3>Tempat Jawaban</h3>
                    <div class="puzzle-slots">
                        ${slots}
                    </div>

                    <h3>Potongan Jawaban</h3>
                    <p class="puzzle-instruction">
                        Tarik potongan ke kotak jawaban.
                        Kamu juga bisa memilih potongan lalu menekan kotaknya.
                    </p>

                    <div class="puzzle-pieces">
                        ${tiles}
                    </div>

                    <div class="puzzle-actions">
                        <button data-action="reset-puzzle">
                            Atur Ulang
                        </button>
                        <button data-action="check-puzzle">
                            Periksa Jawaban
                        </button>
                    </div>

                    <div id="puzzle-feedback"></div>
                </section>

            </div>
        `;

        updatePuzzleSlots();
    }

    function updatePuzzleSlots() {
        const slots = app.querySelectorAll(".puzzle-slot");

        slots.forEach(function (slot, index) {
            const pieceIndex = puzzleSlots[index];

            if (pieceIndex === null) {
                slot.textContent = "?";
                slot.classList.remove("filled");
            } else {
                const question = puzzleLevels[currentPuzzleLevel]
                    .questions[currentPuzzleQuestion];

                slot.textContent = question.pieces[pieceIndex];
                slot.classList.add("filled");
            }
        });

        const pieces = app.querySelectorAll(".puzzle-piece");

        pieces.forEach(function (piece) {
            const index = Number(piece.dataset.piece);
            const used = puzzleSlots.includes(index);

            piece.disabled = used;
            piece.classList.toggle("piece-used", used);
            piece.classList.toggle("piece-selected", selectedPiece === index);
        });
    }

    function placePuzzlePiece(slotIndex) {
        if (selectedPiece === null || puzzleFeedbackVisible) return;

        const oldSlot = puzzleSlots.indexOf(selectedPiece);

        if (oldSlot !== -1) {
            puzzleSlots[oldSlot] = null;
        }

        if (puzzleSlots[slotIndex] !== null) {
            const replacedPiece = puzzleSlots[slotIndex];
            puzzleSlots[slotIndex] = selectedPiece;

            selectedPiece = replacedPiece;
        } else {
            puzzleSlots[slotIndex] = selectedPiece;
            selectedPiece = null;
        }

        updatePuzzleSlots();
    }

    function resetPuzzle() {
        if (puzzleFeedbackVisible) return;

        puzzleSlots = new Array(
            puzzleLevels[currentPuzzleLevel]
                .questions[currentPuzzleQuestion].pieces.length
        ).fill(null);

        selectedPiece = null;
        updatePuzzleSlots();
    }

    function checkPuzzle() {
        if (puzzleFeedbackVisible) return;

        const feedback = document.getElementById("puzzle-feedback");
        const question = puzzleLevels[currentPuzzleLevel]
            .questions[currentPuzzleQuestion];

        if (puzzleSlots.some(function (piece) {
            return piece === null;
        })) {
            feedback.innerHTML = `
                <div class="feedback-hint">
                    <p>Lengkapi semua kotak jawaban terlebih dahulu. 🌷</p>
                </div>
            `;
            return;
        }

        const isCorrect = puzzleSlots.every(function (piece, index) {
            return piece === index;
        });

        if (isCorrect) {
            puzzleScore += 25;
            puzzleFeedbackVisible = true;

            feedback.innerHTML = `
                <div class="feedback-correct">
                    <h3>🎉 Susunanmu Benar!</h3>
                    <p>${question.explanation}</p>
                    <button data-action="next-puzzle">
                        ${currentPuzzleQuestion === 3
                            ? "Lihat Hasil Puzzle"
                            : "Tantangan Berikutnya →"}
                    </button>
                </div>
            `;
        } else {
            feedback.innerHTML = `
                <div class="feedback-hint">
                    <h3>Belum tepat, coba susun kembali! 💜</h3>
                    <p>Petunjuk: ${question.hint}</p>
                    <button data-action="reset-puzzle">
                        Susun Ulang
                    </button>
                </div>
            `;
        }
    }

    function nextPuzzleQuestion() {
        if (!puzzleFeedbackVisible) return;

        if (currentPuzzleQuestion < 3) {
            currentPuzzleQuestion++;
            showPuzzleQuestion();
        } else {
            finishPuzzleLevel();
        }
    }

    function finishPuzzleLevel() {
        if (!puzzleCompleted.includes(currentPuzzleLevel)) {
            puzzleCompleted.push(currentPuzzleLevel);
        }

        if (currentPuzzleLevel < puzzleLevels.length - 1) {
            puzzleUnlocked = Math.max(
                puzzleUnlocked,
                currentPuzzleLevel + 1
            );
        }

        saveProgress();

        app.innerHTML = `
            <div class="result-container">
                <div class="result-card">
                    <img
                        src="public/images/maskot-mathlearn.png"
                        alt="Maskot MathLearn"
                        class="result-mascot"
                    >

                    <h1>🏆 Puzzle Selesai!</h1>
                    <h2>${puzzleLevels[currentPuzzleLevel].name}</h2>

                    <div class="result-score">
                        ${puzzleScore} / 100
                    </div>

                    <p>
                        Kamu berhasil menyelesaikan
                        4 tantangan puzzle.
                    </p>

                    <p>
                        ${
                            currentPuzzleLevel < puzzleLevels.length - 1
                            ? "Level puzzle berikutnya sudah terbuka! 🔓"
                            : "Selamat! Semua level puzzle telah selesai!"
                        }
                    </p>

                    <button data-action="game">
                        Kembali ke Daftar Puzzle
                    </button>

                    <button data-action="home">
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        `;
    }

    // ==========================================
    // 11. HALAMAN PROGRES BELAJAR
    // ==========================================

    function showProgress() {
        const totalPractice = completedLevels.length;
        const totalPuzzle = puzzleCompleted.length;
        const totalActivities = 7;
        const totalCompleted = totalPractice + totalPuzzle;

        const percentage = Math.round(
            (totalCompleted / totalActivities) * 100
        );

        const scores = Object.values(bestScores);
        const averageScore = scores.length
            ? Math.round(
                scores.reduce(function (total, score) {
                    return total + Number(score);
                }, 0) / scores.length
            )
            : 0;

        const practiceRows = levels.map(function (level, index) {
            const done = completedLevels.includes(index);
            const score = bestScores[String(index + 1)];

            return `
                <div class="progress-row">
                    <span>${level.name}</span>
                    <strong>
                        ${done ? "✅ Selesai" : "⏳ Belum selesai"}
                    </strong>
                    <span>${score === undefined ? "-" : score + "/100"}</span>
                </div>
            `;
        }).join("");

        const puzzleRows = puzzleLevels.map(function (level, index) {
            const done = puzzleCompleted.includes(index);

            return `
                <div class="progress-row">
                    <span>${level.name}</span>
                    <strong>
                        ${done ? "✅ Selesai" : "⏳ Belum selesai"}
                    </strong>
                </div>
            `;
        }).join("");

        app.innerHTML = `
            <div class="progress-container">

                <header class="progress-header">
                    <button data-action="home">← Beranda</button>

                    <img
                        src="public/images/maskot-mathlearn.png"
                        alt="Maskot MathLearn"
                        class="progress-mascot"
                    >

                    <h1>🏆 Progres Belajarku</h1>
                    <p>
                        Terus semangat, ${escapeHTML(nickname)}!
                    </p>
                </header>

                <section class="progress-summary">
                    <h2>🌸 Ringkasan Pembelajaran</h2>

                    <div class="progress-number">
                        ${percentage}%
                    </div>

                    <div class="progress-bar">
                        <div style="width: ${percentage}%"></div>
                    </div>

                    <p>
                        ${totalCompleted} dari ${totalActivities}
                        level aktivitas telah diselesaikan.
                    </p>

                    <div class="progress-stat-grid">
                        <div class="progress-stat">
                            <h3>${totalPractice}</h3>
                            <p>Level Latihan Selesai</p>
                        </div>

                        <div class="progress-stat">
                            <h3>${totalPuzzle}</h3>
                            <p>Level Puzzle Selesai</p>
                        </div>

                        <div class="progress-stat">
                            <h3>${averageScore}</h3>
                            <p>Rata-rata Nilai Terbaik</p>
                        </div>
                    </div>
                </section>

                <section class="progress-detail">
                    <h2>✏️ Hasil Latihan Soal</h2>
                    ${practiceRows}
                </section>

                <section class="progress-detail">
                    <h2>🧩 Hasil Permainan Puzzle</h2>
                    ${puzzleRows}
                </section>

                <div class="progress-footer">
                    <p>💜 Setiap langkah kecil adalah kemajuan!</p>
                    <button data-action="home">
                        Kembali ke Beranda
                    </button>
                </div>

            </div>
        `;
    }

    // ==========================================
    // 12. EVENT LISTENER UTAMA
    // ==========================================

    app.addEventListener("submit", function (event) {
        if (event.target.id === "nickname-form") {
            event.preventDefault();

            const input = document.getElementById("nickname");
            const name = input.value.trim();

            if (!name) {
                alert("Silakan masukkan nama panggilan terlebih dahulu.");
                return;
            }

            nickname = name;
            localStorage.setItem(KEY_NAMA, nickname);

            showHomePage();
        }
    });

    app.addEventListener("click", function (event) {
        const button = event.target.closest("button");

        if (!button || !app.contains(button)) return;

        const action = button.dataset.action;

        if (!action) return;

        switch (action) {

            case "home":
                showHomePage();
                break;

            case "material":
                showMaterial();
                break;

            case "practice":
                showPractice();
                break;

            case "game":
                showGame();
                break;

            case "progress":
                showProgress();
                break;

            case "change-name":
                localStorage.removeItem(KEY_NAMA);
                nickname = "";
                showWelcome();
                break;

            case "start-level":
                startPracticeLevel(Number(button.dataset.level));
                break;

            case "answer-practice":
                answerPractice(Number(button.dataset.answer));
                break;

            case "retry-practice":
                retryPracticeQuestion();
                break;

            case "next-practice":
                nextPracticeQuestion();
                break;

            case "practice-menu":
                showPractice();
                break;

            case "start-puzzle":
                startPuzzle(Number(button.dataset.level));
                break;

            case "reset-puzzle":
                resetPuzzle();
                break;

            case "check-puzzle":
                checkPuzzle();
                break;

            case "next-puzzle":
                nextPuzzleQuestion();
                break;
        }
    });

    // ==========================================
    // 13. DRAG AND DROP PUZZLE
    // ==========================================

    app.addEventListener("dragstart", function (event) {
        const piece = event.target.closest(".puzzle-piece");

        if (!piece || piece.disabled || puzzleFeedbackVisible) {
            event.preventDefault();
            return;
        }

        selectedPiece = Number(piece.dataset.piece);

        if (event.dataTransfer) {
            event.dataTransfer.setData(
                "text/plain",
                String(selectedPiece)
            );
            event.dataTransfer.effectAllowed = "move";
        }

        updatePuzzleSlots();
    });

    app.addEventListener("dragover", function (event) {
        const slot = event.target.closest(".puzzle-slot");

        if (slot) {
            event.preventDefault();
        }
    });

    app.addEventListener("drop", function (event) {
        const slot = event.target.closest(".puzzle-slot");

        if (!slot || puzzleFeedbackVisible) return;

        event.preventDefault();

        const transferred = event.dataTransfer
            ? event.dataTransfer.getData("text/plain")
            : "";

        if (transferred !== "") {
            selectedPiece = Number(transferred);
        }

        placePuzzlePiece(Number(slot.dataset.slot));
    });

    // Memilih potongan puzzle dengan klik.
    app.addEventListener("click", function (event) {
        const piece = event.target.closest(".puzzle-piece");

        if (piece && !piece.disabled && !puzzleFeedbackVisible) {
            selectedPiece = Number(piece.dataset.piece);
            updatePuzzleSlots();
            return;
        }

        const slot = event.target.closest(".puzzle-slot");

        if (slot && !puzzleFeedbackVisible) {
            const slotIndex = Number(slot.dataset.slot);

            if (selectedPiece !== null) {
                placePuzzlePiece(slotIndex);
            } else if (puzzleSlots[slotIndex] !== null) {
                selectedPiece = puzzleSlots[slotIndex];
                puzzleSlots[slotIndex] = null;
                updatePuzzleSlots();
            }
        }
    });

    // ==========================================
    // 14. MEMULAI MATHLEARN
    // ==========================================

    if (nickname) {
        showHomePage();
    } else {
        showWelcome();
    }

});

