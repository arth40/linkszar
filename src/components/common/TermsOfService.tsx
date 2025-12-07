import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="space-y-4 text-sm text-gray-500 overflow-y-auto max-h-[70vh] px-4">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-gray-500 mb-6">Last Updated: 1st December, 2025</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Acceptance of Terms
      </h2>
      <p>
        By accessing or using <strong>Linkszar</strong> (the “Service”), you
        agree to be bound by these Terms of Service (“Terms”). If you do not
        agree with these Terms, you must not use the Service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of the Service</h2>
      <p>The Service allows you to:</p>
      <ul className="list-disc ml-6 mt-1">
        <li>Create an account using an email address and a username</li>
        <li>Save, manage, and retrieve links of your choice</li>
      </ul>
      <p className="mt-2">
        You agree to use the Service only for lawful purposes and in accordance
        with these Terms and all applicable laws and regulations.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. User Responsibilities & Prohibited Content
      </h2>
      <p>
        You are fully responsible for all content and links associated with your
        account. You agree not to use the Service to:
      </p>
      <ul className="list-disc ml-6 mt-1">
        <li>Save, share, or link to illegal content of any kind</li>
        <li>
          Save, share, or link to vulgar, pornographic, or explicit material
        </li>
        <li>Distribute copyrighted material without proper authorization</li>
        <li>Share links containing malware, viruses, or other harmful code</li>
        <li>Harass, threaten, or harm any individual or group</li>
        <li>Engage in phishing, fraud, or any other deceptive practices</li>
      </ul>
      <p className="mt-2">
        We reserve the right, but are not obligated, to remove content or links
        and to suspend or terminate accounts that violate these Terms or
        applicable laws.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Account Security</h2>
      <p>
        You are responsible for maintaining the confidentiality of your login
        credentials and for all activities that occur under your account. You
        agree to notify us immediately if you become aware of any unauthorized
        use of your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. Service Availability & Modifications
      </h2>
      <p>
        We strive to provide a stable and reliable Service, but we do not
        guarantee that the Service will be available at all times or without
        interruption. We may modify, suspend, or discontinue all or part of the
        Service at any time, with or without notice.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Limitation of Liability
      </h2>
      <p className="mb-3">
        To the maximum extent permitted by law, <strong>Linkszar</strong> and
        its owners, employees, and affiliates shall not be liable for any
        indirect, incidental, special, consequential, or punitive damages,
        including loss of profits, data, or goodwill, arising out of or in
        connection with your use of the Service.
      </p>
      <p>
        We are not responsible for any content contained in the links you save,
        or any damage or loss resulting from accessing third-party sites through
        those links. Your use of the Service is at your own risk.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Termination</h2>
      <p>
        We may suspend or terminate your access to the Service, without prior
        notice, if we determine that you:
      </p>
      <ul className="list-disc ml-6 mt-1">
        <li>Violate these Terms</li>
        <li>Engage in illegal, harmful, or abusive behavior</li>
        <li>Misuse or attempt to misuse the Service</li>
      </ul>
      <p className="mt-2">
        You may also stop using the Service and request deletion of your account
        at any time.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        8. Changes to These Terms
      </h2>
      <p>
        We may update these Terms from time to time. When we do, we will revise
        the “Last Updated” date at the top of this section. Your continued use
        of the Service after changes are posted means you accept the updated
        Terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the
        laws of <strong>India</strong>, without regard to its conflict of law
        principles. Any disputes arising from or relating to these Terms or the
        Service shall be subject to the exclusive jurisdiction of the courts
        located in <strong>India</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        10. Contact Information
      </h2>
      <p>
        If you have any questions about these Terms, you can contact us at:
        <br />
        <strong>support@linkszar.com</strong>
      </p>
    </div>
  );
};

export default TermsOfService;
