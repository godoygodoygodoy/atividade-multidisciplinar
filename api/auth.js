import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }
    
    const { action, email, password, name } = req.body;
    
    // Configuração MongoDB
    const MONGODB_DATA_API_URL = process.env.MONGODB_DATA_API_URL;
    const MONGODB_API_KEY = process.env.MONGODB_API_KEY;
    const MONGODB_DATA_SOURCE = process.env.MONGODB_DATA_SOURCE;
    const MONGODB_DATABASE = process.env.MONGODB_DATABASE;
    
    if (!MONGODB_DATA_API_URL || !MONGODB_API_KEY) {
        return res.status(500).json({ error: 'Configuração do servidor incompleta' });
    }
    
    try {
        if (action === 'login') {
            // Buscar usuário
            const findResponse = await fetch(`${MONGODB_DATA_API_URL}/action/findOne`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': MONGODB_API_KEY
                },
                body: JSON.stringify({
                    dataSource: MONGODB_DATA_SOURCE,
                    database: MONGODB_DATABASE,
                    collection: 'users',
                    filter: { email }
                })
            });
            
            const findData = await findResponse.json();
            
            if (!findData.document) {
                return res.status(401).json({ error: 'E-mail ou senha incorretos' });
            }
            
            const user = findData.document;
            
            // Verificar senha
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (!passwordMatch) {
                return res.status(401).json({ error: 'E-mail ou senha incorretos' });
            }
            
            // Retornar usuário sem a senha
            const { password: _, ...userWithoutPassword } = user;
            
            return res.status(200).json({
                success: true,
                user: userWithoutPassword,
                token: 'authenticated'
            });
            
        } else if (action === 'register') {
            // Validar campos
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            }
            
            if (password.length < 6) {
                return res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres' });
            }
            
            // Verificar se o e-mail já existe
            const checkResponse = await fetch(`${MONGODB_DATA_API_URL}/action/findOne`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': MONGODB_API_KEY
                },
                body: JSON.stringify({
                    dataSource: MONGODB_DATA_SOURCE,
                    database: MONGODB_DATABASE,
                    collection: 'users',
                    filter: { email }
                })
            });
            
            const checkData = await checkResponse.json();
            
            if (checkData.document) {
                return res.status(400).json({ error: 'E-mail já cadastrado' });
            }
            
            // Hash da senha
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Criar usuário
            const insertResponse = await fetch(`${MONGODB_DATA_API_URL}/action/insertOne`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': MONGODB_API_KEY
                },
                body: JSON.stringify({
                    dataSource: MONGODB_DATA_SOURCE,
                    database: MONGODB_DATABASE,
                    collection: 'users',
                    document: {
                        name,
                        email,
                        password: hashedPassword,
                        isAdmin: false,
                        createdAt: new Date().toISOString()
                    }
                })
            });
            
            const insertData = await insertResponse.json();
            
            if (insertData.insertedId) {
                return res.status(201).json({
                    success: true,
                    message: 'Usuário cadastrado com sucesso'
                });
            } else {
                return res.status(500).json({ error: 'Erro ao criar usuário' });
            }
            
        } else {
            return res.status(400).json({ error: 'Ação inválida' });
        }
        
    } catch (error) {
        console.error('Erro no servidor:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}
