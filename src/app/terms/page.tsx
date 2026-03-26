export const metadata = {
  title: "Terms of Service - User Agreement",
  description: "Read our terms of service and user agreement for using our platform.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <p className="text-gray-600 mb-4">Last updated: March 2026</p>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using our SaaS platform, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, you should not use our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
          <p>
            We provide a cloud-based SaaS platform that allows users to manage their business operations, collaborate with team members, and access various tools and features. The service is provided on a subscription basis.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
          <p>To use our service, you must create an account. You agree to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Provide accurate and complete registration information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized access</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Payment and Subscriptions</h2>
          <p>
            Our service is provided on a subscription basis. By subscribing, you agree to pay all fees associated with your selected plan. Subscriptions renew automatically unless cancelled. All payments are processed through our secure payment provider, Lemon Squeezy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Acceptable Use</h2>
          <p>You agree not to use our service to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Upload or transmit viruses or malicious code</li>
            <li>Attempt to gain unauthorized access to our systems</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Intellectual Property</h2>
          <p>
            Our service and all content, features, and functionality are owned by us and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute our proprietary content without our written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Disclaimer of Warranties</h2>
          <p>
            Our service is provided &quot;as is&quot; without any warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h2>
          <p>
            In no event shall we be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our service, even if we have been advised of the possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Termination</h2>
          <p>
            We may terminate or suspend your account at any time for violation of these terms or for any other reason. You may cancel your subscription at any time through your account settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}