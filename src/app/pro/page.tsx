import { createServerClientWithCookies } from '@/utils/supabase'
import CopywriterClient from './CopywriterClient'

export default async function ProPage() {
  const supabase = await createServerClientWithCookies()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user?.email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">致命错误：身份验证凭证丢失，请重新登录。</p>
      </div>
    )
  }

  // 严密查验数据库资产状态
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('status')
    .eq('user_email', user.email)
    .eq('status', 'paid')
    .maybeSingle()

  if (orderError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">账单状态核验失败，数据库通信异常。</p>
      </div>
    )
  }

  const isPaid = !!order

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-50 px-4">
      <div className="w-full max-w-4xl p-4 bg-white rounded-t-lg shadow-sm mb-6 flex justify-between items-center border border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">SaaS 控制台</h1>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
          {user.email}
        </span>
      </div>

      {isPaid ? (
        <CopywriterClient userEmail={user.email} />
      ) : (
        <div className="w-full max-w-4xl p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold text-yellow-800 mb-2">拦截：访问受限</h2>
          <p className="text-yellow-700">该账户缺少付费凭证，请前往主页购买 Pro 计划以解锁大模型调用权限。</p>
        </div>
      )}
    </div>
  )
}