export default async function handler(req, res) {
  // Permite preflight (alguns browsers fazem)
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { topic, niche, slidesCount } = req.body || {};

    if (!topic || !niche || !slidesCount) {
      return res.status(400).json({ error: 'Campos obrigatórios: topic, niche, slidesCount' });
    }

    const n = Number(slidesCount);
    if (Number.isNaN(n) || n < 3 || n > 20) {
      return res.status(400).json({ error: 'slidesCount deve ser entre 3 e 20' });
    }

    console.log(`🎯 Gerando ${n} slides: "${topic}" (${niche})`);

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

Crie um carrossel de ${n} slides sobre "${topic}" no nicho de "${niche}".

INSTRUÇÕES CRÍTICAS:
1. Crie EXATAMENTE ${n} slides
2. Cada slide deve ter entre 5-15 palavras (máximo absoluto!)
3. Linguagem direta, impactante e emocional
4. Slide 1: Hook devastador
5. Intermediários: insights práticos e surpreendentes
6. Último: CTA forte e fechamento memorável
7. Use números específicos e contraste
8. Evite clichês: seja específico e único
9. Crie FOMO
10. Use palavras de poder: "erro", "segredo", "verdade", "nunca", "sempre"

FORMATO (SÓ ISSO):
SLIDE 1: ...
SLIDE 2: ...
...
SLIDE ${n}: ...`
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Claude API error:', errorText);
      return res.status(500).json({ error: 'Claude API error', details: errorText });
    }

    const data = await response.json();
    const content = data?.content?.[0]?.text || '';

    const slides = content
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.toUpperCase().startsWith('SLIDE'))
      .map(l => l.replace(/SLIDE\s*\d+\s*:\s*/i, '').trim())
      .filter(Boolean);

    if (slides.length < n - 1) {
      console.error('❌ Slides insuficientes:', slides.length);
      return res.status(500).json({ error: 'Slides insuficientes gerados', got: slides.length, expected: n });
    }

    console.log(`✅ Sucesso! ${slides.length} slides`);

    return res.status(200).json({ success: true, slides });
  } catch (err) {
    console.error('❌ Erro geral:', err);
    return res.status(500).json({ error: 'Erro ao gerar carrossel', message: err.message });
  }
}
