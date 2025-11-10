/*
 Vercel Serverless Function - Create User via MongoDB Atlas Data API
 Requer variáveis de ambiente no Vercel:
 - MONGODB_DATA_API_URL        (ex: https://data.mongodb-api.com/app/<APP-ID>/endpoint/data/v1)
 - MONGODB_DATA_API_KEY        (API Key do Data API)
 - MONGODB_DATA_SOURCE         (ex: Cluster0)
 - MONGODB_DB                  (ex: atividade)
 - MONGODB_COLLECTION          (ex: users)
*/

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
  }

  try {
    const {
      MONGODB_DATA_API_URL,
      MONGODB_DATA_API_KEY,
      MONGODB_DATA_SOURCE,
      MONGODB_DB,
      MONGODB_COLLECTION
    } = process.env;

    if (!MONGODB_DATA_API_URL || !MONGODB_DATA_API_KEY || !MONGODB_DATA_SOURCE || !MONGODB_DB) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ ok: false, error: 'Missing MongoDB Data API env vars' }));
    }

    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const bodyStr = Buffer.concat(chunks).toString('utf8');
    const payload = bodyStr ? JSON.parse(bodyStr) : {};

    // Validações simples
    const { nome, email } = payload;
    if (!nome || !email) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ ok: false, error: 'nome e email são obrigatórios' }));
    }

    // InsertOne via Data API
    const apiRes = await fetch(`${MONGODB_DATA_API_URL}/action/insertOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': MONGODB_DATA_API_KEY
      },
      body: JSON.stringify({
        dataSource: MONGODB_DATA_SOURCE,
        database: MONGODB_DB,
        collection: MONGODB_COLLECTION || 'users',
        document: {
          nome,
          email,
          dataCriacao: new Date().toISOString(),
          status: 'online',
          tipo: 'usuario'
        }
      })
    });

    const json = await apiRes.json();
    if (!apiRes.ok) {
      res.statusCode = apiRes.status || 500;
      return res.end(JSON.stringify({ ok: false, error: json.error || 'Data API error' }));
    }

    res.statusCode = 201;
    return res.end(JSON.stringify({ ok: true, insertedId: json.insertedId || json.documentId || null }));
  } catch (err) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ ok: false, error: err.message }));
  }
};
