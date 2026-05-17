'use client';

import { useMemo, useState } from 'react';

type AcquisitionForm = {
  business: string;
  audience: string;
  objective: string;
  budget: string;
  market: string;
  channel: string;
};

const initialForm: AcquisitionForm = {
  business: '',
  audience: '',
  objective: '预约咨询 / 留资线索',
  budget: '低预算：以内容和私域为主',
  market: '',
  channel: 'auto',
};

const channelLabels: Record<string, string> = {
  auto: '自动推荐最佳渠道组合',
  xiaohongshu: '小红书 / 种草 SEO',
  douyin: '抖音 / 短视频获客',
  linkedin: 'LinkedIn / B2B 外贸',
  google: 'Google SEO / 搜索广告',
  community: '社群 / 私域转化',
};

export default function CopywriterClient({ userEmail }: { userEmail: string }) {
  const [form, setForm] = useState<AcquisitionForm>(initialForm);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const completionRate = useMemo(() => {
    const requiredFields = [form.business, form.audience, form.market];
    const completed = requiredFields.filter(Boolean).length;
    return Math.round((completed / requiredFields.length) * 100);
  }, [form.business, form.audience, form.market]);

  const updateForm = (field: keyof AcquisitionForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!form.business || !form.audience || !form.market) {
      alert('请至少填写业务介绍、目标客户和目标市场，系统才能生成精准获客方案。');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '服务器无响应');
      }

      setResult(data.result);
    } catch (error) {
      const message = error instanceof Error ? error.message : '未知错误';
      alert(`生成失败: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8 grid gap-6 border-b border-slate-200 pb-8 lg:grid-cols-[1fr_280px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Acquisition Planner</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">AI 线上获客方案生成器</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            当前账号：{userEmail}。填写你的业务需求后，系统会生成渠道优先级、内容选题、转化路径、跟进话术和 7 天行动清单。
          </p>
        </div>
        <div className="rounded-2xl bg-slate-950 p-5 text-white">
          <p className="text-sm text-slate-400">需求完整度</p>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${completionRate}%` }} />
          </div>
          <p className="mt-3 text-2xl font-black">{completionRate}%</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">你的业务 / 产品是什么？</label>
            <textarea
              className="w-full rounded-xl border border-slate-300 p-4 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              rows={4}
              value={form.business}
              onChange={(event) => updateForm('business', event.target.value)}
              placeholder="例如：面向独立开发者的 AI 落地页生成工具，帮助 10 分钟上线营销页。"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">你想获得哪类客户？</label>
            <textarea
              className="w-full rounded-xl border border-slate-300 p-4 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              rows={3}
              value={form.audience}
              onChange={(event) => updateForm('audience', event.target.value)}
              placeholder="例如：有产品想法但不擅长设计和文案的创始人、开发者、出海团队。"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">目标市场 / 地区</label>
              <input
                className="w-full rounded-xl border border-slate-300 p-4 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                value={form.market}
                onChange={(event) => updateForm('market', event.target.value)}
                placeholder="中国一线城市 / 北美 / 东南亚"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">主要获客目标</label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white p-4 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                value={form.objective}
                onChange={(event) => updateForm('objective', event.target.value)}
              >
                <option>预约咨询 / 留资线索</option>
                <option>直接购买 / 试用注册</option>
                <option>加微信 / 进入私域</option>
                <option>品牌曝光 / 内容增长</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">预算与资源</label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white p-4 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                value={form.budget}
                onChange={(event) => updateForm('budget', event.target.value)}
              >
                <option>低预算：以内容和私域为主</option>
                <option>中预算：内容 + 小额广告测试</option>
                <option>高预算：广告投放 + 销售团队跟进</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">偏好渠道</label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white p-4 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                value={form.channel}
                onChange={(event) => updateForm('channel', event.target.value)}
              >
                {Object.entries(channelLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full rounded-xl bg-slate-950 px-6 py-4 font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? '正在生成获客方案...' : '生成我的线上获客系统'}
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-950">方案输出</h3>
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700">
              {channelLabels[form.channel]}
            </span>
          </div>

          {result ? (
            <div className="whitespace-pre-wrap rounded-xl bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm">
              {result}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-slate-500">
              <p className="font-semibold text-slate-700">生成后你将获得：</p>
              <ul className="mt-4 space-y-3 text-sm leading-6">
                <li>• 目标客户画像与高意向触发场景</li>
                <li>• 3 个优先获客渠道和执行原因</li>
                <li>• 10 条内容选题 / 广告钩子 / 私信开场白</li>
                <li>• 落地页结构、转化动作和 7 天执行计划</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
