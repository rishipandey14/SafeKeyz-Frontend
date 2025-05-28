import React from 'react';

const Privacy = () => {
  return (
    <div className='bg-base-200 p-6 rounded-2xl shadow border border-base-300 space-y-4'>
      <h2 className='text-2xl font-semibold text-primary mb-4'>Privacy Policy</h2>
      <p className='text-base-content'>
        At SafeKeyz, we prioritize your data privacy and security. We do not share or sell user data.
        All passwords are stored using military-grade encryption, and we ensure end-to-end protection
        for all your sensitive information. Users have full control over their data and may choose to
        delete their account and stored information at any time.
      </p>
      <p className='text-base-content'>
        Our platform complies with major global data protection regulations including GDPR. Regular
        security audits and monitoring are in place to prevent unauthorized access.
      </p>
    </div>
  );
};

export default Privacy;