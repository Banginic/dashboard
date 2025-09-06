// app/privacy/page.tsx (Next.js 13+ App Router)
// A modern, reusable Privacy Policy page you can drop into any Next.js project.
// Update the CONFIG below for each project. No external packages required.

import type { Metadata } from "next";

// === Configuration: edit these per project ===
const CONFIG = {
  companyName: "Your Company Ltd.",
  websiteName: "YourWebsite",
  contactEmail: "privacy@yourcompany.com",
  address: "123 Example Street, City, Country",
  effectiveDate: "2025-01-01",
  lastUpdated: "2025-09-06",
  // Optional: list the key vendors you actually use
  vendors: [
    { name: "Vercel", purpose: "hosting" },
    { name: "Google Analytics", purpose: "analytics" },
    // { name: "Stripe", purpose: "payments" },
  ],
};

export const metadata: Metadata = {
  title: `${CONFIG.websiteName} | Privacy Policy`,
  description:
    `${CONFIG.companyName} privacy policy describing how we collect, use, and protect personal data on ${CONFIG.websiteName}.`,
  robots: { index: true, follow: true },
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-3">{title}</h2>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm md:text-base">{children}</div>
    </section>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border px-2 py-0.5 text-xs font-medium">{children}</kbd>
  );
}

export default function PrivacyPolicyPage() {
  const { companyName, websiteName, contactEmail, address, effectiveDate, lastUpdated, vendors } = CONFIG;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${websiteName} Privacy Policy`,
    description:
      `${companyName} privacy policy describing how personal data is collected, used, and protected on ${websiteName}.`,
    isPartOf: {
      "@type": "WebSite",
      name: websiteName,
    },
    datePublished: effectiveDate,
    dateModified: lastUpdated,
  };

  return (
    <section className="mx-auto bg-secondary/70 text-foreground border rounded-md w-[95%] max-w-4xl my-8 px-4 sm:px-6 md:px-8 py-10 md:py-16">
      {/* JSON-LD for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm md:text-base text-muted-foreground">
          <span className="mr-3">Effective Date: <time dateTime={effectiveDate}>{effectiveDate}</time></span>
          <span>Last Updated: <time dateTime={lastUpdated}>{lastUpdated}</time></span>
        </p>
      </div>

      {/* Quick navigation */}
      <nav className="mb-10">
        <ul className="grid md:grid-cols-2 gap-2 text-sm">
          {[
            ["scope", "Scope & Acceptance"],
            ["data-we-collect", "Information We Collect"],
            ["use-of-data", "How We Use Information"],
            ["sharing", "How We Share Information"],
            ["cookies", "Cookies & Tracking"],
            ["retention", "Data Retention"],
            ["security", "Data Security"],
            ["rights", "Your Rights"],
            ["intl", "International Data Transfers"],
            ["children", "Children’s Privacy"],
            ["do-not-sell", "Do Not Sell/Share (Opt-Out)"],
            ["contact", "Contact Us"],
            ["changes", "Changes to This Policy"],
          ].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="inline-flex items-center rounded-xl border px-3 py-2 hover:bg-accent hover:text-accent-foreground transition">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-10">
        <Section id="intro" title={`About ${companyName}`}>
          <p className="text-secondary-foreground">
            {companyName} operates {websiteName}. This Privacy Policy explains how we
            collect, use, disclose, and safeguard information when you visit our website or use our services.
            By accessing or using our services, you agree to the terms of this Policy.
          </p>
        </Section>

        <Section id="scope" title="Scope & Acceptance">
          <p className="text-secondary-foreground">
            This Policy applies to our websites, apps, and related services (collectively, the "Services"). If you do not
            agree with this Policy, please discontinue use of the Services. Additional notices may apply to certain
            features, vendors, or regions and will be presented where relevant.
          </p>
        </Section>

        <Section id="data-we-collect" title="Information We Collect">
          <ul className="text-secondary-foreground">
            <li>
              <strong>Information you provide</strong> — e.g., name, email, phone, address, passwords, messages, support
              requests, form submissions, and any content you upload.
            </li>
            <li>
              <strong>Automatic data</strong> — e.g., IP address, device identifiers, browser type, operating system, locale,
              referring URLs, pages viewed, links clicked, and timestamps.
            </li>
            <li>
              <strong>Cookies & similar tech</strong> — small files like cookies, pixels, and local storage used for
              preferences, analytics, security, and personalization. Manage via your browser settings.
            </li>
            <li>
              <strong>Third-party data</strong> — where permitted by law, we may receive information from partners or public
              sources to enhance our records or prevent fraud.
            </li>
          </ul>
        </Section>

        <Section id="use-of-data" title="How We Use Information">
          <ul className="text-secondary-foreground">
            <li>Provide, operate, maintain, and improve the Services.</li>
            <li>Process transactions and fulfill requests (e.g., account creation, support).</li>
            <li>Communicate service updates, security alerts, and support messages.</li>
            <li>Personalize content and measure performance of features and marketing (where permitted).</li>
            <li>Analyze usage and develop new features and offerings.</li>
            <li>Protect against, investigate, and deter fraudulent, unauthorized, or illegal activity.</li>
            <li>Comply with legal obligations and enforce our terms, policies, and agreements.</li>
          </ul>
        </Section>

        <Section id="sharing" title="How We Share Information">
          <p className="text-secondary-foreground">We do not sell your personal information. We may share as follows:</p>
          <ul className="text-secondary-foreground">
            <li>
              <strong>Service providers</strong> — vendors who process data on our behalf for hosting, analytics,
              communications, payments, or support. We require appropriate confidentiality and security commitments.
            </li>
            <li>
              <strong>Legal & safety</strong> — to comply with law, respond to lawful requests, or protect rights, property,
              or safety of {companyName}, our users, or the public.
            </li>
            <li>
              <strong>Business transfers</strong> — in connection with a merger, acquisition, financing, or sale of assets.
            </li>
            <li>
              <strong>With consent</strong> — where you direct us to share or otherwise consent to sharing.
            </li>
          </ul>
          {vendors?.length ? (
            <div className="mt-4 rounded-xl border p-4">
              <p className="font-medium mb-2">Core vendors we commonly use</p>
              <ul className="list-disc pl-6">
                {vendors.map((v) => (
                  <li key={v.name}>
                    {v.name} — {v.purpose}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Section>

        <Section id="cookies" title="Cookies & Tracking">
          <p className="text-secondary-foreground">
            We use cookies and similar technologies to remember preferences, keep you signed in, provide security,
            analyze traffic, and personalize content. You can control cookies in your browser settings or via available
            in-product controls. Disabling cookies may affect site functionality.
          </p>
        </Section>

        <Section id="retention" title="Data Retention">
          <p className="text-secondary-foreground">
            We retain personal information only as long as necessary for the purposes described in this Policy, to
            comply with legal obligations, resolve disputes, and enforce agreements. Retention periods may vary by
            data type and context.
          </p>
        </Section>

        <Section id="security" title="Data Security">
          <p className="text-secondary-foreground">
            We implement administrative, technical, and physical safeguards designed to protect information.
            Nonetheless, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section id="rights" title="Your Rights">
          <p className="text-secondary-foreground">
            Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of
            your personal information, and to data portability. You may also object to certain processing or withdraw
            consent where processing is based on consent.
          </p>
          <p className="mt-2">
            To exercise these rights, contact us at <a className="underline" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            We may request information to verify your identity.
          </p>
          <div className="mt-3 rounded-xl border p-4 text-sm space-y-2">
            <p className="font-medium">Region-specific notices (examples)</p>
            <ul className="list-disc pl-6">
              <li>
                <strong>EEA/UK (GDPR):</strong> You may have additional rights, including to lodge a complaint with your
                local supervisory authority.
              </li>
              <li>
                <strong>California (CPRA):</strong> You may have the right to know, delete, correct, and opt out of
                sale/share or targeted advertising. We do not sell personal information.
              </li>
              <li>
                <strong>Nigeria (NDPR):</strong> You may request access, correction, and erasure, and object to processing
                under applicable law.
              </li>
            </ul>
          </div>
        </Section>

        <Section id="intl" title="International Data Transfers">
          <p className="text-secondary-foreground">
            If we transfer personal information internationally, we rely on appropriate safeguards, such as standard
            contractual clauses or other lawful mechanisms, to protect your information consistent with applicable laws.
          </p>
        </Section>

        <Section id="children" title="Children’s Privacy">
          <p className="text-secondary-foreground">
            Our Services are not directed to children under the age where parental consent is required by law. We do not
            knowingly collect personal information from such children. If you believe a child has provided us with
            personal information, please contact us and we will take appropriate steps to delete it.
          </p>
        </Section>

        <Section id="do-not-sell" title="Do Not Sell/Share (Opt-Out)">
          <p className="text-secondary-foreground">
            We do not sell personal information. Where applicable law provides an opt-out for “sale”, “sharing”, or
            targeted advertising, you can submit a request by contacting us at <a className="underline" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </Section>

        <Section id="contact" title="Contact Us">
          <p>
            If you have questions or concerns about this Policy, contact us:
          </p>
          <ul className="text-secondary-foreground">
            <li>Email: <a className="underline" href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
            <li>Address: {address}</li>
          </ul>
        </Section>

        <Section id="changes" title="Changes to This Policy">
          <p className="text-secondary-foreground">
            We may update this Policy from time to time. The updated version will be indicated by an updated "Last
            Updated" date and will be effective as soon as it is accessible. We encourage you to review this Policy
            regularly to stay informed.
          </p>
        </Section>
      </div>

    </section>
  );
}
