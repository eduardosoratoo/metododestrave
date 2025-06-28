// Validation Utilities - Validação de formulários e dados

const ValidationManager = {
    // Regras de validação
    rules: {
        required: {
            test: (value) => value !== null && value !== undefined && value.toString().trim() !== '',
            message: 'Este campo é obrigatório'
        },
        
        email: {
            test: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Por favor, insira um e-mail válido'
        },
        
        minLength: (min) => ({
            test: (value) => value && value.toString().length >= min,
            message: `Deve ter pelo menos ${min} caracteres`
        }),
        
        maxLength: (max) => ({
            test: (value) => !value || value.toString().length <= max,
            message: `Deve ter no máximo ${max} caracteres`
        }),
        
        name: {
            test: (value) => {
                if (!value) return false;
                const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
                return nameRegex.test(value.trim());
            },
            message: 'Nome deve conter apenas letras e ter pelo menos 2 caracteres'
        },
        
        password: {
            test: (value) => {
                if (!value) return false;
                return value.length >= 3; // Senha simples para módulos
            },
            message: 'Senha deve ter pelo menos 3 caracteres'
        },
        
        noSpecialChars: {
            test: (value) => {
                if (!value) return true;
                const specialCharsRegex = /[<>\"'&]/;
                return !specialCharsRegex.test(value);
            },
            message: 'Não são permitidos caracteres especiais como < > " \' &'
        }
    },

    // Validar um campo específico
    validateField: function(value, rules) {
        const errors = [];
        
        for (const rule of rules) {
            if (typeof rule === 'string') {
                // Regra simples (ex: 'required', 'email')
                const ruleObj = this.rules[rule];
                if (ruleObj && !ruleObj.test(value)) {
                    errors.push(ruleObj.message);
                }
            } else if (typeof rule === 'object') {
                // Regra com parâmetros ou customizada
                if (!rule.test(value)) {
                    errors.push(rule.message);
                }
            } else if (typeof rule === 'function') {
                // Função de validação customizada
                const result = rule(value);
                if (result !== true) {
                    errors.push(result || 'Valor inválido');
                }
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    // Validar formulário completo
    validateForm: function(formData, validationSchema) {
        const results = {};
        let isFormValid = true;
        
        for (const [fieldName, rules] of Object.entries(validationSchema)) {
            const fieldValue = formData[fieldName];
            const fieldResult = this.validateField(fieldValue, rules);
            
            results[fieldName] = fieldResult;
            
            if (!fieldResult.isValid) {
                isFormValid = false;
            }
        }
        
        return {
            isValid: isFormValid,
            fields: results,
            errors: this.getFormErrors(results)
        };
    },

    // Extrair erros do formulário
    getFormErrors: function(validationResults) {
        const errors = {};
        
        for (const [fieldName, result] of Object.entries(validationResults)) {
            if (!result.isValid) {
                errors[fieldName] = result.errors;
            }
        }
        
        return errors;
    },

    // Sanitizar entrada do usuário
    sanitize: function(value) {
        if (typeof value !== 'string') {
            return value;
        }
        
        return value
            .trim()
            .replace(/[<>\"'&]/g, '') // Remove caracteres perigosos
            .replace(/\s+/g, ' '); // Normaliza espaços
    },

    // Validação em tempo real para inputs
    setupRealTimeValidation: function(inputElement, rules, errorElement) {
        if (!inputElement || !errorElement) return;
        
        const validateInput = () => {
            const value = inputElement.value;
            const result = this.validateField(value, rules);
            
            // Atualizar classes CSS
            inputElement.classList.remove('valid', 'invalid');
            if (value) { // Só aplicar estilos se houver valor
                inputElement.classList.add(result.isValid ? 'valid' : 'invalid');
            }
            
            // Atualizar mensagem de erro
            errorElement.textContent = result.isValid ? '' : result.errors[0] || '';
            errorElement.setAttribute('aria-live', 'polite');
            
            return result.isValid;
        };
        
        // Eventos para validação
        inputElement.addEventListener('blur', validateInput);
        inputElement.addEventListener('input', () => {
            // Debounce para evitar validação excessiva
            clearTimeout(inputElement.validationTimeout);
            inputElement.validationTimeout = setTimeout(validateInput, 300);
        });
        
        return validateInput;
    },

    // Esquemas de validação pré-definidos
    schemas: {
        login: {
            userName: ['required', 'name', 'noSpecialChars', ValidationManager.rules.minLength(2)],
            userEmail: ['required', 'email', 'noSpecialChars']
        },
        
        modulePassword: {
            password: ['required', ValidationManager.rules.minLength(3)]
        },
        
        feedback: {
            message: ['required', ValidationManager.rules.minLength(10), ValidationManager.rules.maxLength(500), 'noSpecialChars'],
            rating: [(value) => {
                const num = parseInt(value);
                return (num >= 1 && num <= 5) || 'Avaliação deve ser entre 1 e 5';
            }]
        }
    },

    // Validar dados do usuário para login
    validateLogin: function(userData) {
        return this.validateForm(userData, this.schemas.login);
    },

    // Validar senha do módulo
    validateModulePassword: function(password) {
        return this.validateField(password, this.schemas.modulePassword.password);
    },

    // Validar e sanitizar dados antes de salvar
    prepareDataForStorage: function(data) {
        const sanitizedData = {};
        
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'string') {
                sanitizedData[key] = this.sanitize(value);
            } else {
                sanitizedData[key] = value;
            }
        }
        
        return sanitizedData;
    },

    // Mostrar feedback visual de validação
    showFieldFeedback: function(fieldElement, isValid, message = '') {
        if (!fieldElement) return;
        
        // Remover classes anteriores
        fieldElement.classList.remove('valid', 'invalid');
        
        // Adicionar nova classe
        if (isValid) {
            fieldElement.classList.add('valid');
        } else {
            fieldElement.classList.add('invalid');
        }
        
        // Encontrar elemento de erro associado
        const errorElement = document.getElementById(fieldElement.id + '-error') ||
                           fieldElement.parentNode.querySelector('.form-error');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.setAttribute('aria-live', 'polite');
        }
        
        // Acessibilidade: anunciar erro para screen readers
        if (!isValid && message) {
            fieldElement.setAttribute('aria-describedby', errorElement?.id || '');
            fieldElement.setAttribute('aria-invalid', 'true');
        } else {
            fieldElement.removeAttribute('aria-invalid');
        }
    },

    // Limpar feedback de validação
    clearFieldFeedback: function(fieldElement) {
        if (!fieldElement) return;
        
        fieldElement.classList.remove('valid', 'invalid');
        fieldElement.removeAttribute('aria-invalid');
        
        const errorElement = document.getElementById(fieldElement.id + '-error') ||
                           fieldElement.parentNode.querySelector('.form-error');
        
        if (errorElement) {
            errorElement.textContent = '';
        }
    },

    // Validação de acessibilidade
    validateAccessibility: function(formElement) {
        const issues = [];
        
        if (!formElement) return issues;
        
        // Verificar labels
        const inputs = formElement.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            const label = formElement.querySelector(`label[for="${input.id}"]`);
            if (!label && !input.getAttribute('aria-label')) {
                issues.push(`Campo ${input.name || input.id} não possui label associado`);
            }
        });
        
        // Verificar elementos de erro
        const errorElements = formElement.querySelectorAll('.form-error');
        errorElements.forEach(error => {
            if (!error.id) {
                issues.push('Elemento de erro não possui ID para associação');
            }
        });
        
        return issues;
    }
};

// Inicialização automática
if (typeof window !== 'undefined') {
    // Exportar para uso global
    window.ValidationManager = ValidationManager;
    
    // Configurar validação automática para formulários com atributo data-validate
    document.addEventListener('DOMContentLoaded', () => {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            const schemaName = form.getAttribute('data-validate');
            const schema = ValidationManager.schemas[schemaName];
            
            if (schema) {
                // Configurar validação em tempo real para cada campo
                Object.keys(schema).forEach(fieldName => {
                    const input = form.querySelector(`[name="${fieldName}"]`);
                    const errorElement = form.querySelector(`#${fieldName}-error`);
                    
                    if (input && errorElement) {
                        ValidationManager.setupRealTimeValidation(
                            input, 
                            schema[fieldName], 
                            errorElement
                        );
                    }
                });
                
                // Validar formulário no submit
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
                    const result = ValidationManager.validateForm(data, schema);
                    
                    if (result.isValid) {
                        // Disparar evento customizado para formulário válido
                        const validEvent = new CustomEvent('formValid', {
                            detail: { data: data, form: form }
                        });
                        form.dispatchEvent(validEvent);
                    } else {
                        // Mostrar erros
                        Object.entries(result.fields).forEach(([fieldName, fieldResult]) => {
                            const input = form.querySelector(`[name="${fieldName}"]`);
                            if (input) {
                                ValidationManager.showFieldFeedback(
                                    input,
                                    fieldResult.isValid,
                                    fieldResult.errors[0] || ''
                                );
                            }
                        });
                    }
                });
            }
        });
    });
}

