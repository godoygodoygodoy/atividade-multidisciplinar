/* =====================================================================
   SCRIPT PARA POPULAR MONGODB ATLAS
   =====================================================================
   
   Este script insere dados iniciais nas coleções do MongoDB Atlas
   usando a Data API.
   
   Como usar:
   
   1. Configure suas credenciais no arquivo .env (copie de .env.example)
   
   2. Execute o script:
      node scripts/populate-db.js
   
   3. O script vai:
      - Limpar as coleções existentes (se houver)
      - Inserir dados de exemplo
      - Mostrar confirmação
   
   IMPORTANTE: Execute este script APENAS UMA VEZ para popular o banco!
===================================================================== */

// Dados de Restaurantes
const restaurantes = [
    {
        nome: "La Bella Pasta",
        especialidade: "Italiana",
        avaliacao: 5,
        preco: 3,
        pratos: [
            {
                nome: "Carbonara",
                descricao: "Massa com bacon, ovos e parmesão",
                valor: 45.90
            },
            {
                nome: "Pizza Margherita",
                descricao: "Pizza napolitana com manjericão fresco",
                valor: 38.00
            }
        ]
    },
    {
        nome: "Sushi Master",
        especialidade: "Japonesa",
        avaliacao: 4,
        preco: 4,
        pratos: [
            {
                nome: "Combo Premium",
                descricao: "20 peças variadas de sushi e sashimi",
                valor: 89.90
            },
            {
                nome: "Temaki Especial",
                descricao: "Cone de alga com salmão e cream cheese",
                valor: 25.00
            }
        ]
    },
    {
        nome: "Churrascaria Gaúcha",
        especialidade: "Brasileira",
        avaliacao: 5,
        preco: 3,
        pratos: [
            {
                nome: "Rodízio Premium",
                descricao: "Carnes nobres servidas na mesa",
                valor: 69.90
            },
            {
                nome: "Picanha Especial",
                descricao: "400g de picanha grelhada",
                valor: 55.00
            }
        ]
    }
];

// Dados de Artistas
const artistas = [
    {
        nome: "Legião Urbana",
        genero: "Rock Nacional",
        popularidade: 95,
        musicas: [
            {
                titulo: "Faroeste Caboclo",
                duracao: "9:03",
                album: "Que País é Este"
            },
            {
                titulo: "Tempo Perdido",
                duracao: "5:24",
                album: "Dois"
            },
            {
                titulo: "Será",
                duracao: "4:20",
                album: "Dois"
            }
        ]
    },
    {
        nome: "Elis Regina",
        genero: "MPB",
        popularidade: 92,
        musicas: [
            {
                titulo: "Águas de Março",
                duracao: "3:40",
                album: "Elis & Tom"
            },
            {
                titulo: "Como Nossos Pais",
                duracao: "4:30",
                album: "Falso Brilhante"
            }
        ]
    },
    {
        nome: "Djavan",
        genero: "MPB",
        popularidade: 88,
        musicas: [
            {
                titulo: "Flor de Lis",
                duracao: "3:55",
                album: "Luz"
            },
            {
                titulo: "Oceano",
                duracao: "4:05",
                album: "Oceano"
            }
        ]
    }
];

/* =====================================================================
   FUNÇÃO PRINCIPAL
===================================================================== */

async function popularBanco() {
    console.log('🚀 Iniciando população do banco de dados...\n');

    // Ler variáveis de ambiente (se usar Node.js local, instale: npm install dotenv)
    // require('dotenv').config();
    
    // Para usar este script, você precisa das seguintes variáveis:
    const API_URL = process.env.MONGODB_DATA_API_URL || 'CONFIGURE_NO_ENV';
    const API_KEY = process.env.MONGODB_API_KEY || 'CONFIGURE_NO_ENV';
    const DATA_SOURCE = process.env.MONGODB_DATA_SOURCE || 'Cluster0';
    const DATABASE = process.env.MONGODB_DATABASE || 'devops_projeto';

    if (API_URL === 'CONFIGURE_NO_ENV' || API_KEY === 'CONFIGURE_NO_ENV') {
        console.error('❌ ERRO: Configure as variáveis de ambiente no arquivo .env');
        console.error('   Copie .env.example para .env e preencha os valores.');
        process.exit(1);
    }

    try {
        // 1. Inserir Restaurantes
        console.log('📍 Inserindo restaurantes...');
        const restaurantesResponse = await fetch(`${API_URL}/action/insertMany`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY
            },
            body: JSON.stringify({
                dataSource: DATA_SOURCE,
                database: DATABASE,
                collection: 'restaurantes',
                documents: restaurantes
            })
        });

        if (!restaurantesResponse.ok) {
            throw new Error(`Erro ao inserir restaurantes: ${restaurantesResponse.status}`);
        }

        const restaurantesResult = await restaurantesResponse.json();
        console.log(`✅ ${restaurantesResult.insertedIds?.length || restaurantes.length} restaurantes inseridos!\n`);

        // 2. Inserir Artistas
        console.log('🎵 Inserindo artistas...');
        const artistasResponse = await fetch(`${API_URL}/action/insertMany`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY
            },
            body: JSON.stringify({
                dataSource: DATA_SOURCE,
                database: DATABASE,
                collection: 'artistas',
                documents: artistas
            })
        });

        if (!artistasResponse.ok) {
            throw new Error(`Erro ao inserir artistas: ${artistasResponse.status}`);
        }

        const artistasResult = await artistasResponse.json();
        console.log(`✅ ${artistasResult.insertedIds?.length || artistas.length} artistas inseridos!\n`);

        console.log('🎉 Banco de dados populado com sucesso!');
        console.log('\n📊 Resumo:');
        console.log(`   - Restaurantes: ${restaurantes.length}`);
        console.log(`   - Artistas: ${artistas.length}`);
        console.log(`   - Total de pratos: ${restaurantes.reduce((sum, r) => sum + r.pratos.length, 0)}`);
        console.log(`   - Total de músicas: ${artistas.reduce((sum, a) => sum + a.musicas.length, 0)}`);
        console.log('\n✨ Agora você pode acessar seu site e ver os dados reais!');

    } catch (error) {
        console.error('\n❌ Erro ao popular banco:', error.message);
        console.error('\n🔧 Verifique:');
        console.error('   1. As variáveis no .env estão corretas?');
        console.error('   2. A Data API está habilitada no MongoDB Atlas?');
        console.error('   3. O IP 0.0.0.0/0 está liberado no Network Access?');
        process.exit(1);
    }
}

// Executar se for chamado diretamente
if (typeof require !== 'undefined' && require.main === module) {
    popularBanco();
}

// Exportar para uso em outros scripts (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { popularBanco, restaurantes, artistas };
}
