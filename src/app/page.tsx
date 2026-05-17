import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI 获客增长系统 - 按需求生成线上客户方案",
  description:
    "根据行业、客群、预算和获客目标，快速生成线上渠道组合、内容计划、转化路径和跟进话术。",
};

const demandTypes = [
  {
    title: "本地服务找精准客户",
    description: "适合装修、咨询、教育、摄影、医美等服务型业务，定位区域需求与可成交人群。",
  },
  {
    title: "B2B 线索开发",
    description: "适合 SaaS、企业服务、外贸和供应链业务，输出 LinkedIn、邮件和内容获客打法。",
  },
  {
    title: "电商与私域转化",
    description: "适合消费品、知识付费和社群产品，组合短视频、种草内容与私域承接 SOP。",
  },
];

const workflow = ["输入需求", "匹配渠道", "生成方案", "持续跟进"];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-slate-950 text-white">
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.35),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.25),_transparent_28%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
              AI Customer Acquisition System
            </span>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white md:text-6xl">
              根据不同需求，在线生成可执行的获客系统
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              输入你的行业、目标客户、预算和成交目标，系统会为你拆解线上获客渠道、内容选题、转化路径、跟进话术与 7 天行动清单。
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="rounded-xl bg-cyan-400 px-8 py-4 text-center font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
              >
                进入系统生成方案
              </Link>
              <a
                href="#scenarios"
                className="rounded-xl border border-white/15 px-8 py-4 text-center font-bold text-white transition hover:bg-white/10"
              >
                查看适用场景
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <div className="rounded-2xl bg-slate-900 p-5">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-slate-400">今日获客仪表盘</p>
                  <h2 className="text-2xl font-bold">增长方案预览</h2>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-bold text-emerald-300">
                  Live
                </span>
              </div>
              <div className="space-y-4">
                {[
                  ["高意向渠道", "小红书 SEO + 私信承接"],
                  ["核心钩子", "3 个痛点标题 + 1 个限时诊断"],
                  ["转化动作", "表单收集 → 微信跟进 → 预约演示"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-slate-400">{label}</p>
                    <p className="mt-1 font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="scenarios" className="bg-white px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">Scenarios</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">不同业务需求，对应不同获客打法</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {demandTypes.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">Workflow</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">从模糊想法到每日执行清单</h2>
              <p className="mt-5 leading-8 text-slate-600">
                系统不只生成文案，而是把客户画像、渠道优先级、内容主题、落地页钩子、私域跟进和指标复盘串成一条完整获客链路。
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {workflow.map((step, index) => (
                <div key={step} className="rounded-2xl border border-slate-200 p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{step}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {index === 0 && "录入行业、产品、预算、地区和期望客户类型。"}
                    {index === 1 && "按需求推荐 SEO、社媒、社群、邮件、广告等组合。"}
                    {index === 2 && "输出内容计划、转化路径、话术和 7 天任务表。"}
                    {index === 3 && "跟踪线索状态，迭代钩子和渠道投入优先级。"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
