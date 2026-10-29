// ponytail: generic starter policies so /privacy, /terms, /cookies and /refund-policy resolve (payment gateways
// and GDPR need them). Have them reviewed for your business; edits made in Admin → Web Pages are kept on re-seed.
const PAGES = [
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    meta_description: 'How we collect, use and protect your personal data.',
    content: `
<p>This policy explains what personal data we collect when you use our website and services, why we collect it, and the choices you have.</p>
<h3>Data we collect</h3>
<ul>
<li><strong>Account data:</strong> your name, email address and password (stored hashed).</li>
<li><strong>Content data:</strong> prompts, images, videos and captions you create or upload.</li>
<li><strong>Connected accounts:</strong> access tokens for social platforms you connect, used only to publish on your behalf.</li>
<li><strong>Billing data:</strong> plan and transaction records. Card details are handled by our payment providers and never stored on our servers.</li>
<li><strong>Usage data:</strong> log data such as IP address, browser type and pages visited, used for security and to improve the service.</li>
</ul>
<h3>How we use your data</h3>
<p>To provide and secure the service, process payments, publish content you schedule, send account emails (such as verification codes and receipts), and respond to support requests.</p>
<h3>Sharing</h3>
<p>We do not sell your personal data. We share it only with providers that run the service for us (hosting, AI generation, email delivery, payments) and the social platforms you choose to publish to, or when required by law.</p>
<h3>Retention and your rights</h3>
<p>We keep your data while your account is active. You can access, correct or delete your data, or deactivate your account, from your profile or by contacting us. Where GDPR applies, you may also object to or restrict processing and lodge a complaint with your supervisory authority.</p>
<h3>Contact</h3>
<p>For privacy questions, use the contact form on our website.</p>`,
  },
  {
    title: 'Terms of Service',
    slug: 'terms-of-service',
    meta_description: 'The terms that govern your use of our services.',
    content: `
<p>By creating an account or using our services you agree to these terms.</p>
<h3>Your account</h3>
<p>You must provide accurate information and keep your login details secure. You are responsible for activity under your account.</p>
<h3>Acceptable use</h3>
<p>You may not use the service to create or publish unlawful, infringing, deceptive, hateful or sexually explicit content involving minors, to impersonate others, or to violate the rules of any social platform you publish to.</p>
<h3>Your content</h3>
<p>You keep ownership of the content you upload and generate. You grant us the limited rights needed to store, process and publish it on your instructions.</p>
<h3>Plans, credits and billing</h3>
<p>Paid plans renew automatically until cancelled. Credits are consumed by AI generations as shown in the app and have no cash value. See our Refund Policy for refunds.</p>
<h3>Availability and liability</h3>
<p>The service is provided "as is". AI output can be inaccurate, so review it before publishing. To the extent permitted by law, we are not liable for indirect or consequential losses.</p>
<h3>Termination</h3>
<p>You may close your account at any time. We may suspend accounts that breach these terms.</p>
<h3>Changes</h3>
<p>We may update these terms and will notify you of material changes. Continued use means you accept the updated terms.</p>`,
  },
  {
    title: 'Cookie Policy',
    slug: 'cookie-policy',
    meta_description: 'How we use cookies and similar technologies.',
    content: `
<p>We use a small number of cookies and similar browser storage to run the service.</p>
<h3>Essential</h3>
<p>Authentication and security cookies keep you signed in and protect your account. The service cannot work without them.</p>
<h3>Preferences</h3>
<p>Local storage remembers choices such as your language and theme.</p>
<h3>Third parties</h3>
<p>If you connect or log in with a social platform (for example Facebook), that platform may set its own cookies under its own policy.</p>
<h3>Managing cookies</h3>
<p>You can block or delete cookies in your browser settings. Blocking essential cookies will sign you out.</p>`,
  },
  {
    title: 'Refund Policy',
    slug: 'refund-policy',
    meta_description: 'When and how refunds are issued for paid plans.',
    content: `
<p>We want you to be happy with your plan.</p>
<h3>Subscriptions</h3>
<p>You can cancel at any time; your plan stays active until the end of the current billing period and will not renew.</p>
<h3>Refunds</h3>
<p>If you were charged in error, or request a refund within 7 days of your first payment for a plan and have used few of its credits, contact us and we will review it. Consumed credits are generally not refundable.</p>
<h3>How to request</h3>
<p>Use the contact form on our website with your account email and transaction details. Approved refunds are returned to the original payment method.</p>`,
  },
];

exports.up = async ({ db }) => {
  const { Page, User } = db;
  try {
    const admin = await User.findOne({ email: process.env.ADMIN_EMAIL }).select('_id').lean();
    if (!admin) {
      console.log('Admin user not found, skipping legal pages.');
      return;
    }
    for (const page of PAGES) {
      // Insert-only: never overwrite a page an admin has already edited
      await Page.updateOne({ slug: page.slug }, { $setOnInsert: { ...page, meta_title: page.title, status: true, created_by: admin._id } }, { upsert: true });
    }
    console.log('Legal pages seeded successfully.');
  } catch (error) {
    console.error('Error seeding legal pages:', error);
  }
};

exports.down = async ({ db }) => {
  const { Page } = db;
  await Page.deleteMany({ slug: { $in: PAGES.map((p) => p.slug) } });
};
