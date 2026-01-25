// Arquivo muito grande - vou criar a função serverless para DALL-E
// api/generate-image.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt, slideText } = req.body;

        console.log(`🎨 Gerando imagem com DALL-E: ${prompt}`);

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: `Create a vibrant, professional Instagram story background image about: ${prompt}. Style: modern, eye-catching, suitable for text overlay. No text in image.`,
                n: 1,
                size: "1024x1792", // Portrait 9:16
                quality: "standard"
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const imageUrl = data.data[0].url;

        console.log(`✅ Imagem gerada com sucesso!`);

        res.status(200).json({
            success: true,
            imageUrl,
            prompt,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Erro ao gerar imagem:', error);
        res.status(500).json({ 
            error: 'Erro ao gerar imagem',
            message: error.message 
        });
    }
}
