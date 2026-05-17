import { NextResponse } from 'next/server';

type AcquisitionRequest = {
  business?: string;
  audience?: string;
  objective?: string;
  budget?: string;
  market?: string;
  channel?: string;
};

const channelGuidance: Record<string, string> = {
  auto: '先判断最适合的 3 个线上获客渠道，并解释排序原因。',
  xiaohongshu: '重点围绕小红书搜索流量、种草内容、评论区互动和私信承接设计方案。',
  douyin: '重点围绕抖音短视频选题、直播/私信承接、同城或兴趣人群转化设计方案。',
  linkedin: '重点围绕 LinkedIn 人脉开发、B2B 内容、私信节奏和邮件跟进设计方案。',
  google: '重点围绕 Google SEO、关键词页面、搜索广告和落地页转化设计方案。',
  community: '重点围绕社群裂变、私域内容、微信/邮件跟进和成交 SOP 设计方案。',
};

export async function POST(req: Request) {
  try {
    const { business, audience, objective, budget, market, channel = 'auto' }: AcquisitionRequest = await req.json();

    if (!business || !audience || !market) {
      return NextResponse.json({ error: '业务介绍、目标客户和目标市场不能为空' }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: '服务器未配置 API Key' }, { status: 500 });
    }

    const systemPrompt = `你是资深增长顾问和线上获客系统架构师，擅长为 SaaS、本地服务、B2B、电商和知识付费业务制定可执行的获客方案。
请用中文输出，务必具体、可执行、避免空泛建议。
输出必须包含以下模块：
1. 目标客户画像：痛点、购买触发点、常出现的线上场景。
2. 渠道优先级：推荐 3 个渠道，说明为什么优先、首个验证动作是什么。
3. 内容/广告钩子：给出 10 条标题或开场白。
4. 转化路径：从看到内容到留资/购买/预约的完整路径。
5. 跟进话术：给出首条私信、二次跟进和成交推进话术。
6. 7 天行动清单：每天做什么、产出什么、观察什么指标。
7. 风险提醒：列出 3 个最容易踩坑的点。`;

    const userPrompt = `业务/产品：${business}
目标客户：${audience}
目标市场/地区：${market}
获客目标：${objective || '未指定'}
预算与资源：${budget || '未指定'}
渠道偏好：${channelGuidance[channel] || channelGuidance.auto}`;

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.65,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      return NextResponse.json({ error: '大模型接口拒绝请求，请检查余额或网络' }, { status: response.status });
    }

    const data = await response.json();
    const resultText = data.choices?.[0]?.message?.content;

    if (!resultText) {
      return NextResponse.json({ error: '大模型返回内容为空' }, { status: 502 });
    }

    return NextResponse.json({ result: resultText });
  } catch (error) {
    console.error('Generate Error:', error);
    const message = error instanceof Error ? error.message : '内部服务器级联错误';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
