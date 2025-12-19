import React from 'react';

const Privacy = () => {
  return (
    <div className='bg-white p-6 rounded-2xl shadow border border-gray-200 space-y-4'>
      <h2 className='text-2xl font-semibold text-green-600 mb-4'>Privacy Policy</h2>
      <p className='text-gray-700'>
        At SafeKeyz, we prioritize your data privacy and security. We do not share or sell user data.
        All passwords are stored using military-grade encryption, and we ensure end-to-end protection
        for all your sensitive information. Users have full control over their data and may choose to
        delete their account and stored information at any time.
      </p>
      <p className='text-gray-700'>
        Our platform complies with major global data protection regulations including GDPR. Regular
        security audits and monitoring are in place to prevent unauthorized access.
      </p>
    </div>
  );
};

export default Privacy;