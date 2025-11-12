/* =====================================================================
   API DE GERENCIAMENTO DE USUÁRIOS - Serverless Function
   =====================================================================
   
   Endpoints:
   - GET /api/users (listar todos)
   - DELETE /api/users (excluir usuário)
===================================================================== */

export default async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Buscar variáveis de ambiente
    const API_URL = process.env.MONGODB_DATA_API_URL;
    const API_KEY = process.env.MONGODB_API_KEY;
    const DATA_SOURCE = process.env.MONGODB_DATA_SOURCE || 'Cluster0';
    const DATABASE = process.env.MONGODB_DATABASE || 'devops_projeto';

    if (!API_URL || !API_KEY) {
        return res.status(500).json({
            success: false,
            message: 'Configuração incompleta do servidor'
        });
    }

    try {
        if (req.method === 'GET') {
            return await listUsers(res, API_URL, API_KEY, DATA_SOURCE, DATABASE);
        } else if (req.method === 'DELETE') {
            const { userId } = req.body;
            return await deleteUser(userId, res, API_URL, API_KEY, DATA_SOURCE, DATABASE);
        } else {
            return res.status(405).json({
                success: false,
                message: 'Método não permitido'
            });
        }
    } catch (error) {
        console.error('❌ Erro na API de usuários:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
}

// ===== LISTAR USUÁRIOS =====
async function listUsers(res, API_URL, API_KEY, DATA_SOURCE, DATABASE) {
    try {
        const response = await fetch(`${API_URL}/action/find`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY
            },
            body: JSON.stringify({
                dataSource: DATA_SOURCE,
                database: DATABASE,
                collection: 'users',
                projection: {
                    password: 0 // Não retornar senhas
                }
            })
        });

        const result = await response.json();

        return res.status(200).json({
            success: true,
            users: result.documents || []
        });

    } catch (error) {
        console.error('❌ Erro ao listar usuários:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao buscar usuários'
        });
    }
}

// ===== EXCLUIR USUÁRIO =====
async function deleteUser(userId, res, API_URL, API_KEY, DATA_SOURCE, DATABASE) {
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'ID do usuário é obrigatório'
        });
    }

    try {
        const response = await fetch(`${API_URL}/action/deleteOne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY
            },
            body: JSON.stringify({
                dataSource: DATA_SOURCE,
                database: DATABASE,
                collection: 'users',
                filter: { _id: { $oid: userId } }
            })
        });

        const result = await response.json();

        if (result.deletedCount > 0) {
            return res.status(200).json({
                success: true,
                message: 'Usuário excluído com sucesso'
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }

    } catch (error) {
        console.error('❌ Erro ao excluir usuário:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao excluir usuário'
        });
    }
}
