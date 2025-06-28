// Storage Utilities - Gerenciamento de dados locais

const StorageManager = {
    // Chaves para localStorage
    keys: {
        USER_DATA: 'destrave_user_data',
        MODULE_PROGRESS: 'destrave_module_progress',
        SETTINGS: 'destrave_settings',
        LAST_VISIT: 'destrave_last_visit'
    },

    // Salvar dados no localStorage com tratamento de erro
    save: function(key, data) {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
            return true;
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            return false;
        }
    },

    // Carregar dados do localStorage com tratamento de erro
    load: function(key, defaultValue = null) {
        try {
            const serializedData = localStorage.getItem(key);
            if (serializedData === null) {
                return defaultValue;
            }
            return JSON.parse(serializedData);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            return defaultValue;
        }
    },

    // Remover dados do localStorage
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Erro ao remover dados:', error);
            return false;
        }
    },

    // Limpar todos os dados da aplicação
    clear: function() {
        try {
            Object.values(this.keys).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (error) {
            console.error('Erro ao limpar dados:', error);
            return false;
        }
    },

    // Verificar se localStorage está disponível
    isAvailable: function() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    },

    // Salvar dados do usuário
    saveUserData: function(userData) {
        return this.save(this.keys.USER_DATA, {
            ...userData,
            lastUpdated: new Date().toISOString()
        });
    },

    // Carregar dados do usuário
    loadUserData: function() {
        return this.load(this.keys.USER_DATA, {
            name: '',
            email: '',
            joinDate: new Date().toISOString(),
            lastVisit: new Date().toISOString()
        });
    },

    // Salvar progresso dos módulos
    saveModuleProgress: function(moduleProgress) {
        return this.save(this.keys.MODULE_PROGRESS, {
            ...moduleProgress,
            lastUpdated: new Date().toISOString()
        });
    },

    // Carregar progresso dos módulos
    loadModuleProgress: function() {
        return this.load(this.keys.MODULE_PROGRESS, {});
    },

    // Salvar configurações da aplicação
    saveSettings: function(settings) {
        return this.save(this.keys.SETTINGS, {
            ...settings,
            lastUpdated: new Date().toISOString()
        });
    },

    // Carregar configurações da aplicação
    loadSettings: function() {
        return this.load(this.keys.SETTINGS, {
            theme: 'light',
            notifications: true,
            soundEffects: true,
            autoSave: true,
            language: 'pt-BR'
        });
    },

    // Registrar última visita
    recordLastVisit: function() {
        return this.save(this.keys.LAST_VISIT, new Date().toISOString());
    },

    // Obter última visita
    getLastVisit: function() {
        return this.load(this.keys.LAST_VISIT, new Date().toISOString());
    },

    // Exportar todos os dados para backup
    exportData: function() {
        const data = {};
        Object.entries(this.keys).forEach(([name, key]) => {
            data[name] = this.load(key);
        });
        return {
            exportDate: new Date().toISOString(),
            version: '1.0',
            data: data
        };
    },

    // Importar dados de backup
    importData: function(backupData) {
        try {
            if (!backupData.data) {
                throw new Error('Formato de backup inválido');
            }

            Object.entries(this.keys).forEach(([name, key]) => {
                if (backupData.data[name]) {
                    this.save(key, backupData.data[name]);
                }
            });

            return true;
        } catch (error) {
            console.error('Erro ao importar dados:', error);
            return false;
        }
    },

    // Obter tamanho dos dados armazenados
    getStorageSize: function() {
        let totalSize = 0;
        Object.values(this.keys).forEach(key => {
            const data = localStorage.getItem(key);
            if (data) {
                totalSize += data.length;
            }
        });
        return {
            bytes: totalSize,
            kb: Math.round(totalSize / 1024 * 100) / 100,
            mb: Math.round(totalSize / (1024 * 1024) * 100) / 100
        };
    },

    // Verificar se há dados salvos
    hasData: function() {
        return Object.values(this.keys).some(key => 
            localStorage.getItem(key) !== null
        );
    },

    // Migrar dados de versões antigas (se necessário)
    migrateData: function() {
        try {
            // Verificar se há dados de versões antigas
            const oldUserData = localStorage.getItem('userData');
            if (oldUserData) {
                const parsed = JSON.parse(oldUserData);
                this.saveUserData(parsed);
                localStorage.removeItem('userData');
            }

            const oldProgress = localStorage.getItem('moduleProgress');
            if (oldProgress) {
                const parsed = JSON.parse(oldProgress);
                this.saveModuleProgress(parsed);
                localStorage.removeItem('moduleProgress');
            }

            return true;
        } catch (error) {
            console.error('Erro na migração de dados:', error);
            return false;
        }
    }
};

// Inicializar storage manager
if (typeof window !== 'undefined') {
    // Verificar disponibilidade do localStorage
    if (!StorageManager.isAvailable()) {
        console.warn('localStorage não está disponível. Dados não serão persistidos.');
    } else {
        // Migrar dados se necessário
        StorageManager.migrateData();
        
        // Registrar última visita
        StorageManager.recordLastVisit();
    }

    // Exportar para uso global
    window.StorageManager = StorageManager;
}

// Auto-save periódico (a cada 30 segundos)
if (typeof window !== 'undefined' && StorageManager.isAvailable()) {
    setInterval(() => {
        const settings = StorageManager.loadSettings();
        if (settings.autoSave) {
            // Salvar dados atuais se houver mudanças
            const event = new CustomEvent('autoSave');
            window.dispatchEvent(event);
        }
    }, 30000);
}

