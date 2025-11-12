/* =====================================================================
   PROJETO DEVOPS - PROGRAMAÇÃO ORIENTADA A OBJETOS (POO)
   =====================================================================
   
   Este arquivo demonstra os 4 pilares da POO:
   1. ENCAPSULAMENTO - Dados e métodos agrupados em classes
   2. ABSTRAÇÃO - Esconder complexidade, expor funcionalidades simples
   3. HERANÇA - (Não usado aqui, mas poderia ter classe "Item" como pai)
   4. POLIMORFISMO - Todos têm método render(), mas comportamento diferente
   
   EXPLICAÇÃO COPILOT: O que é uma Classe?
   Uma classe é um modelo/template (blueprint) para criar objetos com 
   propriedades e métodos específicos. É como uma "forma de bolo" que 
   permite criar vários "bolos" (objetos) com a mesma estrutura.
   É um dos pilares fundamentais da Programação Orientada a Objetos (POO).
   
   EXPLICAÇÃO COPILOT: Por que usar POO?
   - REUTILIZAÇÃO: Escrevo a classe uma vez, crio N objetos
   - ORGANIZAÇÃO: Código estruturado e fácil de manter
   - ESCALABILIDADE: Fácil adicionar novos recursos
   - LEGIBILIDADE: Fica claro o que cada parte do código faz
===================================================================== */

/* =====================================================================
   CLASSE RESTAURANTE
   =====================================================================
   
   EXPLICAÇÃO COPILOT: O que é um Constructor?
   O constructor é um método ESPECIAL que é executado AUTOMATICAMENTE 
   quando criamos uma nova instância da classe usando 'new'.
   Ele inicializa as propriedades do objeto com os valores fornecidos.
   
   Exemplo:
   const resto = new Restaurante('Pizza Hut', 'Italiana', 4, 2);
   - O constructor recebe esses 4 parâmetros
   - Atribui cada um às propriedades do objeto (this.nome, this.especialidade, etc)
   - Inicializa um array vazio 'pratos'
===================================================================== */
class Restaurante {
    constructor(nome, especialidade, avaliacao, preco) {
        /* EXPLICAÇÃO COPILOT: O que é 'this'?
           'this' se refere à instância ATUAL do objeto que está sendo criado.
           Quando dizemos 'this.nome = nome', estamos dizendo:
           "Pegue o parâmetro 'nome' que recebi e guarde na propriedade 
           'nome' DESTE objeto específico".
           
           Se criarmos 2 restaurantes:
           const r1 = new Restaurante('A', ..., ..., ...);
           const r2 = new Restaurante('B', ..., ..., ...);
           
           r1.nome será 'A' e r2.nome será 'B'. O 'this' garante que 
           cada objeto tenha seus próprios valores independentes.
        */
        this.nome = nome;
        this.especialidade = especialidade;
        this.avaliacao = avaliacao; // 1 a 5 estrelas
        this.preco = preco; // 1 a 3 ($, $$, $$$)
        this.pratos = []; // Array que guardará objetos do tipo Prato
    }

    /* EXPLICAÇÃO COPILOT: O que são Métodos de Instância?
       Métodos são "funções" que pertencem a um objeto.
       Cada restaurante pode executar 'adicionarPrato()'.
       Isso demonstra ENCAPSULAMENTO - o objeto gerencia seus próprios dados.
    */
    adicionarPrato(prato) {
        this.pratos.push(prato);
    }

    /* EXPLICAÇÃO COPILOT: Por que métodos 'render()' são úteis?
       O método render() segue o padrão de SEPARAÇÃO DE RESPONSABILIDADES.
       Cada classe sabe como se APRESENTAR VISUALMENTE.
       
       Vantagens:
       - Se quiser mudar o HTML de restaurantes, venho aqui
       - Não preciso duplicar código HTML em vários lugares
       - Facilita manutenção e testes
       
       Isso também demonstra ENCAPSULAMENTO: a classe Restaurante
       "sabe" transformar seus dados em HTML. O código externo
       não precisa saber os detalhes, só chama .render().
    */
    render() {
        return `
            <div class="card restaurante-card">
                <h2>🍽️ ${this.nome}</h2>
                <p><strong>Especialidade:</strong> ${this.especialidade}</p>
                <p><strong>Avaliação:</strong> ${'⭐'.repeat(this.avaliacao)}</p>
                <p><strong>Faixa de Preço:</strong> ${'💰'.repeat(this.preco)}</p>
                <div class="pratos">
                    <h3>Menu:</h3>
                    ${this.pratos.map(p => p.render()).join('')}
                </div>
            </div>
        `;
    }

    /* EXPLICAÇÃO COPILOT: O que é um Método Estático? (Bônus)
       Métodos estáticos pertencem à CLASSE, não à instância.
       Exemplo: Restaurante.fromJSON(data) - não precisa de um objeto criado
    */
    static fromJSON(data) {
        const restaurante = new Restaurante(
            data.nome,
            data.especialidade,
            data.avaliacao,
            data.preco
        );
        
        // Se o JSON tiver pratos, adiciona cada um
        if (data.pratos && Array.isArray(data.pratos)) {
            data.pratos.forEach(pratoData => {
                restaurante.adicionarPrato(Prato.fromJSON(pratoData));
            });
        }
        
        return restaurante;
    }
}

/* =====================================================================
   CLASSE PRATO
   =====================================================================
   
   EXPLICAÇÃO COPILOT: O que é Herança vs Composição?
   Aqui usamos COMPOSIÇÃO (não herança).
   
   - HERANÇA seria: class Prato extends Item
     (Prato "É UM" Item)
   
   - COMPOSIÇÃO é: Restaurante "TEM" Pratos
     (this.pratos = [])
   
   PRINCÍPIO: "Favor Composition Over Inheritance"
   Composição é mais flexível. Um restaurante pode ter N pratos,
   mas um prato não "herda" de restaurante.
===================================================================== */
class Prato {
    constructor(nome, descricao, valor) {
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
    }

    render() {
        return `
            <div class="prato">
                <h4>🍴 ${this.nome} - R$ ${this.valor.toFixed(2)}</h4>
                <p>${this.descricao}</p>
            </div>
        `;
    }

    static fromJSON(data) {
        return new Prato(data.nome, data.descricao, data.valor);
    }
}

/* =====================================================================
   CLASSE ARTISTA
   =====================================================================
   
   EXPLICAÇÃO COPILOT: Reutilização de Padrões
   Note que Artista segue a MESMA ESTRUTURA que Restaurante:
   - Constructor para inicializar
   - Array para guardar itens relacionados (músicas)
   - Método render() para exibir
   - Método estático fromJSON() para criar do banco
   
   Isso é CONSISTÊNCIA de código. Um desenvolvedor que entende
   Restaurante já entende Artista imediatamente.
===================================================================== */
class Artista {
    constructor(nome, genero, popularidade) {
        this.nome = nome;
        this.genero = genero;
        this.popularidade = popularidade; // 0 a 100
        this.musicas = [];
    }

    adicionarMusica(musica) {
        this.musicas.push(musica);
    }

    /* EXPLICAÇÃO COPILOT: POLIMORFISMO
       Polimorfismo significa "muitas formas".
       Tanto Restaurante quanto Artista têm render(),
       mas cada um retorna HTML diferente.
       
       O código que chama .render() não precisa saber
       se é Restaurante ou Artista. Ele só sabe que
       "esse objeto tem um método render() que retorna HTML".
       
       Isso permite código genérico como:
       objetos.forEach(obj => container.innerHTML += obj.render());
    */
    render() {
        return `
            <div class="card artista-card">
                <h2>🎵 ${this.nome}</h2>
                <p><strong>Gênero:</strong> ${this.genero}</p>
                <p><strong>Popularidade:</strong> ${this.popularidade}/100</p>
                <div class="musicas">
                    <h3>Top Músicas:</h3>
                    ${this.musicas.map(m => m.render()).join('')}
                </div>
            </div>
        `;
    }

    static fromJSON(data) {
        const artista = new Artista(
            data.nome,
            data.genero,
            data.popularidade
        );
        
        if (data.musicas && Array.isArray(data.musicas)) {
            data.musicas.forEach(musicaData => {
                artista.adicionarMusica(Musica.fromJSON(musicaData));
            });
        }
        
        return artista;
    }
}

/* =====================================================================
   CLASSE MÚSICA
===================================================================== */
class Musica {
    constructor(titulo, duracao, album) {
        this.titulo = titulo;
        this.duracao = duracao; // Ex: "3:45"
        this.album = album;
    }

    render() {
        return `
            <div class="musica">
                <p>🎶 <strong>${this.titulo}</strong> (${this.duracao})</p>
                <p><em>Álbum: ${this.album}</em></p>
            </div>
        `;
    }

    static fromJSON(data) {
        return new Musica(data.titulo, data.duracao, data.album);
    }
}

/* =====================================================================
   CONFIGURAÇÃO - DADOS LOCAIS vs API
   =====================================================================
   
   EXPLICAÇÃO COPILOT: Por que usar variáveis de ambiente?
   
   Em desenvolvimento local: usamos dados falsos (mock data)
   Em produção: conectamos ao MongoDB via função serverless
   
   A constante USE_MOCK_DATA controla isso.
   
   Para ativar a API real:
   1. Configure as variáveis de ambiente na Vercel:
      - MONGODB_DATA_API_URL = https://data.mongodb-api.com/app/seu-app-id/endpoint
      - MONGODB_API_KEY = sua chave API do MongoDB Atlas
      - MONGODB_DATA_SOURCE = Cluster0 (ou nome do seu cluster)
      - MONGODB_DATABASE = devops_projeto (ou nome do seu banco)
   
   2. Mude USE_MOCK_DATA para false
   
   3. Faça commit e push - Vercel fará deploy automaticamente!
===================================================================== */

// Controla se usamos dados falsos ou API real
// PRODUÇÃO: mude para false após configurar variáveis na Vercel
const USE_MOCK_DATA = false;

/* =====================================================================
   DADOS MOCK (FALSOS) - SEMANA 1
   =====================================================================
   
   EXPLICAÇÃO COPILOT: Por que começar com Mock Data?
   
   Em DevOps profissional, você NUNCA depende de serviços externos
   logo no início. Primeiro você:
   1. Desenvolve a interface (UI)
   2. Testa com dados falsos
   3. Valida o design e UX
   4. SÓ DEPOIS integra com backend/banco de dados
   
   Isso permite:
   - Trabalhar offline
   - Não depender de banco de dados funcionando
   - Testar edge cases (dados estranhos)
===================================================================== */
function getDadosMock() {
    // Criar Restaurantes
    const restaurante1 = new Restaurante('La Bella Pasta', 'Italiana', 5, 3);
    restaurante1.adicionarPrato(new Prato('Carbonara', 'Massa com bacon, ovos e queijo parmesão', 45.90));
    restaurante1.adicionarPrato(new Prato('Margherita', 'Pizza tradicional napolitana com manjericão fresco', 38.00));
    restaurante1.adicionarPrato(new Prato('Tiramisu', 'Sobremesa italiana com café e mascarpone', 22.00));

    const restaurante2 = new Restaurante('Sushi Master', 'Japonesa', 4, 3);
    restaurante2.adicionarPrato(new Prato('Combinado Especial', '30 peças variadas de sushi e sashimi', 89.90));
    restaurante2.adicionarPrato(new Prato('Temaki de Salmão', 'Cone de alga com arroz e salmão', 28.00));
    restaurante2.adicionarPrato(new Prato('Yakisoba', 'Macarrão frito com legumes e carne', 35.00));

    // Criar Artistas
    const artista1 = new Artista('Legião Urbana', 'Rock Nacional', 95);
    artista1.adicionarMusica(new Musica('Faroeste Caboclo', '9:03', 'Que País é Este'));
    artista1.adicionarMusica(new Musica('Tempo Perdido', '5:24', 'Dois'));
    artista1.adicionarMusica(new Musica('Pais e Filhos', '5:08', 'As Quatro Estações'));

    const artista2 = new Artista('Marisa Monte', 'MPB', 88);
    artista2.adicionarMusica(new Musica('Ainda Bem', '3:45', 'Infinito Particular'));
    artista2.adicionarMusica(new Musica('Velha Infância', '4:12', 'Mais'));
    artista2.adicionarMusica(new Musica('Beija Eu', '3:38', 'Memórias, Crônicas e Declarações de Amor'));

    return {
        restaurantes: [restaurante1, restaurante2],
        artistas: [artista1, artista2]
    };
}

/* =====================================================================
   INTEGRAÇÃO COM API - SEMANA 2
   =====================================================================
   
   EXPLICAÇÃO COPILOT: Como funciona Fetch API?
   
   fetch() é a forma moderna de fazer requisições HTTP em JavaScript.
   É assíncrona (usa Promises/async-await) porque requisições de rede
   demoram e não podemos "travar" a página esperando.
   
   Fluxo:
   1. fetch(url) - Envia requisição
   2. await - Espera resposta
   3. response.json() - Converte resposta para objeto JS
   4. Usa os dados
===================================================================== */
async function getDadosAPI() {
    /* EXPLICAÇÃO COPILOT: Por que usar uma função serverless?
       
       Antes: Frontend chamava MongoDB Data API diretamente
       - Problema: API_KEY exposta no código (qualquer um vê!)
       
       Agora: Frontend chama /api/mongo (nossa função serverless)
       - A função serverless roda no servidor da Vercel
       - Ela tem acesso seguro às variáveis de ambiente
       - Ela faz a chamada autenticada ao MongoDB
       - Frontend recebe apenas os dados, sem expor credenciais
       
       Fluxo Seguro:
       1. Frontend: fetch('/api/mongo')
       2. Vercel executa api/mongo.js no servidor
       3. api/mongo.js usa API_KEY (segura, do servidor)
       4. api/mongo.js chama MongoDB Data API
       5. Frontend recebe os dados
       
       NUNCA coloque chaves diretamente no código frontend:
       ❌ const API_KEY = 'abc123' (qualquer um vê no GitHub!)
       ✅ Função serverless com process.env.API_KEY (seguro!)
    */

    try {
        console.log('🔍 Buscando dados via /api/mongo...');
        
        // Chamar nossa função serverless
        const response = await fetch('/api/mongo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Erro ao buscar dados');
        }

        console.log('✅ Dados recebidos da API:', result.data);

        // Converter JSON em objetos das classes
        const restaurantes = (result.data.restaurantes || []).map(doc => 
            Restaurante.fromJSON(doc)
        );

        const artistas = (result.data.artistas || []).map(doc => 
            Artista.fromJSON(doc)
        );

        return { restaurantes, artistas };

    } catch (error) {
        console.error('❌ Erro ao buscar dados da API:', error);
        // Se falhar, usa dados mock como fallback
        console.warn('⚠️  Usando dados mock como fallback...');
        return getDadosMock();
    }
}

/* =====================================================================
   RENDERIZAÇÃO NA PÁGINA
===================================================================== */
function renderizarDados(dados) {
    /* EXPLICAÇÃO COPILOT: Por que usar querySelector?
       
       querySelector() é mais moderno que getElementById().
       Permite usar seletores CSS completos:
       - document.querySelector('#id')
       - document.querySelector('.classe')
       - document.querySelector('div.card > h2')
       
       É mais flexível e consistente com como escrevemos CSS.
    */
    const restaurantesContainer = document.querySelector('#restaurantes .cards-container');
    const musicasContainer = document.querySelector('#musicas .cards-container');

    // Limpar containers
    restaurantesContainer.innerHTML = '';
    musicasContainer.innerHTML = '';

    /* EXPLICAÇÃO COPILOT: POLIMORFISMO em Ação
       
       Veja como é simples: não importa se é Restaurante ou Artista,
       todos têm .render(). O código abaixo funciona para qualquer
       objeto que tenha esse método.
       
       Isso é o poder do POLIMORFISMO - código genérico que funciona
       com diferentes tipos de objetos.
    */
    // Renderizar Restaurantes
    dados.restaurantes.forEach(restaurante => {
        restaurantesContainer.innerHTML += restaurante.render();
    });

    // Renderizar Artistas
    dados.artistas.forEach(artista => {
        musicasContainer.innerHTML += artista.render();
    });
}

/* =====================================================================
   INICIALIZAÇÃO DA APLICAÇÃO
   =====================================================================
   
   EXPLICAÇÃO COPILOT: Por que usar DOMContentLoaded?
   
   JavaScript roda ANTES do HTML estar totalmente carregado.
   Se tentarmos acessar elementos do DOM antes deles existirem,
   teremos erros.
   
   DOMContentLoaded garante que o código só rode APÓS o HTML
   estar completamente carregado e parseado.
   
   Alternativas:
   - Colocar <script> no final do <body>
   - Usar async/defer no <script>
   - Usar DOMContentLoaded (mais profissional)
===================================================================== */
async function inicializarApp() {
    console.log('🚀 Iniciando aplicação...');
    
    // Mostrar loading
    document.querySelector('#restaurantes .cards-container').innerHTML = 
        '<div class="loading">⏳ Carregando restaurantes...</div>';
    document.querySelector('#musicas .cards-container').innerHTML = 
        '<div class="loading">⏳ Carregando músicas...</div>';

    try {
        // Buscar dados (mock ou API)
        const dados = USE_MOCK_DATA ? getDadosMock() : await getDadosAPI();
        
        console.log('✅ Dados carregados:', dados);
        
        // Renderizar
        renderizarDados(dados);
        
        console.log('✅ Aplicação inicializada com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro ao inicializar aplicação:', error);
        
        // Mostrar erro na tela
        document.querySelector('#restaurantes .cards-container').innerHTML = 
            '<div class="error">❌ Erro ao carregar restaurantes. Verifique o console.</div>';
        document.querySelector('#musicas .cards-container').innerHTML = 
            '<div class="error">❌ Erro ao carregar músicas. Verifique o console.</div>';
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', inicializarApp);

/* =====================================================================
   CONCEITOS IMPORTANTES PARA A PROVA
   =====================================================================
   
   1. POO (Programação Orientada a Objetos):
      - Classes: Modelos para criar objetos
      - Constructor: Inicializa objetos
      - this: Referência ao objeto atual
      - Métodos: Funções que pertencem ao objeto
      - Encapsulamento: Dados + métodos juntos
      - Polimorfismo: Mesma interface, comportamento diferente
      - Composição: Objetos contêm outros objetos
   
   2. JavaScript Moderno:
      - const/let (não var)
      - Arrow functions: () => {}
      - Template literals: `${variavel}`
      - Async/Await: Código assíncrono limpo
      - Array methods: map(), forEach(), filter()
   
   3. Separação de Responsabilidades:
      - Cada classe tem UMA responsabilidade
      - HTML (estrutura) separado de CSS (estilo) separado de JS (lógica)
      - Mock data separado de API data
   
   4. Boas Práticas:
      - Comentários explicativos
      - Nomes descritivos de variáveis
      - Tratamento de erros (try/catch)
      - Console.log para debug
      - Código limpo e organizado
===================================================================== */
