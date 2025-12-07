import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="space-y-4 text-sm text-gray-500 overflow-y-auto max-h-[70vh] px-2">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-gray-500 mb-6">Last Updated: 1st December, 2025</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
      <p className="mb-3">
        This Privacy Policy explains how <strong>Linkszar</strong> (“we,” “our,”
        or “us”) collects, uses, and protects information when you use our
        website and services (“Service”). By registering or using our Service,
        you agree to this policy.
      </p>
      <p>
        We are committed to protecting your privacy and keeping your data
        secure. We only collect the minimum information necessary to provide our
        Service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Information We Collect
      </h2>

      <h3 className="text-lg font-medium mt-4 mb-1">2.1 Account Information</h3>
      <p>
        We collect and store only the following information when you register:
      </p>
      <ul className="list-disc ml-6 mt-1 mb-3">
        <li>Email address</li>
        <li>Username (chosen by you)</li>
      </ul>
      <p>No additional personal information is collected.</p>

      <h3 className="text-lg font-medium mt-4 mb-1">
        2.2 User-Generated Content
      </h3>
      <p>
        The Service allows you to save and manage links (URLs) of your choice.
        These links are completely user-generated. We do not control, monitor,
        or endorse the content of the links saved by users.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. How We Use Your Information
      </h2>
      <p>We use your information solely for the following purposes:</p>
      <ul className="list-disc ml-6 mt-1">
        <li>To create and manage your account</li>
        <li>To allow you to save and retrieve your links</li>
        <li>To provide customer support</li>
        <li>To maintain the security and functionality of the Service</li>
      </ul>
      <p className="mt-2 font-medium text-red-600">
        We do NOT sell, trade, or share your information with third parties for
        advertising.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Data Storage & Security
      </h2>
      <p className="mb-3">
        We use <strong>Firebase</strong> as our database and authentication
        provider. Your account information and saved links are stored using
        Firebase-managed infrastructure.
      </p>
      <p>
        We implement reasonable technical and organizational measures to protect
        your data. However, no method of transmission or storage is 100% secure,
        and we cannot guarantee absolute security. You use the Service at your
        own risk.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. User Responsibility
      </h2>
      <p>You are solely responsible for:</p>
      <ul className="list-disc ml-6 mt-1">
        <li>The links you choose to save and manage on the Service</li>
        <li>
          Ensuring that the content of those links does not violate any laws or
          these terms
        </li>
        <li>Maintaining the confidentiality of your login credentials</li>
      </ul>
      <p className="mt-2">
        We do not promote, endorse, or encourage any vulgar, harmful, or illegal
        content. It is completely up to you what type of links you save, but you
        must ensure they comply with applicable laws and our Terms of Service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Third-Party Links</h2>
      <p>
        Links saved by users may direct you to third-party websites. We are not
        responsible for the content, privacy practices, or security of any
        third-party websites. Accessing third-party sites is at your own risk.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        7. Children&apos;s Privacy
      </h2>
      <p>
        Our Service is not intended for children under the age of 13. We do not
        knowingly collect personal information from anyone under 13. If you
        believe a child has provided us with personal information, please
        contact us so we can delete it.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        8. Changes to This Privacy Policy
      </h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will
        revise the “Last Updated” date at the top of this section. Your
        continued use of the Service after any changes means you accept the
        updated Privacy Policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h2>
      <p>
        For privacy questions, contact us at:
        <strong>support@linkszar.com</strong>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
