// ================= LOADER =================
// Função responsável por remover a tela de carregamento inicial
function removeLoader() {
    const loader = document.getElementById('loader');

    // Verifica se o elemento existe antes de manipular
    if(loader) {
        loader.style.opacity = '0'; // Fade out visual
        setTimeout(() => loader.style.display = 'none', 500); // Remove da tela após animação
    }
}

// Executa quando a página termina de carregar
window.addEventListener('load', removeLoader);

// Fallback: força remover o loader após 3 segundos (caso algo falhe)
setTimeout(removeLoader, 3000);


// ================= INICIALIZAÇÕES =================

// Inicializa animações de scroll (AOS - Animate On Scroll)
AOS.init({ 
    duration: 1000, // duração da animação (ms)
    once: true      // anima apenas uma vez
});

// Inicializa efeito de digitação para subtítulo
new Typed('#typed', {
  strings: ['Java Specialist', 'Backend Engineer', 'Spring Boot Dev'],
  typeSpeed: 60,     // velocidade digitando
  backSpeed: 30,     // velocidade apagando
  loop: true         // loop infinito
});


// ================= PARTÍCULAS (FUNDO ANIMADO) =================
// Função que carrega partículas dinâmicas no background
function loadParticles(color) {

    // Garante que a lib foi carregada
    if (typeof tsParticles !== 'undefined') {

        tsParticles.load("tsparticles", {
            particles: {
                color: { value: color }, // cor das partículas

                // Linhas conectando partículas (efeito rede)
                links: { 
                    enable: true, 
                    color: color, 
                    opacity: 0.3 
                },

                move: { 
                    enable: true, 
                    speed: 1 
                },

                number: { value: 40 }, // quantidade de partículas
                size: { value: 2 }     // tamanho
            }
        });
    }
}

// Inicializa partículas no modo padrão (dark)
loadParticles('rgba(0, 229, 255, 0.4)');


// ================= DARK MODE =================

// Botão de alternância de tema
const toggle = document.getElementById('themeToggle');

if (toggle) {

    toggle.addEventListener('click', () => {

        // Alterna classe no body
        document.body.classList.toggle('light');

        // Verifica estado atual
        const isLight = document.body.classList.contains('light');

        // Atualiza cor das partículas conforme tema
        loadParticles(isLight ? '#000000' : 'rgba(0, 229, 255, 0.4)');

        // Troca ícone do botão
        toggle.textContent = isLight ? '☀️' : '🌙';
    });
}


// ================= PROJETOS =================

// Lista manual de projetos exibidos no portfólio
const projects = [
    { 
        name: "Sistema de Controle de Reservas", 
        repo: "https://github.com/Dirraco/Projeto-1--Sistema-de-Controle-de-Reservas-de-Hotel/tree/main", 
        demo: "#", 
        img: "img/FT-sistema-hotel.png" 
    },
    { 
        name: "API REST Spring Boot", 
        repo: "https://github.com/Dirraco", 
        demo: "#", 
        img: "https://via.placeholder.com/300/0d1117/00e5ff?text=Spring+API" 
    },
    { 
        name: "Sistema de Registro de Ponto", 
        repo: "https://github.com/Dirraco", 
        demo: "#", 
        img: "https://via.placeholder.com/300/0d1117/00e5ff?text=RH+System" 
    },
    { 
        name: "Filtro Streams API", 
        repo: "https://github.com/Dirraco", 
        demo: "#", 
        img: "https://via.placeholder.com/300/0d1117/00e5ff?text=Java+Streams" 
    }
];

// Container onde os projetos serão renderizados
const container = document.getElementById('projects-container');

if (container) {

    // Renderiza os projetos dinamicamente no HTML
    container.innerHTML = projects.map(p => `
        <div class="project-card" data-aos="fade-up">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>

            <div class="flex gap-4 mt-4 justify-center">
                <a href="${p.repo}" target="_blank" class="text-accent hover:underline text-sm">
                    <i class="fa-brands fa-github"></i> Código
                </a>

                <a href="${p.demo}" target="_blank" class="text-accent hover:underline text-sm">
                    <i class="fa-solid fa-link"></i> Demo
                </a>
            </div>
        </div>
    `).join('');

    // Ativa efeito 3D nos cards (VanillaTilt)
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 10,          // intensidade do tilt
            speed: 400,       // velocidade da animação
            glare: true,      
            "max-glare": 0.2  // brilho
        });
    }
}


// ================= SKILLS =================

// Lista de skills (renderizada via JS)
const skillList = [
    { name: "Java", icon: "fa-brands fa-java" },
    { name: "Spring Boot", icon: "fa-solid fa-leaf" },
    { name: "React", icon: "fa-brands fa-react" },
    { name: "JavaScript", icon: "fa-brands fa-js" },
    { name: "TypeScript", icon: "fa-solid fa-code" },
    { name: "MySQL", icon: "fa-solid fa-database" },
    { name: "Git", icon: "fa-brands fa-git-alt" },
    { name: "PHP", icon: "fa-brands fa-php" }
];

// Container de skills
const skillsContainer = document.querySelector('.skills');

if (skillsContainer) {

    // Renderiza as skills dinamicamente
    skillsContainer.innerHTML = skillList.map(s => `
        <div class="skill">
            <i class="${s.icon}"></i> ${s.name}
        </div>
    `).join('');
}


// ================= GITHUB STATS =================

// Função que monta o dashboard do GitHub
const initGitHub = () => {

    const loading = document.getElementById('github-loading');
    const content = document.getElementById('github-content');
    const statsContainer = document.getElementById('github-basic-stats');
    const titleCommits = document.getElementById('title-commits');
    const titleLanguages = document.getElementById('title-languages');

    // Se não existir, aborta execução
    if (!content) return;

    // Classe padrão de títulos
    const estiloTitulo = "text-accent mb-6 font-bold text-center text-sm uppercase tracking-wider";

    // Renderiza estatísticas fake (mock)
    statsContainer.innerHTML = `
        <h4 class="${estiloTitulo}">Status Geral</h4>
        <div class="flex flex-col justify-between h-full pb-4">
            <div class="github-stat-mini"><span>Repositórios</span><span>24</span></div>
            <div class="github-stat-mini"><span>Commits Total</span><span>412</span></div>
            <div class="github-stat-mini"><span>Pull Requests</span><span>18</span></div>
            <div class="github-stat-mini"><span>Contribuições</span><span>156</span></div>
        </div>
    `;

    // Define títulos dos gráficos
    if(titleCommits) titleCommits.innerHTML = `<h4 class="${estiloTitulo}">Fluxo de Commits</h4>`;
    if(titleLanguages) titleLanguages.innerHTML = `<h4 class="${estiloTitulo}">Tecnologias no GitHub</h4>`;

    // Configuração padrão dos gráficos
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // necessário para encaixar no layout
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: { 
                    color: '#94a3b8', 
                    font: { size: 10 }, 
                    boxWidth: 8 
                }
            }
        }
    };

    // Gráfico de commits (linha)
    new Chart(document.getElementById('commitsChart'), {
        type: 'line',
        data: {
            labels: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
            datasets: [{
                label: 'Commits',
                data: [5, 12, 8, 15, 10, 4, 2],
                borderColor: '#00e5ff',
                backgroundColor: 'rgba(0, 229, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: chartOptions
    });

    // Gráfico de linguagens (donut)
    new Chart(document.getElementById('languagesChart'), {
        type: 'doughnut',
        data: {
            labels: ['Java', 'JS/TS', 'PHP', 'HTML/CSS'],
            datasets: [{
                data: [45, 25, 15, 15],
                backgroundColor: ['#00e5ff', '#f7df1e', '#3178c6', '#e34f26'],
                borderWidth: 0
            }]
        },
        options: { ...chartOptions, cutout: '75%' }
    });

    // Remove loading e exibe conteúdo
    loading.classList.add('hidden');
    content.classList.remove('hidden');
};


// ================= TYPEWRITER (NOME PRINCIPAL) =================

// Elemento onde o nome será digitado
const element = document.getElementById('typewriter-name');

// Texto que será animado
const text = "Diego Santos";

let i = 0;

// Função de digitação manual (efeito terminal)
function typeWriter() {

    if (i < text.length) {

        element.innerHTML += text.charAt(i);
        i++;

        setTimeout(typeWriter, 150); // velocidade da digitação

    } else {

        // Ativa efeito glitch no CSS após terminar
        const parentH1 = element.parentElement;
        parentH1.setAttribute('data-text', text);
    }
}


// Inicia digitação após carregar DOM
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000); // espera loader
});

// Inicializa GitHub após delay (simulando carregamento)
setTimeout(initGitHub, 1500);

