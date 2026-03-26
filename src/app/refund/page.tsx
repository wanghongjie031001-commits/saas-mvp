export const metadata = {
  title: "Refund Policy - Satisfaction Guarantee",
  description: "Learn about our refund policy for digital products and services.",
};

export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Refund Policy</h1>
      <p className="text-gray-600 mb-4">Last updated: March 2026</p>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Digital Product Refund Policy</h2>
          <p>
            As a digital SaaS product, we offer a refund policy designed to ensure customer satisfaction while protecting against abuse. Due to the nature of digital products, we provide a structured refund window.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. 14-Day Money-Back Guarantee</h2>
          <p>
            We offer a 14-day money-back guarantee for all new subscriptions. If you are not satisfied with our service for any reason, you may request a full refund within 14 days of your first payment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How to Request a Refund</h2>
          <p>To request a refund, please contact our support team at <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a> with your request. Please include:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Your registered email address</li>
            <li>Order or invoice number</li>
            <li>Reason for the refund request</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Refund Processing</h2>
          <p>
            Once your refund request is approved, we will process the refund within 5-7 business days. The refund will be credited to your original payment method. You will receive a confirmation email once the refund is processed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. After Refund</h2>
          <p>
            Upon receiving a refund, your access to the service will be terminated immediately. You may re-subscribe at any time, but previous purchases are not eligible for additional refunds.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Chargebacks and Disputes</h2>
          <p>
            We encourage customers to contact us directly before initiating a chargeback or dispute. We are committed to resolving any issues fairly and promptly. Chargebacks may result in account suspension or termination.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Subscription Renewals</h2>
          <p>
            Refunds are only available for the initial subscription payment. Automatic renewal payments are non-refundable unless requested within the 14-day window from the renewal date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Special Circumstances</h2>
          <p>
            We understand that exceptional situations may arise. If you believe your situation warrants special consideration, please contact us. We review such requests on a case-by-case basis.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to This Policy</h2>
          <p>
            We reserve the right to modify this refund policy at any time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact Us</h2>
          <p>
            If you have questions about our refund policy, please contact us at <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}