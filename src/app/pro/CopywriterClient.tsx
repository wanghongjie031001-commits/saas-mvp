'use client';

import { useState } from 'react';

export default function CopywriterClient({ userEmail }: { userEmail: string }) {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('xiaohongshu');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return alert("核心变量缺失：请输入内容主题");
    setLoading(true);
    setResult(''); // 清空历史结果
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platform })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '服务器无响应');
      }

      setResult(data.result);
    } catch (error: any) {
      alert(`生成失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-gray-800">AI 爆款文案生成引擎 (Pro 专属)</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">目标发布平台</label>
          <select 
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-black focus:outline-none bg-white"
            value={platform}
            onChange={e => setPlatform(e.target.value)}
          >
            <option value="xiaohongshu">小红书 (爆款网感/Emoji排版)</option>
            <option value="twitter">Twitter / X (极简线程/科技风)</option>
            <option value="linkedin">LinkedIn (专业职场/商业洞察)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">内容核心主题或原始想法</label>
          <textarea 
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-black focus:outline-none" 
            rows={4} 
            value={topic} 
            onChange={e => setTopic(e.target.value)} 
            placeholder="例如：介绍一款能自动将代码部署到公网的 SaaS 开发工具..."></textarea>
        </div>
        
        <button 
          onClick={handleGenerate} 
          disabled={loading} 
          className="w-full py-3 bg-black text-white font-bold rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors">
          {loading ? '大模型正在深度思考...' : '一键生成跨平台文案'}
        </button>

        {result && (
          <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-md">
            <h3 className="font-bold mb-3 text-gray-800">生成结果：</h3>
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}