import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="space-y-4 text-sm text-gray-500 overflow-y-auto max-h-[70vh] px-2">
      <p>Effective Date: 1st July, 2025</p>

      <p>
        <strong>Information We Collect</strong>
      </p>
      <p>
        We only collect your email address for login and communication purposes.
      </p>

      <p>
        <strong>How We Use Your Information</strong>
      </p>
      <p>
        We use your email to authenticate your account and provide support if
        needed.
      </p>

      <p>
        <strong>Storage</strong>
      </p>
      <p>
        Your email is stored securely via [e.g., Firebase]. We do not sell or
        share your data.
      </p>

      <p>
        <strong>Third-Party Services</strong>
      </p>
      <p>
        We may use services like Firebase or Google for authentication. These
        have their own policies.
      </p>

      <p>
        <strong>Data Rights</strong>
      </p>
      <p>You can request to view or delete your data by contacting us.</p>

      <p>
        <strong>Children's Privacy</strong>
      </p>
      <p>
        This app is not for children under 13. We do not knowingly collect data
        from minors.
      </p>

      <p>
        <strong>Changes to Policy</strong>
      </p>
      <p>
        We may revise this policy. Updated versions will be posted with a new
        date.
      </p>

      <p>
        <strong>Contact</strong>
      </p>
      <p>Email: support@linkszar.com</p>
    </div>
  );
};

export default PrivacyPolicy;
