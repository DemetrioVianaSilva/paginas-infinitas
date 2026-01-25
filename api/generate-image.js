export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body || {};
    if (!prompt) {
      return res.status(400).json({ error: 'Campo obrigatório: prompt' });
    }

    console.log(`🎨 Gerando imagem (DALL·E): ${prompt}`);

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: `Crie um FUNDO vertical 9:16 para carrossel do Instagram sobre: ${prompt}.
Estilo: moderno, chamativo, viral, com alto contraste.
Regra CRÍTICA: NÃO colocar texto, letras, números ou marcas na imagem.
Deixe uma área mais “limpa” no centro para sobrepor texto.`,
        n: 1,
        size: '1024x1792',
        quality: 'standard',
        response_format: 'b64_json'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API error:', errorText);
      return res.status(500).json({ error: 'OpenAI API error', details: errorText });
    }

    const data = await response.json();
    const b64 = data?.data?.[0]?.b64_json;

    if (!b64) {
      return res.status(500).json({ error: 'Sem b64_json na resposta da OpenAI' });
    }

    const imageDataUrl = `data:image/png;base64,${b64}`;
    console.log('✅ Imagem gerada (base64)');

    return res.status(200).json({ success: true, imageDataUrl });
  } catch (err) {
    console.error('❌ Erro ao gerar imagem:', err);
    return res.status(500).json({ error: 'Erro ao gerar imagem', message: err.message });
  }
}
