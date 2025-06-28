// Main Application - Portal Destrave na Hora H

class DestraveApp {
    constructor() {
        this.currentScreen = 'loading';
        this.userData = null;
        this.moduleProgress = {};
        this.currentModule = null;
        this.currentPage = 0;
        
        this.init();
    }

    // Inicializar aplicação
    async init() {
        try {
            // Mostrar loading screen
            await this.showLoadingScreen();
            
            // Carregar dados salvos
            this.loadSavedData();
            
            // Configurar event listeners
            this.setupEventListeners();
            
            // Determinar tela inicial
            await this.determineInitialScreen();
            
        } catch (error) {
            console.error('Erro na inicialização:', error);
            this.showError('Erro ao carregar a aplicação. Tente recarregar a página.');
        }
    }

    // Mostrar loading screen
    async showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            await AnimationManager.fadeIn(loadingScreen);
            
            // Simular carregamento
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            await AnimationManager.fadeOut(loadingScreen);
        }
    }

    // Carregar dados salvos
    loadSavedData() {
        if (StorageManager.isAvailable()) {
            this.userData = StorageManager.loadUserData();
            this.moduleProgress = StorageManager.loadModuleProgress();
            
            // Aplicar progresso aos módulos
            Object.entries(this.moduleProgress).forEach(([moduleId, progress]) => {
                moduleData.updateModuleProgress(parseInt(moduleId), progress.completedPages || 0);
            });
        }
    }

    // Determinar tela inicial
    async determineInitialScreen() {
        if (this.userData && this.userData.name) {
            await this.showDashboard();
        } else {
            await this.showLoginScreen();
        }
    }

    // Configurar event listeners
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Welcome button
        const welcomeBtn = document.getElementById('goToDashboardBtn');
        if (welcomeBtn) {
            welcomeBtn.addEventListener('click', () => this.showDashboard());
        }

        // Module navigation
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        const finishBtn = document.getElementById('finishModuleBtn');

        if (prevBtn) prevBtn.addEventListener('click', () => this.previousPage());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextPage());
        if (finishBtn) finishBtn.addEventListener('click', () => this.finishModule());

        // Modal events
        const cancelPasswordBtn = document.getElementById('cancelPasswordBtn');
        const confirmPasswordBtn = document.getElementById('confirmPasswordBtn');

        if (cancelPasswordBtn) cancelPasswordBtn.addEventListener('click', () => this.closeModal());
        if (confirmPasswordBtn) confirmPasswordBtn.addEventListener('click', () => this.confirmPassword());

        // Certificate button
        const acceptCertificateBtn = document.getElementById('acceptCertificateBtn');
        if (acceptCertificateBtn) {
            acceptCertificateBtn.addEventListener('click', () => this.showDashboard());
        }

        // Auto-save
        window.addEventListener('autoSave', () => this.saveProgress());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    // Mostrar tela de login
    async showLoginScreen() {
        this.hideAllScreens();
        const loginScreen = document.getElementById('loginScreen');
        if (loginScreen) {
            loginScreen.style.display = 'flex';
            await AnimationManager.fadeIn(loginScreen);
            this.currentScreen = 'login';
            
            // Focus no primeiro input
            const firstInput = loginScreen.querySelector('input');
            if (firstInput) firstInput.focus();
        }
    }

    // Mostrar tela de boas-vindas
    async showWelcomeScreen() {
        this.hideAllScreens();
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen) {
            welcomeScreen.style.display = 'flex';
            await AnimationManager.fadeIn(welcomeScreen);
            this.currentScreen = 'welcome';
            
            // Atualizar nome do usuário
            const userName = document.getElementById('welcomeUserName');
            if (userName && this.userData) {
                userName.textContent = this.userData.name;
            }
        }
    }

    // Mostrar dashboard
    async showDashboard() {
        this.hideAllScreens();
        const dashboardScreen = document.getElementById('dashboardScreen');
        if (dashboardScreen) {
            dashboardScreen.style.display = 'block';
            await AnimationManager.fadeIn(dashboardScreen);
            this.currentScreen = 'dashboard';
            
            this.updateDashboard();
            this.renderModules();
        }
    }

    // Atualizar dashboard
    updateDashboard() {
        if (!this.userData) return;

        // Atualizar estatísticas do usuário
        const stats = moduleData.getUserStats();
        
        const pointsElement = document.getElementById('userPoints');
        const levelElement = document.getElementById('userLevel');
        const achievementsElement = document.getElementById('userAchievements');

        if (pointsElement) pointsElement.textContent = stats.points;
        if (levelElement) levelElement.textContent = stats.level;
        if (achievementsElement) achievementsElement.textContent = stats.achievements;

        // Atualizar progresso geral
        const overallProgress = moduleData.getOverallProgress();
        const progressBar = document.getElementById('overallProgressBar');
        const progressText = document.getElementById('overallProgressText');

        if (progressBar) {
            AnimationManager.animateProgress(progressBar, overallProgress);
        }
        if (progressText) {
            progressText.textContent = overallProgress + '%';
        }
    }

    // Renderizar módulos
    renderModules() {
        const modulesGrid = document.getElementById('modulesGrid');
        if (!modulesGrid) return;

        modulesGrid.innerHTML = '';

        moduleData.modules.forEach(module => {
            const moduleCard = this.createModuleCard(module);
            modulesGrid.appendChild(moduleCard);
        });

        // Animar entrada dos módulos
        const moduleCards = modulesGrid.querySelectorAll('.module-card');
        AnimationManager.staggerIn(moduleCards, { delay: 100 });
    }

    // Criar card do módulo
    createModuleCard(module) {
        const card = document.createElement('div');
        card.className = `module-card card card--shadow-md card--interactive`;
        card.setAttribute('role', 'listitem');
        
        if (module.completed) {
            card.classList.add('card--completed');
        } else if (!module.unlocked) {
            card.classList.add('card--locked');
        }

        const progressPercent = Math.round((module.completedPages / module.pages) * 100);

        card.innerHTML = `
            <div class="module-header">
                <div class="module-icon module-icon--${module.iconColor}">
                    ${module.icon}
                </div>
                <div class="module-info">
                    <h3>${module.title}</h3>
                    <p>${module.subtitle}</p>
                </div>
            </div>
            
            <div class="module-progress">
                <div class="module-progress-label">
                    <span class="module-progress-text">Progresso</span>
                    <span class="module-progress-percent">${progressPercent}%</span>
                </div>
                <div class="module-progress-bar">
                    <div class="module-progress-fill" style="width: ${progressPercent}%"></div>
                </div>
            </div>
            
            <button class="btn btn--md module-btn ${this.getModuleButtonClass(module)}" 
                    ${!module.unlocked ? 'disabled' : ''}>
                ${this.getModuleButtonText(module)}
            </button>
        `;

        // Event listener para o botão
        const button = card.querySelector('.module-btn');
        button.addEventListener('click', () => this.handleModuleClick(module));

        return card;
    }

    // Obter classe do botão do módulo
    getModuleButtonClass(module) {
        if (module.completed) return 'btn--success';
        if (!module.unlocked) return 'btn--warning';
        return 'btn--primary';
    }

    // Obter texto do botão do módulo
    getModuleButtonText(module) {
        if (module.completed) return '✓ CONCLUÍDO';
        if (!module.unlocked && module.hasPassword) return '🔒 BLOQUEADO';
        if (!module.unlocked) return '⏳ AGUARDANDO';
        if (module.completedPages > 0) return 'CONTINUAR';
        return 'COMEÇAR';
    }

    // Lidar com clique no módulo
    handleModuleClick(module) {
        if (!module.unlocked) {
            if (module.hasPassword) {
                this.showPasswordModal(module);
            } else {
                this.showNotification('Este módulo será desbloqueado quando você completar os anteriores.', 'info');
            }
            return;
        }

        this.startModule(module);
    }

    // Mostrar modal de senha
    showPasswordModal(module) {
        const modal = document.getElementById('passwordModal');
        const modalText = document.getElementById('modalText');
        const passwordInput = document.getElementById('modulePasswordInput');

        if (modal && modalText && passwordInput) {
            modalText.textContent = `Para acessar "${module.title}", insira a senha:`;
            passwordInput.value = '';
            passwordInput.dataset.moduleId = module.id;
            
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            passwordInput.focus();
        }
    }

    // Fechar modal
    closeModal() {
        const modal = document.getElementById('passwordModal');
        if (modal) {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    // Confirmar senha
    confirmPassword() {
        const passwordInput = document.getElementById('modulePasswordInput');
        if (!passwordInput) return;

        const moduleId = parseInt(passwordInput.dataset.moduleId);
        const password = passwordInput.value;

        if (moduleData.unlockModule(moduleId, password)) {
            this.closeModal();
            this.showNotification('Módulo desbloqueado com sucesso!', 'success');
            this.renderModules();
            this.saveProgress();
        } else {
            AnimationManager.shake(passwordInput);
            this.showNotification('Senha incorreta. Tente novamente.', 'error');
            passwordInput.focus();
        }
    }

    // Iniciar módulo
    async startModule(module) {
        this.currentModule = module;
        this.currentPage = module.completedPages || 0;
        
        await this.showModuleContent();
    }

    // Mostrar conteúdo do módulo
    async showModuleContent() {
        this.hideAllScreens();
        const moduleScreen = document.getElementById('moduleContentScreen');
        
        if (moduleScreen) {
            moduleScreen.style.display = 'block';
            await AnimationManager.fadeIn(moduleScreen);
            this.currentScreen = 'module';
            
            this.updateModuleContent();
        }
    }

    // Atualizar conteúdo do módulo
    updateModuleContent() {
        if (!this.currentModule) return;

        const content = moduleData.getModuleContent(this.currentModule.id);
        const currentContent = content[this.currentPage];

        if (!currentContent) return;

        // Atualizar título e subtítulo
        const title = document.getElementById('moduleContentTitle');
        const subtitle = document.getElementById('moduleContentSubtitle');

        if (title) title.textContent = currentContent.title;
        if (subtitle) subtitle.textContent = currentContent.subtitle;

        // Atualizar conteúdo da página
        const pageContent = document.getElementById('modulePageContent');
        if (pageContent) {
            if (currentContent.quiz) {
                pageContent.innerHTML = this.renderQuiz(currentContent.quiz);
                this.setupQuizEvents();
            } else {
                pageContent.innerHTML = currentContent.content;
            }
        }

        // Atualizar navegação
        this.updateModuleNavigation();
    }

    // Atualizar navegação do módulo
    updateModuleNavigation() {
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        const finishBtn = document.getElementById('finishModuleBtn');
        const pageIndicator = document.getElementById('pageIndicator');

        const content = moduleData.getModuleContent(this.currentModule.id);
        const isLastPage = this.currentPage >= content.length - 1;

        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 0;
        }

        if (nextBtn) {
            nextBtn.style.display = isLastPage ? 'none' : 'inline-flex';
        }

        if (finishBtn) {
            finishBtn.style.display = isLastPage ? 'block' : 'none';
        }

        if (pageIndicator) {
            pageIndicator.textContent = `Página ${this.currentPage + 1} de ${content.length}`;
        }
    }

    // Página anterior
    previousPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.updateModuleContent();
        }
    }

    // Próxima página
    nextPage() {
        const content = moduleData.getModuleContent(this.currentModule.id);
        if (this.currentPage < content.length - 1) {
            this.currentPage++;
            this.updateModuleContent();
            
            // Atualizar progresso
            if (this.currentPage > this.currentModule.completedPages) {
                this.currentModule.completedPages = this.currentPage;
                this.saveProgress();
            }
        }
    }

    // Finalizar módulo
    finishModule() {
        if (!this.currentModule) return;

        // Marcar como concluído
        this.currentModule.completed = true;
        this.currentModule.completedPages = moduleData.getModuleContent(this.currentModule.id).length;
        
        // Desbloquear próximo módulo
        const nextModule = moduleData.getModule(this.currentModule.id + 1);
        if (nextModule && !nextModule.hasPassword) {
            nextModule.unlocked = true;
        }

        this.saveProgress();

        // Verificar se completou todos os módulos
        const allCompleted = moduleData.modules.every(module => module.completed);
        if (allCompleted) {
            this.showCertificate();
        } else {
            this.showNotification('Parabéns! Módulo concluído com sucesso!', 'success');
            this.showDashboard();
        }
    }

    // Mostrar certificado
    async showCertificate() {
        this.hideAllScreens();
        const certificateScreen = document.getElementById('certificateScreen');
        
        if (certificateScreen) {
            certificateScreen.style.display = 'flex';
            await AnimationManager.fadeIn(certificateScreen);
            this.currentScreen = 'certificate';
            
            // Atualizar dados do certificado
            const userName = document.getElementById('certificateUserName');
            const completionDate = document.getElementById('completionDate');
            
            if (userName && this.userData) {
                userName.textContent = this.userData.name;
            }
            
            if (completionDate) {
                completionDate.textContent = new Date().toLocaleDateString('pt-BR');
            }
        }
    }

    // Renderizar quiz
    renderQuiz(quiz) {
        return `
            <div class="quiz-container">
                <h3 class="quiz-question">${quiz.question}</h3>
                <div class="quiz-options">
                    ${quiz.options.map((option, index) => `
                        <div class="quiz-option" data-index="${index}">
                            <span class="quiz-option-text">${option.text}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="quiz-feedback" id="quizFeedback"></div>
            </div>
        `;
    }

    // Configurar eventos do quiz
    setupQuizEvents() {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', () => this.handleQuizAnswer(option));
        });
    }

    // Lidar com resposta do quiz
    handleQuizAnswer(selectedOption) {
        const options = document.querySelectorAll('.quiz-option');
        const selectedIndex = parseInt(selectedOption.dataset.index);
        const content = moduleData.getModuleContent(this.currentModule.id);
        const quiz = content[this.currentPage].quiz;
        const selectedAnswer = quiz.options[selectedIndex];

        // Desabilitar todas as opções
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Marcar resposta selecionada
        selectedOption.classList.add('selected');

        setTimeout(() => {
            // Mostrar respostas corretas/incorretas
            options.forEach((option, index) => {
                const isCorrect = quiz.options[index].correct;
                option.classList.add(isCorrect ? 'correct' : 'incorrect');
            });

            // Mostrar feedback
            this.showQuizFeedback(selectedAnswer.correct, quiz);
        }, 500);
    }

    // Mostrar feedback do quiz
    showQuizFeedback(isCorrect, quiz) {
        const feedbackElement = document.getElementById('quizFeedback');
        if (!feedbackElement) return;

        const feedbackClass = isCorrect ? 'correct' : 'incorrect';
        const feedbackIcon = isCorrect ? '🎉' : '💡';
        const feedbackTitle = isCorrect ? 'Parabéns!' : 'Quase lá!';
        const feedbackText = isCorrect ? quiz.feedback.correct : quiz.feedback.incorrect;

        feedbackElement.className = `quiz-feedback quiz-feedback--${feedbackClass}`;
        feedbackElement.innerHTML = `
            <div class="quiz-feedback-icon">${feedbackIcon}</div>
            <h4 class="quiz-feedback-title">${feedbackTitle}</h4>
            <p class="quiz-feedback-text">${feedbackText}</p>
            <div class="quiz-feedback-tip">
                <p class="quiz-feedback-tip-title">💡 Dica do Expert</p>
                <p class="quiz-feedback-tip-text">${quiz.tip}</p>
            </div>
        `;

        feedbackElement.classList.add('show');
        AnimationManager.slideUp(feedbackElement);
    }

    // Lidar com login
    async handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = {
            name: formData.get('userName'),
            email: formData.get('userEmail')
        };

        // Validar dados
        const validation = ValidationManager.validateLogin(userData);
        if (!validation.isValid) {
            Object.entries(validation.fields).forEach(([field, result]) => {
                const input = document.querySelector(`[name="${field}"]`);
                if (input) {
                    ValidationManager.showFieldFeedback(input, result.isValid, result.errors[0] || '');
                }
            });
            return;
        }

        // Mostrar loading
        const submitBtn = e.target.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }

        try {
            // Simular processamento
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Salvar dados do usuário
            this.userData = {
                ...userData,
                joinDate: new Date().toISOString()
            };

            StorageManager.saveUserData(this.userData);

            // Mostrar tela de boas-vindas
            await this.showWelcomeScreen();

        } catch (error) {
            this.showNotification('Erro ao fazer login. Tente novamente.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        }
    }

    // Salvar progresso
    saveProgress() {
        if (!StorageManager.isAvailable()) return;

        const progress = {};
        moduleData.modules.forEach(module => {
            progress[module.id] = {
                completedPages: module.completedPages,
                completed: module.completed,
                unlocked: module.unlocked
            };
        });

        StorageManager.saveModuleProgress(progress);
    }

    // Mostrar notificação
    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        notification.innerHTML = `
            <div class="notification-icon">${icons[type] || icons.info}</div>
            <div class="notification-content">
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close" aria-label="Fechar notificação">×</button>
        `;

        // Event listener para fechar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            AnimationManager.fadeOut(notification).then(() => {
                notification.remove();
            });
        });

        container.appendChild(notification);
        AnimationManager.slideInRight(notification);

        // Auto-remove após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                AnimationManager.fadeOut(notification).then(() => {
                    notification.remove();
                });
            }
        }, 5000);
    }

    // Mostrar erro
    showError(message) {
        this.showNotification(message, 'error');
    }

    // Esconder todas as telas
    hideAllScreens() {
        const screens = [
            'loginScreen',
            'welcomeScreen', 
            'dashboardScreen',
            'moduleContentScreen',
            'certificateScreen'
        ];

        screens.forEach(screenId => {
            const screen = document.getElementById(screenId);
            if (screen) {
                screen.style.display = 'none';
            }
        });
    }

    // Lidar com teclado
    handleKeyboard(e) {
        // ESC para fechar modal
        if (e.key === 'Escape') {
            this.closeModal();
        }

        // Enter no modal de senha
        if (e.key === 'Enter' && this.currentScreen === 'login') {
            const passwordModal = document.getElementById('passwordModal');
            if (passwordModal && passwordModal.classList.contains('show')) {
                this.confirmPassword();
            }
        }

        // Navegação por setas no módulo
        if (this.currentScreen === 'module') {
            if (e.key === 'ArrowLeft') {
                this.previousPage();
            } else if (e.key === 'ArrowRight') {
                this.nextPage();
            }
        }
    }
}

// Inicializar aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DestraveApp();
});

