import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_DATA_API_URL = process.env.MONGODB_DATA_API_URL;
const MONGODB_API_KEY = process.env.MONGODB_API_KEY;
const MONGODB_DATA_SOURCE = process.env.MONGODB_DATA_SOURCE;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE;

async function createAdmin() {
    console.log('🔧 Criando usuário administrador...\n');
    
    if (!MONGODB_DATA_API_URL || !MONGODB_API_KEY) {
        console.error('❌ Erro: Variáveis de ambiente do MongoDB não configuradas');
        console.error('   Configure MONGODB_DATA_API_URL e MONGODB_API_KEY no arquivo .env');
        process.exit(1);
    }
    
    const adminEmail = 'admin@sistema.com';
    const adminPassword = 'admin123';
    const adminName = 'Administrador';
    
    try {
        // Verificar se já existe um admin
        console.log('🔍 Verificando se o admin já existe...');
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
                filter: { email: adminEmail }
            })
        });
        
        const checkData = await checkResponse.json();
        
        if (checkData.document) {
            console.log('ℹ️  Admin já existe no sistema');
            console.log(`   E-mail: ${adminEmail}`);
            console.log('   Use esse e-mail para fazer login');
            return;
        }
        
        // Criar hash da senha
        console.log('🔒 Gerando hash da senha...');
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        
        // Inserir admin no banco
        console.log('💾 Salvando no banco de dados...');
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
                    name: adminName,
                    email: adminEmail,
                    password: hashedPassword,
                    isAdmin: true,
                    createdAt: new Date().toISOString()
                }
            })
        });
        
        const insertData = await insertResponse.json();
        
        if (insertData.insertedId) {
            console.log('\n✅ Admin criado com sucesso!\n');
            console.log('📋 Credenciais de acesso:');
            console.log(`   E-mail: ${adminEmail}`);
            console.log(`   Senha: ${adminPassword}`);
            console.log('\n⚠️  Altere a senha após o primeiro login!\n');
        } else {
            console.error('❌ Erro ao criar admin');
            console.error('   Resposta:', insertData);
        }
        
    } catch (error) {
        console.error('❌ Erro ao criar admin:', error.message);
        process.exit(1);
    }
}

createAdmin();
