/* =====================================================================
   SCRIPT PARA CRIAR USUÁRIO ADMINISTRADOR
   =====================================================================
   
   Execute este script para criar o primeiro usuário admin no MongoDB.
   
   Como usar:
   1. Configure suas credenciais no .env
   2. Execute: node scripts/create-admin.js
===================================================================== */

import bcrypt from 'bcryptjs';

async function createAdmin() {
    console.log('🚀 Criando usuário administrador...\n');

    const API_URL = process.env.MONGODB_DATA_API_URL;
    const API_KEY = process.env.MONGODB_API_KEY;
    const DATA_SOURCE = process.env.MONGODB_DATA_SOURCE || 'Cluster0';
    const DATABASE = process.env.MONGODB_DATABASE || 'devops_projeto';

    if (!API_URL || !API_KEY) {
        console.error('❌ Configure as variáveis MONGODB_DATA_API_URL e MONGODB_API_KEY no .env');
        process.exit(1);
    }

    // Dados do admin
    const adminData = {
        name: 'Administrador',
        email: 'admin@sistema.com',
        password: 'admin123', // Será hash
        isAdmin: true,
        createdAt: new Date().toISOString()
    };

    try {
        // Verificar se admin já existe
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
                filter: { email: adminData.email }
            })
        });

        const checkResult = await checkResponse.json();

        if (checkResult.document) {
            console.log('⚠️  Usuário admin já existe!');
            console.log('📧 E-mail:', adminData.email);
            return;
        }

        // Hash da senha
        console.log('🔐 Gerando hash da senha...');
        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        // Inserir admin
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
                    ...adminData,
                    password: hashedPassword
                }
            })
        });

        const insertResult = await insertResponse.json();

        if (insertResult.insertedId) {
            console.log('\n✅ Usuário administrador criado com sucesso!\n');
            console.log('📋 Credenciais:');
            console.log('   E-mail:', adminData.email);
            console.log('   Senha:', adminData.password);
            console.log('\n⚠️  IMPORTANTE: Anote essas credenciais!');
            console.log('   Use-as para fazer o primeiro login no sistema.');
        } else {
            throw new Error('Falha ao inserir admin');
        }

    } catch (error) {
        console.error('\n❌ Erro ao criar admin:', error.message);
        process.exit(1);
    }
}

createAdmin();
