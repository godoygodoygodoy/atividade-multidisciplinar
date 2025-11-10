# API Serverless (Vercel) - MongoDB Data API

## Rotas Criadas

| Rota | Método | Descrição |
|------|--------|-----------|
| `/api/users/create` | POST | Cria um usuário no MongoDB |
| `/api/users/list` | GET | Lista usuários do MongoDB |

## Variáveis de Ambiente Necessárias (Configurar no Vercel)
```
MONGODB_DATA_API_URL=https://data.mongodb-api.com/app/<APP-ID>/endpoint/data/v1
MONGODB_DATA_API_KEY=<SUA_API_KEY>
MONGODB_DATA_SOURCE=Cluster0
MONGODB_DB=atividade
MONGODB_COLLECTION=users
```

## Exemplo de Requisição (Create)
```bash
curl -X POST https://SEU-DEPLOY.vercel.app/api/users/create \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria","email":"maria@example.com"}'
```

Resposta:
```json
{ "ok": true, "insertedId": "<ID>" }
```

## Exemplo de Requisição (List)
```bash
curl https://SEU-DEPLOY.vercel.app/api/users/list
```

Resposta:
```json
{ "ok": true, "users": [ {"_id": {"$oid": "..."}, "nome": "Maria", "email": "maria@example.com" } ] }
```

## Observações
- Usa **MongoDB Atlas Data API** (não precisa driver nem servidor Node dedicado)
- Ideal para hospedagem estática + funções serverless
- Limitações: Latência maior que conexão direta, limites de payload

## Próximos Passos
- Adicionar `/api/users/update`
- Adicionar `/api/users/delete`
- Proteger rotas com token (ex: JWT ou API Key custom)
- Paginação e filtros avançados
