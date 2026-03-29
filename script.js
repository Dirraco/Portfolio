// ================= CONFIGURAÇÕES E ESTADOS =================
const GITHUB_USERNAME = 'Dirraco';

// ================= LOADER =================
function removeLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }
}
window.addEventListener('load', removeLoader);
setTimeout(removeLoader, 3000);

// ================= INICIALIZAÇÕES (AOS & TYPED) =================
AOS.init({ duration: 1000, once: true });

if (document.getElementById('typed')) {
    new Typed('#typed', {
        strings: ['Java Specialist', 'Backend Engineer', 'Spring Boot Dev'],
        typeSpeed: 60,
        backSpeed: 30,
        loop: true
    });
}

// ================= TYPEWRITER (NOME PRINCIPAL) =================
const nameElement = document.getElementById('typewriter-name');
const myName = "Diego Santos";
let charIndex = 0;

function typeWriter() {
    if (nameElement && charIndex < myName.length) {
        nameElement.innerHTML += myName.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 150);
    } else if (nameElement) {
        nameElement.parentElement.setAttribute('data-text', myName);
    }
}

// ================= PARTÍCULAS (FUNDO ANIMADO) =================
function loadParticles(color) {
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            particles: {
                color: { value: color },
                links: { enable: true, color: color, opacity: 0.3 },
                move: { enable: true, speed: 1 },
                number: { value: 40 },
                size: { value: 2 }
            }
        });
    }
}
loadParticles('rgba(0, 229, 255, 0.4)');

// ================= DARK/LIGHT MODE =================
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
        const isLight = document.body.classList.contains('light');
        loadParticles(isLight ? '#000000' : 'rgba(0, 229, 255, 0.4)');
        themeToggle.textContent = isLight ? '☀️' : '🌙';
    });
}

// ================= GITHUB API LOGIC (REAL DATA) =================
async function fetchGitHubStats() {
    const loading = document.getElementById('github-loading');
    const content = document.getElementById('github-content');

    try {
        const userResp = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const user = await userResp.json();

        const reposResp = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        const repos = await reposResp.json();

        if (loading) loading.classList.add('hidden');
        if (content) content.classList.remove('hidden');

        renderGitHubCards(user, repos);
        renderGitHubCharts(repos);

    } catch (error) {
        console.error('Erro GitHub API:', error);
        if (loading) loading.innerText = 'Erro ao carregar dados reais.';
    }
}

function renderGitHubCards(user, repos) {
    const statsContainer = document.getElementById('github-basic-stats');
    if (!statsContainer) return;

    // Cálculo real de estrelas
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    
    // Valor de commits (ajuste conforme seu dashboard real)
    const totalCommits = 412; 

    // Renderiza os 3 mini-cards internos do primeiro bloco
    statsContainer.innerHTML = `
        <div class="github-card">
            <i class="fa-solid fa-code-branch"></i>
            <span>${user.public_repos}</span>
            <p>Repositórios</p>
        </div>
        <div class="github-card">
            <i class="fa-solid fa-star"></i>
            <span>${totalStars}</span>
            <p>Stars</p>
        </div>
        <div class="github-card">
            <i class="fa-solid fa-terminal"></i>
            <span>${totalCommits}</span>
            <p>Commits</p>
        </div>
    `;

    // ADICIONANDO TÍTULOS AOS CARDS DE GRÁFICOS (Se eles ainda não existirem no HTML)
    const cardCommits = document.getElementById('commitsChart').closest('.github-card-row');
    const cardLangs = document.getElementById('languagesChart').closest('.github-card-row');

    if (cardCommits && !cardCommits.querySelector('h4')) {
        cardCommits.insertAdjacentHTML('afterbegin', '<h4>Atividade de Commits</h4>');
    }
    if (cardLangs && !cardLangs.querySelector('h4')) {
        cardLangs.insertAdjacentHTML('afterbegin', '<h4>Tecnologias (GitHub)</h4>');
    }
}

function renderGitHubCharts(repos) {
    const langsMap = {};
    let totalReposWithLang = 0;

    repos.forEach(repo => {
        if (repo.language) {
            langsMap[repo.language] = (langsMap[repo.language] || 0) + 1;
            totalReposWithLang++;
        }
    });

    // Gráfico de Linguagens (Donut)
    const ctxLangs = document.getElementById('languagesChart');
    if (ctxLangs) {
        new Chart(ctxLangs.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(langsMap),
                datasets: [{
                    data: Object.values(langsMap),
                    backgroundColor: ['#f89820', '#6db33f', '#61dafb', '#f7df1e', '#00758f', '#e34c26', '#563d7c', '#3178c6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom', // Legenda embaixo para ganhar largura
                        labels: {
                            color: '#94a3b8',
                            padding: 20,
                            font: { size: 11, family: 'Fira Code' },
                            usePointStyle: true // Bolinhas em vez de quadrados (mais moderno)
                        }
                    }
                },
                layout: { padding: 15 }
            }
        });
    }

    // Gráfico de Commits (Mock - API de commits requer Token para ser precisa)
    const ctxCommits = document.getElementById('commitsChart');
    if (ctxCommits) {
        new Chart(ctxCommits.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
                datasets: [{
                    label: 'Commits',
                    data: [12, 19, 15, 25, 22, 30],
                    borderColor: '#00e5ff',
                    backgroundColor: 'rgba(0, 229, 255, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } },
                    x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                },
                plugins: { legend: { display: false } }
            }
        });
    }
}

// ================= EXECUÇÃO INICIAL =================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
    fetchGitHubStats();
});