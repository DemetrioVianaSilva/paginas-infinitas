// api/generate.js - Função Serverless para Vercel
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { topic, niche, slidesCount } = req.body;

        if (!topic || !niche || !slidesCount) {
            return res.status(400).json({ 
                error: 'Campos obrigatórios: topic, niche, slidesCount' 
            });
        }

        if (slidesCount < 3 || slidesCount > 20) {
            return res.status(400).json({ 
                error: 'slidesCount deve ser entre 3 e 20' 
            });
        }

        console.log(`🎯 Gerando ${slidesCount} slides: "${topic}" (${niche})`);

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 2000,
                messages: [{
                    role: 'user',
                    content: `Você é um especialista em criação de conteúdo viral para Instagram, com foco em carrosséis que geram alto engajamento.

Crie um carrossel de ${slidesCount} slides sobre "${topic}" no nicho de "${niche}".

INSTRUÇÕES CRÍTICAS:
1. Crie EXATAMENTE ${slidesCount} slides
2. Cada slide deve ter entre 5-15 palavras (máximo absoluto!)
3. Use linguagem EXTREMAMENTE direta, impactante e emocional
4. Slide 1: Hook DEVASTADOR que gera curiosidade incontrolável
5. Slides intermediários: Insights valiosos, práticos e surpreendentes
6. Último slide: CTA forte e fechamento memorável
7. Use números específicos, dados concretos e contrastes dramáticos
8. Evite clichês e textos genéricos - seja ESPECÍFICO e ÚNICO
9. Foque em criar FOMO (fear of missing out)
10. Use palavras de poder: "erro", "segredo", "verdade", "nunca", "sempre"

FORMATO DE RESPOSTA (APENAS ISSO, SEM NENHUMA EXPLICAÇÃO):
SLIDE 1: [texto curto e impactante]
SLIDE 2: [texto curto e impactante]
SLIDE 3: [texto curto e impactante]
...
SLIDE ${slidesCount}: [texto curto e impactante]

EXEMPLOS DO QUE FUNCIONA:
✅ "97% dos investidores cometem este erro fatal"
✅ "R$ 10k/mês em 6 meses - método completo"
✅ "Você está perdendo dinheiro agora mesmo"

Seja impactante, específico e memorável em CADA SLIDE!`
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ Erro na API do Claude:', errorData);
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.content[0].text;
        
        const slideTexts = content
            .split('\n')
            .filter(line => line.trim().startsWith('SLIDE'))
            .map(line => line.replace(/SLIDE \d+:\s*/, '').trim())
            .filter(text => text.length > 0);

        if (slideTexts.length < slidesCount - 2) {
            throw new Error(`Slides insuficientes gerados: ${slideTexts.length}`);
        }

        console.log(`✅ Sucesso! ${slideTexts.length} slides gerados`);

        res.status(200).json({
            success: true,
            slides: slideTexts,
            topic,
            niche,
            slidesCount: slideTexts.length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Erro ao gerar carrossel:', error);
        res.status(500).json({ 
            error: 'Erro ao gerar carrossel',
            message: error.message 
        });
    }
}
