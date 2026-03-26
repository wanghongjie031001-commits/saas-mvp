import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 px-4 bg-gray-900 text-gray-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-sm">
              &copy; {new Date().getFullYear()} SaaS Product. All rights reserved.
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund" className="text-sm hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>

            <div className="text-sm font-medium text-white">
              Support: <a href="mailto:support@example.com" className="hover:underline">support@example.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}