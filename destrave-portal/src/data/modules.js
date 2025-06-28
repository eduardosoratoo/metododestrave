// Dados dos Módulos - Portal Destrave na Hora H

const moduleData = {
    modules: [
        {
            id: 1,
            title: "Desvendando a Introversão",
            subtitle: "Sua Força Oculta.",
            unlocked: true,
            hasPassword: false,
            completed: false,
            pages: 4,
            completedPages: 0,
            iconColor: "blue",
            icon: "🧠",
            description: "Descubra a diferença entre introversão e timidez, e aprenda a abraçar seus superpoderes únicos."
        },
        {
            id: 2,
            title: "A Chave do Destrave",
            subtitle: "O Mindset do Introvertido Poderoso.",
            unlocked: false,
            hasPassword: false,
            completed: false,
            pages: 4,
            completedPages: 0,
            iconColor: "teal",
            icon: "🔑",
            description: "Desenvolva autocompaixão, gerencie sua energia social e silencie o crítico interno."
        },
        {
            id: 3,
            title: "Comunicação Autêntica",
            subtitle: "Sua Voz, Seu Impacto.",
            unlocked: false,
            hasPassword: false,
            completed: false,
            pages: 4,
            completedPages: 0,
            iconColor: "purple",
            icon: "💬",
            description: "Aprenda a se comunicar com autenticidade e impacto, usando sua natureza introvertida como vantagem."
        },
        {
            id: 4,
            title: "Navegando em Ambientes Extrovertidos",
            subtitle: "Estratégias Práticas.",
            unlocked: false,
            hasPassword: true,
            password: "navegar",
            completed: false,
            pages: 4,
            completedPages: 0,
            iconColor: "blue",
            icon: "🧭",
            description: "Estratégias práticas para prosperar em ambientes dominados por extrovertidos."
        },
        {
            id: 5,
            title: "Liderança Introvertida",
            subtitle: "Inspirando pelo Exemplo Silencioso.",
            unlocked: false,
            hasPassword: true,
            password: "liderar",
            completed: false,
            pages: 4,
            completedPages: 0,
            iconColor: "teal",
            icon: "👑",
            description: "Descubra como liderar de forma autêntica, inspirando outros através do exemplo silencioso."
        },
        {
            id: 6,
            title: "Criatividade e Inovação",
            subtitle: "O Mundo Interior do Introvertido.",
            unlocked: false,
            hasPassword: true,
            password: "inovar",
            completed: false,
            pages: 4,
            completedPages: 0,
            iconColor: "purple",
            icon: "🎨",
            description: "Explore seu mundo interior rico e transforme sua criatividade em inovação prática."
        },
        {
            id: 7,
            title: "Relacionamentos Significativos",
            subtitle: "Conexões Profundas.",
            unlocked: false,
            hasPassword: true,
            password: "conectar",
            completed: false,
            pages: 4,
            completedPages: 0,
            iconColor: "blue",
            icon: "❤️",
            description: "Construa relacionamentos profundos e significativos que nutrem sua alma introvertida."
        },
        {
            id: 8,
            title: "Bem-Estar e Autocuidado",
            subtitle: "Priorizando Sua Saúde Mental.",
            unlocked: false,
            hasPassword: true,
            password: "cuidar",
            completed: false,
            pages: 4,
            completedPages: 0,
            iconColor: "teal",
            icon: "🌱",
            description: "Desenvolva práticas de autocuidado essenciais para manter seu bem-estar mental e emocional."
        },
        {
            id: 9,
            title: "O Introvertido no Mundo Digital",
            subtitle: "Conectando Online com Propósito.",
            unlocked: false,
            hasPassword: true,
            password: "digital",
            completed: false,
            pages: 4,
            completedPages: 0,
            iconColor: "purple",
            icon: "💻",
            description: "Navegue no mundo digital de forma autêntica e construa conexões online significativas."
        },
        {
            id: 10,
            title: "Seu Legado Introvertido",
            subtitle: "Impacto e Propósito.",
            unlocked: false,
            hasPassword: true,
            password: "legado",
            completed: false,
            pages: 5,
            completedPages: 0,
            iconColor: "blue",
            icon: "🌟",
            description: "Descubra seu propósito único e como deixar um legado duradouro sendo autenticamente você."
        }
    ],

    content: {
        1: [
            {
                title: "Módulo 1: Desvendando a Introversão",
                subtitle: "Capítulo 1.1: Introversão Não é Timidez",
                content: `
                    <h3>Você não é tímido, você só recarrega diferente!</h3>
                    <p>É super comum confundirem introversão com timidez, mas vamos esclarecer isso de uma vez por todas. Pense assim: sua 'bateria social' funciona de um jeito único.</p>
                    
                    <p><strong>Introversão</strong> é um traço de personalidade. É sobre como você obtém energia. Se você se sente revigorado depois de um tempo sozinho, lendo um livro ou ouvindo música, você provavelmente é introvertido. Você não tem medo de pessoas, apenas prefere interações mais profundas e menos estímulos.</p>
                    
                    <p><strong>Timidez</strong>, por outro lado, é ansiedade social. É o medo de ser julgado ou avaliado negativamente. Uma pessoa tímida pode querer muito estar em uma festa, mas o medo a paralisa. Um introvertido pode até ser um palestrante incrível, desde que tenha tempo para se preparar e recarregar as energias depois.</p>
                    
                    <div class="info-box">
                        <p class="info-box-title">💡 Ponto Chave</p>
                        <p><strong>Introversão = Fonte de Energia.</strong> Você recarrega na solitude.</p>
                        <p><strong>Timidez = Medo.</strong> É a ansiedade em situações sociais.</p>
                        <p>Entender essa diferença é o primeiro passo para abraçar quem você é, sem culpa!</p>
                    </div>
                `
            },
            {
                title: "Módulo 1: Desvendando a Introversão",
                subtitle: "Capítulo 1.2: Seus Superpoderes Escondidos",
                content: `
                    <h3>Você tem superpoderes. Sim, é sério.</h3>
                    <p>Seu jeito mais quieto e observador não é uma desvantagem. É a fonte de habilidades incríveis que, em um mundo barulhento, são raras e extremamente valiosas. Vamos conhecer algumas delas?</p>
                    
                    <ul>
                        <li><strong>🎧 A Superaudição (Escuta Profunda):</strong> Enquanto todos estão pensando no que vão falar, você realmente escuta. Você capta as entrelinhas, as emoções. Isso te torna um mestre em entender pessoas e resolver conflitos.</li>
                        
                        <li><strong>🧠 O Raio-X Mental (Análise Crítica):</strong> Sua mente vai fundo. Você não se contenta com o superficial, o que te torna excelente em planejamento, estratégia e em encontrar soluções que ninguém mais viu.</li>
                        
                        <li><strong>🎯 O Foco de Laser (Concentração):</strong> Em um mundo de distrações, sua capacidade de mergulhar em uma tarefa é ouro. Isso resulta em um trabalho de altíssima qualidade e precisão.</li>
                        
                        <li><strong>🧐 A Visão Além do Alcance (Observação Aguçada):</strong> Você lê o ambiente e as pessoas. Nota a linguagem corporal e as dinâmicas de grupo, o que te dá um mapa estratégico para qualquer interação social.</li>
                        
                        <li><strong>🧭 A Bússola Interna (Integridade):</strong> Quando você fala, suas palavras têm peso. Elas vêm de um lugar de convicção e autenticidade, e isso constrói uma confiança magnética.</li>
                    </ul>
                    
                    <div class="exercise-box">
                        <p class="exercise-box-title">✍️ Exercício de Reflexão</p>
                        <p>Pense em uma situação recente onde você usou um desses "superpoderes" sem perceber. Como isso impactou o resultado? Anote suas observações.</p>
                    </div>
                `
            },
            {
                title: "Módulo 1: Desvendando a Introversão",
                subtitle: "Capítulo 1.3: O Preço do Silêncio",
                content: `
                    <h3>Por que às vezes parece tão difícil?</h3>
                    <p>Mesmo com tantos superpoderes, sabemos que nem tudo são flores. Viver em um mundo que aplaude a extroversão pode trazer alguns desafios bem comuns. Se você se identificar com algum, saiba que não está sozinho e que há solução!</p>
                    
                    <ul>
                        <li><strong>Bateria em 1%:</strong> A famosa exaustão social. Reuniões longas e festas barulhentas podem te deixar completamente sem energia.</li>
                        
                        <li><strong>Aversão ao "Small Talk":</strong> Conversas sobre o tempo podem parecer uma perda de tempo para você, que prefere ir direto ao que importa.</li>
                        
                        <li><strong>O Fantasma da Invisibilidade:</strong> A frustração de ter uma ideia genial e ver outra pessoa, que falou mais alto, levar o crédito.</li>
                        
                        <li><strong>O Crítico Interno:</strong> Aquela vozinha que te julga e te faz pensar mil vezes antes de falar, paralisando você com o medo de errar.</li>
                    </ul>
                    
                    <div class="info-box">
                        <p class="info-box-title">💡 Fique Tranquilo(a)</p>
                        <p>Reconhecer esses desafios é o primeiro passo para superá-los. Nos próximos módulos, vamos te dar as ferramentas exatas para transformar cada um desses obstáculos em oportunidades.</p>
                    </div>
                    
                    <h4>A Jornada Começa Agora</h4>
                    <p>Você está prestes a embarcar em uma jornada de autodescoberta que mudará completamente sua perspectiva sobre ser introvertido. Prepare-se para descobrir não apenas quem você é, mas o incrível potencial que existe dentro de você.</p>
                `
            },
            {
                title: "Módulo 1: Conclusão e Quiz",
                subtitle: "Quiz: Hora de Testar seus Conhecimentos!",
                quiz: {
                    question: "Qual é a principal diferença entre introversão e timidez?",
                    options: [
                        {
                            text: "Não há diferença, são a mesma coisa.",
                            correct: false
                        },
                        {
                            text: "Introversão é sobre como você recarrega sua energia, enquanto a timidez é o medo do julgamento social.",
                            correct: true
                        },
                        {
                            text: "Introvertidos não gostam de pessoas, tímidos sim.",
                            correct: false
                        }
                    ],
                    feedback: {
                        correct: "Exato! Você entendeu a base de tudo. Introversão é sua forma de operar no mundo. Timidez é uma ansiedade que pode ser superada. Reconhecer isso é libertador!",
                        incorrect: "Quase lá! Lembre-se: Introversão é sobre ENERGIA (recarregar sozinho), enquanto timidez é sobre MEDO (do julgamento). Você pode ser um introvertido super confiante!"
                    },
                    tip: "Dica do Expert: Abrace sua necessidade de recarregar. Não é um defeito, é o seu design. É o que permite que seus superpoderes funcionem em máxima capacidade!"
                }
            }
        ],
        
        2: [
            {
                title: "Módulo 2: A Chave do Destrave",
                subtitle: "Capítulo 2.1: Aceitação e Autocompaixão",
                content: `
                    <h3>O passo mais importante: pare de tentar ser outra pessoa.</h3>
                    <p>A jornada para destravar seu potencial começa com a aceitação total de quem você é. Por muito tempo, a sociedade nos disse para 'sermos mais extrovertidos'. O resultado? Cansaço, frustração e a sensação de que estamos usando uma máscara.</p>
                    
                    <p>A verdadeira força não está em mudar, mas em <strong>otimizar quem você já é</strong>. Abrace sua introversão. Ela não é uma falha, é sua característica mais valiosa.</p>
                    
                    <div class="exercise-box">
                        <p class="exercise-box-title">✍️ Exercício Rápido: Reconheça seus Sinais</p>
                        <p>Pense na última vez que se sentiu esgotado(a) socialmente. Quais foram os sinais? Irritabilidade? Cansaço extremo? A sensação de estar 'atuando'? Anote. Reconhecer esses sinais é o primeiro passo para respeitar seus limites.</p>
                    </div>
                    
                    <h4>Seja gentil consigo mesmo.</h4>
                    <p>Autocompaixão é entender que sua necessidade de recarga e seu estilo de comunicação são válidos. Em vez de se criticar, diga a si mesmo: 'Eu opero de uma maneira diferente, e igualmente eficaz'.</p>
                `
            },
            {
                title: "Módulo 2: A Chave do Destrave",
                subtitle: "Capítulo 2.2: Gerenciando sua Energia Social",
                content: `
                    <h3>Sua energia social é um recurso precioso. Use-a com sabedoria!</h3>
                    <p>Pense na sua energia social como a bateria de um celular. Interações a drenam, a solitude a recarrega. Gerenciar isso é a chave para evitar a exaustão.</p>
                    
                    <h4>Estratégias Práticas:</h4>
                    <ul>
                        <li><strong>Planeje seus Eventos:</strong> Se tem uma festa ou reunião longa, reserve um tempo 'off' antes e depois.</li>
                        
                        <li><strong>Faça Pausas Estratégicas:</strong> Durante um evento, não hesite em dar uma 'escapada' de 5 minutos para tomar um ar.</li>
                        
                        <li><strong>Qualidade > Quantidade:</strong> Em vez de tentar falar com 20 pessoas, foque em ter 2 ou 3 conversas mais profundas.</li>
                        
                        <li><strong>Aprenda a Dizer 'Não':</strong> "Agradeço o convite, mas preciso de um tempo para mim" é um ato de autocuidado.</li>
                    </ul>
                    
                    <div class="info-box">
                        <p class="info-box-title">⚡ Dica de Energia</p>
                        <p>Crie um "ritual de recarga" pessoal. Pode ser 10 minutos de meditação, uma caminhada ou simplesmente ficar em silêncio. Pratique diariamente.</p>
                    </div>
                `
            },
            {
                title: "Módulo 2: A Chave do Destrave",
                subtitle: "Capítulo 2.3: Desativando o Crítico Interno",
                content: `
                    <h3>Aquela vozinha chata? Vamos colocá-la no mudo.</h3>
                    <p>O 'crítico interno' é aquela voz que diz: "Não fale, vão te achar bobo". Ele se alimenta do medo do julgamento. Desativá-lo é essencial para você agir.</p>
                    
                    <h4>Como silenciar essa voz:</h4>
                    <ol>
                        <li><strong>Identifique o Crítico:</strong> Dê um nome a essa voz. "Lá vem o Zé Furação de novo". Reconhecê-la já diminui seu poder.</li>
                        
                        <li><strong>Questione a Validade:</strong> O que ele diz é um fato ou um medo? Na maioria das vezes, são apenas suposições pessimistas.</li>
                        
                        <li><strong>Substitua o Pensamento:</strong> Quando o crítico disser "Você vai errar", responda internamente: "Eu me preparei, e mesmo que eu cometa um erro, o valor da minha mensagem continua o mesmo".</li>
                    </ol>
                    
                    <div class="info-box">
                        <p class="info-box-title">💡 Dica de Ouro: Foque no Conteúdo</p>
                        <p>Em vez de se preocupar com a sua performance, concentre-se no valor da sua mensagem. Quando você acredita no que tem a dizer, o medo do julgamento perde a força.</p>
                    </div>
                `
            },
            {
                title: "Módulo 2: Conclusão e Quiz",
                subtitle: "Quiz: Teste seu novo Mindset!",
                quiz: {
                    question: "Qual é a estratégia mais eficaz para evitar a exaustão social para um introvertido?",
                    options: [
                        {
                            text: "Forçar-se a participar de todos os eventos sociais para 'treinar'.",
                            correct: false
                        },
                        {
                            text: "Gerenciar a energia social como um recurso, planejando pausas e priorizando qualidade sobre quantidade.",
                            correct: true
                        },
                        {
                            text: "Evitar completamente situações sociais.",
                            correct: false
                        }
                    ],
                    feedback: {
                        correct: "Perfeito! Você entendeu que introversão não é sobre evitar pessoas, mas sobre gerenciar sua energia de forma inteligente. Isso é autoconhecimento em ação!",
                        incorrect: "Não exatamente. Lembre-se: não se trata de evitar ou forçar situações sociais, mas de gerenciar sua energia social como um recurso valioso. Qualidade sempre supera quantidade!"
                    },
                    tip: "Dica do Expert: Sua energia social é como combustível premium - use com propósito e você chegará muito mais longe!"
                }
            }
        ]
    },

    // Função para obter dados de um módulo específico
    getModule: function(moduleId) {
        return this.modules.find(module => module.id === moduleId);
    },

    // Função para obter conteúdo de um módulo específico
    getModuleContent: function(moduleId) {
        return this.content[moduleId] || [];
    },

    // Função para atualizar progresso de um módulo
    updateModuleProgress: function(moduleId, completedPages) {
        const module = this.getModule(moduleId);
        if (module) {
            module.completedPages = completedPages;
            if (completedPages >= module.pages) {
                module.completed = true;
                // Desbloquear próximo módulo
                const nextModule = this.getModule(moduleId + 1);
                if (nextModule && !nextModule.hasPassword) {
                    nextModule.unlocked = true;
                }
            }
        }
    },

    // Função para desbloquear módulo com senha
    unlockModule: function(moduleId, password) {
        const module = this.getModule(moduleId);
        if (module && module.hasPassword && module.password === password) {
            module.unlocked = true;
            return true;
        }
        return false;
    },

    // Função para calcular progresso geral
    getOverallProgress: function() {
        const totalModules = this.modules.length;
        const completedModules = this.modules.filter(module => module.completed).length;
        return Math.round((completedModules / totalModules) * 100);
    },

    // Função para obter estatísticas do usuário
    getUserStats: function() {
        const completedModules = this.modules.filter(module => module.completed).length;
        const totalPages = this.modules.reduce((sum, module) => sum + module.completedPages, 0);
        
        let level = 'Iniciante';
        if (completedModules >= 8) level = 'Expert';
        else if (completedModules >= 5) level = 'Avançado';
        else if (completedModules >= 2) level = 'Intermediário';
        
        return {
            points: totalPages * 10,
            level: level,
            achievements: completedModules
        };
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.moduleData = moduleData;
}

