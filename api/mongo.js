/* =====================================================================
   SERVERLESS FUNCTION - MongoDB Data API
   =====================================================================
   
   Este arquivo é uma função serverless da Vercel que atua como
   BACKEND SEGURO para acessar o MongoDB Atlas Data API.
   
   Por que precisamos disso?
   - O frontend (HTML/CSS/JS) roda no navegador do usuário
   - Não podemos colocar API_KEY no código do frontend (qualquer um vê!)
   - Esta função roda no servidor da Vercel
   - Ela recebe requisições do frontend e faz chamadas autenticadas ao MongoDB
   
   Fluxo:
   1. Frontend chama: fetch('/api/mongo')
   2. Vercel executa esta função no servidor
   3. Função usa API_KEY (segura, do servidor)
   4. Função chama MongoDB Data API
   5. Função retorna dados para o frontend
   
   Variáveis de Ambiente (configurar na Vercel):
   - MONGODB_DATA_API_URL: URL do Data API do MongoDB Atlas
   - MONGODB_API_KEY: API Key gerada no MongoDB Atlas
   - MONGODB_DATA_SOURCE: Nome do cluster (ex: Cluster0)
   - MONGODB_DATABASE: Nome do banco (ex: devops_projeto)
===================================================================== */

// Esta é uma função serverless compatível com Vercel
export default async function handler(req, res) {
    // Configurar CORS para permitir requisições do frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Responder requisições OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Apenas aceitar GET
    if (req.method !== 'GET') {
        return res.status(405).json({ 
            error: 'Método não permitido',
            message: 'Use GET para buscar dados' 
        });
    }

    // Buscar variáveis de ambiente
    const API_URL = process.env.MONGODB_DATA_API_URL;
    const API_KEY = process.env.MONGODB_API_KEY;
    const DATA_SOURCE = process.env.MONGODB_DATA_SOURCE || 'Cluster0';
    const DATABASE = process.env.MONGODB_DATABASE || 'devops_projeto';

    // Validar que variáveis existem
    if (!API_URL || !API_KEY) {
        console.error('❌ Variáveis de ambiente não configuradas!');
        return res.status(500).json({
            error: 'Configuração incompleta',
            message: 'Configure MONGODB_DATA_API_URL e MONGODB_API_KEY na Vercel',
            details: {
                hasApiUrl: !!API_URL,
                hasApiKey: !!API_KEY
            }
        });
    }

    try {
        console.log('🔍 Buscando dados do MongoDB...');

        // Buscar Restaurantes em paralelo com Artistas para otimizar
        const [restaurantesResponse, artistasResponse] = await Promise.all([
            fetch(`${API_URL}/action/find`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': API_KEY
                },
                body: JSON.stringify({
                    dataSource: DATA_SOURCE,
                    database: DATABASE,
                    collection: 'restaurantes'
                })
            }),
            fetch(`${API_URL}/action/find`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': API_KEY
                },
                body: JSON.stringify({
                    dataSource: DATA_SOURCE,
                    database: DATABASE,
                    collection: 'artistas'
                })
            })
        ]);

        // Verificar se ambas as requisições foram bem-sucedidas
        if (!restaurantesResponse.ok || !artistasResponse.ok) {
            throw new Error('Falha ao buscar dados do MongoDB');
        }

        const restaurantesData = await restaurantesResponse.json();
        const artistasData = await artistasResponse.json();

        console.log(`✅ Dados obtidos: ${restaurantesData.documents?.length || 0} restaurantes, ${artistasData.documents?.length || 0} artistas`);

        // Retornar dados para o frontend
        return res.status(200).json({
            success: true,
            data: {
                restaurantes: restaurantesData.documents || [],
                artistas: artistasData.documents || []
            },
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Erro ao buscar dados:', error);
        
        return res.status(500).json({
            error: 'Erro ao buscar dados',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
}
