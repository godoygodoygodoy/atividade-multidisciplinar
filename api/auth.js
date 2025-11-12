/* =====================================================================
   API DE AUTENTICAÇÃO - Serverless Function
   =====================================================================
   
   Endpoints:
   - POST /api/auth?action=login
   - POST /api/auth?action=register
===================================================================== */

// Importar bcrypt para hash de senhas (será instalado pela Vercel automaticamente)
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Método não permitido' });
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

    const { action, email, password, name } = req.body;

    try {
        if (action === 'login') {
            return await handleLogin(email, password, res, API_URL, API_KEY, DATA_SOURCE, DATABASE);
        } else if (action === 'register') {
            return await handleRegister(name, email, password, res, API_URL, API_KEY, DATA_SOURCE, DATABASE);
        } else {
            return res.status(400).json({ success: false, message: 'Ação inválida' });
        }
    } catch (error) {
        console.error('❌ Erro na autenticação:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
}

// ===== LOGIN =====
async function handleLogin(email, password, res, API_URL, API_KEY, DATA_SOURCE, DATABASE) {
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'E-mail e senha são obrigatórios'
        });
    }

    try {
        // Buscar usuário por e-mail
        const response = await fetch(`${API_URL}/action/findOne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY
            },
            body: JSON.stringify({
                dataSource: DATA_SOURCE,
                database: DATABASE,
                collection: 'users',
                filter: { email: email.toLowerCase() }
            })
        });

        const result = await response.json();

        if (!result.document) {
            return res.status(401).json({
                success: false,
                message: 'E-mail ou senha inválidos'
            });
        }

        const user = result.document;

        // Verificar senha
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'E-mail ou senha inválidos'
            });
        }

        // Retornar usuário (sem senha)
        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin || false
            }
        });

    } catch (error) {
        console.error('❌ Erro no login:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao processar login'
        });
    }
}

// ===== REGISTRO =====
async function handleRegister(name, email, password, res, API_URL, API_KEY, DATA_SOURCE, DATABASE) {
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Nome, e-mail e senha são obrigatórios'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'A senha deve ter no mínimo 6 caracteres'
        });
    }

    try {
        const emailLower = email.toLowerCase();

        // Verificar se e-mail já existe
        const checkResponse = await fetch(`${API_URL}/action/findOne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY
            },
            body: JSON.stringify({
                dataSource: DATA_SOURCE,
                database: DATABASE,
                collection: 'users',
                filter: { email: emailLower }
            })
        });

        const checkResult = await checkResponse.json();

        if (checkResult.document) {
            return res.status(409).json({
                success: false,
                message: 'Este e-mail já está cadastrado'
            });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserir novo usuário
        const insertResponse = await fetch(`${API_URL}/action/insertOne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY
            },
            body: JSON.stringify({
                dataSource: DATA_SOURCE,
                database: DATABASE,
                collection: 'users',
                document: {
                    name,
                    email: emailLower,
                    password: hashedPassword,
                    isAdmin: false,
                    createdAt: new Date().toISOString()
                }
            })
        });

        const insertResult = await insertResponse.json();

        if (insertResult.insertedId) {
            return res.status(201).json({
                success: true,
                message: 'Usuário cadastrado com sucesso'
            });
        } else {
            throw new Error('Falha ao inserir usuário');
        }

    } catch (error) {
        console.error('❌ Erro no registro:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao criar conta'
        });
    }
}
