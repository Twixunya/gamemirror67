// Конфигурация Tailwind CSS
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    brand: {
                        dark: '#0B0F19',
                        card: 'rgba(21, 28, 44, 0.75)',
                        primary: '#6366F1',
                        accent: '#A855F7',
                        emerald: '#10B981',
                        pink: '#EC4899',
                        cyan: '#06B6D4'
                    }
                },
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    heading: ['Montserrat', 'sans-serif']
                }
            }
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.className = 'fa-solid fa-bars text-xl';
            } else {
                menuIcon.className = 'fa-solid fa-xmark text-xl';
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.className = 'fa-solid fa-bars text-xl';
            });
        });
    }

    // 2. Toast Notification Helper
    function showToast(message) {
        const toast = document.getElementById('toastNotification');
        const toastMsg = document.getElementById('toastMessage');
        if (toast && toastMsg) {
            toastMsg.textContent = message;
            toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
            toast.classList.add('translate-y-0', 'opacity-100');

            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
            }, 4000);
        }
    }

    // 3. Hero Widget Switching
    const heroGameData = {
        dota: {
            time: "2 часа каток",
            stat1: "+15% (при победе)",
            bar1: "65%",
            stat2: "+40% (высокий)",
            bar2: "85%",
            rec: "«Победы дарят всплеск статуса, но поражения провоцируют тильт. Держи сессию до 2-3 игр.»"
        },
        souls: {
            time: "1.5 часа боссфайтов",
            stat1: "+45% (преодоление)",
            bar1: "90%",
            stat2: "+25% (средний)",
            bar2: "60%",
            rec: "«Победа после долгих попыток дает сильный подъем уверенности в собственных силах.»"
        },
        stardew: {
            time: "1 час релакса",
            stat1: "+35% (умиротворение)",
            bar1: "80%",
            stat2: "-30% (низкий)",
            bar2: "15%",
            rec: "«Уютный гейминг эффективно снижает тревожность и восстанавливает ресурс.»"
        },
        cyberpunk: {
            time: "3 часа сюжета",
            stat1: "+25% (погружение)",
            bar1: "70%",
            stat2: "+10% (минимальный)",
            bar2: "30%",
            rec: "«Сюжетные игры дают эмоциональную разрядку с минимальным риском раздражения.»"
        }
    };

    const heroBtns = document.querySelectorAll('.hero-btn');
    heroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            heroBtns.forEach(b => {
                b.classList.remove('active', 'border-brand-accent', 'bg-purple-500/20');
                b.classList.add('border-white/5');
            });
            btn.classList.add('active', 'border-brand-accent', 'bg-purple-500/20');
            btn.classList.remove('border-white/5');

            const key = btn.getAttribute('data-game');
            const data = heroGameData[key];

            if (data) {
                document.getElementById('heroResultTime').textContent = data.time;
                document.getElementById('heroStat1').textContent = data.stat1;
                document.getElementById('heroBar1').style.width = data.bar1;
                document.getElementById('heroStat2').textContent = data.stat2;
                document.getElementById('heroBar2').style.width = data.bar2;
                document.getElementById('heroRecommendation').textContent = data.rec;
            }
        });
    });

    // 4. Diary Simulator Logic
    const sliderBefore = document.getElementById('sliderBefore');
    const sliderAfter = document.getElementById('sliderAfter');
    const valBefore = document.getElementById('valBefore');
    const valAfter = document.getElementById('valAfter');

    if (sliderBefore && valBefore) {
        sliderBefore.addEventListener('input', (e) => {
            valBefore.textContent = `${e.target.value} / 10`;
        });
    }

    if (sliderAfter && valAfter) {
        sliderAfter.addEventListener('input', (e) => {
            valAfter.textContent = `${e.target.value} / 10`;
        });
    }

    const diaryForm = document.getElementById('diarySimulatorForm');
    if (diaryForm) {
        diaryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const gameTitle = document.getElementById('simGameTitle').value.trim() || "Видеоигра";
            const scoreBefore = parseInt(sliderBefore.value);
            const scoreAfter = parseInt(sliderAfter.value);
            const delta = scoreAfter - scoreBefore;

            // Reveal Output Box
            const outputBox = document.getElementById('simAnalysisOutput');
            outputBox.classList.remove('hidden');

            document.getElementById('outGameName').textContent = gameTitle;

            // Format Badge
            const badge = document.getElementById('outDeltaBadge');
            if (delta > 0) {
                badge.textContent = `Самооценка: +${delta} бал. 🚀`;
                badge.className = "px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
            } else if (delta < 0) {
                badge.textContent = `Самооценка: ${delta} бал. ⚠️`;
                badge.className = "px-3 py-1 rounded-full text-xs font-extrabold bg-rose-500/20 text-rose-400 border border-rose-500/30";
            } else {
                badge.textContent = `Без изменений (0) ⚖️`;
                badge.className = "px-3 py-1 rounded-full text-xs font-extrabold bg-slate-500/20 text-slate-300 border border-slate-500/30";
            }

            // Generate Psych Texts
            let summary = "";
            let advice = "";

            if (delta > 2) {
                summary = `Сессия в "${gameTitle}" принесла мощный эмоциональный подъем и укрепила уверенность в себе.`;
                advice = "Используйте этот прилив энергии и позитивного настроя для важных дел вне игры!";
            } else if (delta >= 0 && delta <= 2) {
                summary = `Игровой процесс прошел спокойно и сбалансированно. Эмоциональный фон сохранился в норме.`;
                advice = "Отличный пример здорового отдыха без перегрузки нервной системы.";
            } else if (delta < 0 && delta >= -2) {
                summary = `Наблюдается легкое снижение настроения и уверенности после игры.`;
                advice = "Сделайте паузу, выпейте воды и напомните себе: счет в игре не определяет вашу ценность.";
            } else {
                summary = `Зафиксирован сильный спад самооценки и высокий уровень тильта.`;
                advice = "Срочно переключите внимание! Не пытайся «отыграться» прямо сейчас, чтобы не усугубить усталость.";
            }

            document.getElementById('outPsychSummary').textContent = summary;
            document.getElementById('outPsychAdvice').textContent = advice;

            // Render Custom SVG Chart
            const svgChart = document.getElementById('svgTrendChart');
            const yBefore = 90 - (scoreBefore * 7); // map 1..10 to Y coords
            const yAfter = 90 - (scoreAfter * 7);
            const color = delta >= 0 ? '#10B981' : '#F43F5E';

            svgChart.innerHTML = `
                <!-- Grid Lines -->
                <line x1="20" y1="20" x2="180" y2="20" stroke="rgba(255,255,255,0.05)" stroke-dasharray="3,3"/>
                <line x1="20" y1="55" x2="180" y2="55" stroke="rgba(255,255,255,0.05)" stroke-dasharray="3,3"/>
                <line x1="20" y1="90" x2="180" y2="90" stroke="rgba(255,255,255,0.05)" opacity="0.3"/>
                
                <!-- Connecting Trend Line -->
                <line x1="40" y1="${yBefore}" x2="160" y2="${yAfter}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
                
                <!-- Point Before -->
                <circle cx="40" cy="${yBefore}" r="6" fill="#A855F7" />
                <text x="40" y="${yBefore - 10}" fill="#A855F7" font-size="10" font-weight="bold" text-anchor="middle">${scoreBefore}</text>

                <!-- Point After -->
                <circle cx="160" cy="${yAfter}" r="6" fill="${color}" />
                <text x="160" y="${yAfter - 10}" fill="${color}" font-size="10" font-weight="bold" text-anchor="middle">${scoreAfter}</text>
            `;

            outputBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // 5. Beta Signup Form
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('subEmail');
            if (emailInput && emailInput.value.trim() !== '') {
                showToast(`Спасибо! Е-mail ${emailInput.value.trim()} успешно записан в бета-тест.`);
                emailInput.value = '';
            }
        });
    }

});
