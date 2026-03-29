import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic, platform } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: '核心主题缺失' }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: '服务器未配置 API Key' }, { status: 500 });
    }

    // 针对不同平台组装系统级 Prompt
    let systemPrompt = '你是一个拥有千万粉丝的顶级的自媒体文案爆款专家。';
    if (platform === 'xiaohongshu') {
      systemPrompt += '请生成小红书风格的种草文案。要求：1. 标题极具吸引力且带emoji；2. 正文分段极简，语气亲切闺蜜风；3. 视觉排版舒适，高频使用emoji表达情绪；4. 结尾带上相关的热门标签（Hashtag）。';
    } else if (platform === 'twitter') {
      systemPrompt += '请生成Twitter/X风格的推文。要求：1. 极简专业，直击痛点，没有废话；2. 适合科技、独立开发、创投圈子；3. 采用线程（Thread）结构或单条精炼；4. 语气自信、客观、带有一点极客味。';
    } else if (platform === 'linkedin') {
      systemPrompt += '请生成LinkedIn风格的职场商业洞察。要求：1. 语气专业、理性；2. 适合B端客户或高端职场社交；3. 强调商业价值和方法论；4. 结尾留下互动式的开放问题。';
    }

    // 发起真实的 DeepSeek API 请求
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `我的产品核心思路/主题是：${topic}。请帮我写出这篇文案。` }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      return NextResponse.json({ error: '大模型接口拒绝请求，请检查余额或网络' }, { status: response.status });
    }

    const data = await response.json();
    const resultText = data.choices[0].message.content;

    return NextResponse.json({ result: resultText });

  } catch (error: any) {
    console.error('Generate Error:', error);
    return NextResponse.json({ error: error.message || '内部服务器级联错误' }, { status: 500 });
  }
}