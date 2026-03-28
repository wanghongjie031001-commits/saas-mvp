import { createServerClientWithCookies } from '@/utils/supabase'

export default async function ProPage() {
  const supabase = await createServerClientWithCookies()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user?.email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Unable to verify your session. Please log in again.</p>
      </div>
    )
  }

  // Query the orders table to check if user has paid status
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('status')
    .eq('user_email', user.email)
    .eq('status', 'paid')
    .maybeSingle()

  if (orderError) {
    console.error('Error fetching order:', orderError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error checking your subscription status.</p>
      </div>
    )
  }

  const isPaid = !!order

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Pro Content</h1>
        <p className="text-gray-600 mb-4">Logged in as: {user.email}</p>
        {isPaid ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 font-medium">Welcome to Pro Content</p>
          </div>
        ) : (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-yellow-800 font-medium">You need to purchase a plan</p>
          </div>
        )}
      </div>
    </div>
  )
}