export default async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Configuração MongoDB
    const MONGODB_DATA_API_URL = process.env.MONGODB_DATA_API_URL;
    const MONGODB_API_KEY = process.env.MONGODB_API_KEY;
    const MONGODB_DATA_SOURCE = process.env.MONGODB_DATA_SOURCE;
    const MONGODB_DATABASE = process.env.MONGODB_DATABASE;
    
    if (!MONGODB_DATA_API_URL || !MONGODB_API_KEY) {
        return res.status(500).json({ error: 'Configuração do servidor incompleta' });
    }
    
    try {
        if (req.method === 'GET') {
            // Listar todos os usuários
            const response = await fetch(`${MONGODB_DATA_API_URL}/action/find`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': MONGODB_API_KEY
                },
                body: JSON.stringify({
                    dataSource: MONGODB_DATA_SOURCE,
                    database: MONGODB_DATABASE,
                    collection: 'users',
                    filter: {},
                    projection: { password: 0 } // Não retornar senhas
                })
            });
            
            const data = await response.json();
            
            return res.status(200).json({
                success: true,
                users: data.documents || []
            });
            
        } else if (req.method === 'DELETE') {
            const { userId } = req.query;
            
            if (!userId) {
                return res.status(400).json({ error: 'ID do usuário não fornecido' });
            }
            
            // Deletar usuário
            const response = await fetch(`${MONGODB_DATA_API_URL}/action/deleteOne`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': MONGODB_API_KEY
                },
                body: JSON.stringify({
                    dataSource: MONGODB_DATA_SOURCE,
                    database: MONGODB_DATABASE,
                    collection: 'users',
                    filter: { _id: { $oid: userId } }
                })
            });
            
            const data = await response.json();
            
            if (data.deletedCount > 0) {
                return res.status(200).json({
                    success: true,
                    message: 'Usuário excluído com sucesso'
                });
            } else {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            
        } else {
            return res.status(405).json({ error: 'Método não permitido' });
        }
        
    } catch (error) {
        console.error('Erro no servidor:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}
