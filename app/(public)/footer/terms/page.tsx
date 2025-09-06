// app/terms/page.tsx (Next.js 13+ App Router)
// A modern, reusable Terms & Conditions page styled consistently with the Privacy Policy page.
// Update the CONFIG below per project.

import type { Metadata } from "next";

// === Configuration: edit these per project ===
const CONFIG = {
  companyName: "Your Company Ltd.",
  websiteName: "YourWebsite",
  contactEmail: "legal@yourcompany.com",
  address: "123 Example Street, City, Country",
  effectiveDate: "2025-01-01",
  lastUpdated: "2025-09-06",
};

export const metadata: Metadata = {
  title: `${CONFIG.websiteName} | Terms & Conditions`,
  description: `${CONFIG.companyName} terms and conditions governing use of ${CONFIG.websiteName}.`,
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

export default function TermsPage() {
  const { companyName, websiteName, contactEmail, address, effectiveDate, lastUpdated } = CONFIG;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${websiteName} Terms & Conditions`,
    description: `${companyName} terms and conditions governing use of ${websiteName}.`,
    isPartOf: {
      "@type": "WebSite",
      name: websiteName,
    },
    datePublished: effectiveDate,
    dateModified: lastUpdated,
  };

  return (
    <main className="mx-auto bg-secondary/70 text-foreground border rounded-md w-[95%] max-w-4xl px-4 sm:px-6 md:px-8 my-8 py-10 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Terms & Conditions</h1>
        <p className="mt-2 text-sm md:text-base text-muted-foreground">
          <span className="mr-3">Effective Date: <time dateTime={effectiveDate}>{effectiveDate}</time></span>
          <span>Last Updated: <time dateTime={lastUpdated}>{lastUpdated}</time></span>
        </p>
      </div>

      {/* Quick navigation */}
      <nav className="mb-10">
        <ul className="grid md:grid-cols-2 gap-2 text-sm">
          {[
            ["acceptance", "Acceptance of Terms"],
            ["eligibility", "Eligibility"],
            ["accounts", "Accounts & Registration"],
            ["use", "Permitted Use"],
            ["prohibited", "Prohibited Activities"],
            ["intellectual", "Intellectual Property"],
            ["payments", "Payments & Subscriptions"],
            ["termination", "Termination"],
            ["liability", "Limitation of Liability"],
            ["indemnity", "Indemnification"],
            ["governing-law", "Governing Law"],
            ["disputes", "Dispute Resolution"],
            ["changes", "Changes to Terms"],
            ["contact", "Contact Us"],
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
        <Section id="acceptance" title="Acceptance of Terms">
          <p className="text-secondary-foreground">
            By accessing or using {websiteName} ("Services"), you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree, please discontinue use.
          </p>
        </Section>

        <Section id="eligibility" title="Eligibility">
          <p className="text-secondary-foreground">
            You must be at least the legal age of majority in your jurisdiction to use our Services. By using the Services, you represent that you meet this requirement.
          </p>
        </Section>

        <Section id="accounts" title="Accounts & Registration">
          <p className="text-secondary-foreground">
            To access certain features, you may need to create an account. You are responsible for maintaining confidentiality of your login credentials and for all activity under your account.
          </p>
        </Section>

        <Section id="use" title="Permitted Use">
          <p className="text-secondary-foreground">
            You may use our Services for lawful purposes only. You agree not to interfere with the proper functioning of the Services or circumvent security measures.
          </p>
        </Section>

        <Section id="prohibited" title="Prohibited Activities">
          <ul className="text-secondary-foreground">
            <li>Engaging in fraudulent or unlawful activities.</li>
            <li>Uploading malicious code or viruses.</li>
            <li>Infringing intellectual property rights of others.</li>
            <li>Spamming, scraping, or unauthorized data collection.</li>
          </ul>
        </Section>

        <Section id="intellectual" title="Intellectual Property">
          <p className="text-secondary-foreground">
            All content, trademarks, logos, and intellectual property on {websiteName} remain the property of {companyName} or its licensors. You may not use, reproduce, or distribute without prior written permission.
          </p>
        </Section>

        <Section id="payments" title="Payments & Subscriptions">
          <p className="text-secondary-foreground">
            If our Services include paid features, you agree to provide accurate payment information and comply with applicable billing terms. Fees are non-refundable unless required by law.
          </p>
        </Section>

        <Section id="termination" title="Termination">
          <p className="text-secondary-foreground">
            We reserve the right to suspend or terminate your access to the Services at our discretion, without notice, if you violate these Terms.
          </p>
        </Section>

        <Section id="liability" title="Limitation of Liability">
          <p className="text-secondary-foreground">
            To the maximum extent permitted by law, {companyName} is not liable for indirect, incidental, or consequential damages arising from use of the Services.
          </p>
        </Section>

        <Section id="indemnity" title="Indemnification">
          <p className="text-secondary-foreground">
            You agree to indemnify and hold harmless {companyName}, its affiliates, and employees from claims, damages, or expenses arising out of your use of the Services or violation of these Terms.
          </p>
        </Section>

        <Section id="governing-law" title="Governing Law">
          <p className="text-secondary-foreground">
            These Terms shall be governed by the laws of your jurisdiction of incorporation/operation, without regard to conflicts of law principles.
          </p>
        </Section>

        <Section id="disputes" title="Dispute Resolution">
          <p className="text-secondary-foreground">
            Any disputes shall be resolved through good faith negotiations. If unresolved, disputes may be submitted to binding arbitration or the courts of the applicable jurisdiction.
          </p>
        </Section>

        <Section id="changes" title="Changes to Terms">
          <p className="text-secondary-foreground">
            We may update these Terms from time to time. Updated versions will be posted here with a new “Last Updated” date. Continued use of the Services constitutes acceptance.
          </p>
        </Section>

        <Section id="contact" title="Contact Us">
          <p className="text-secondary-foreground">
            For questions about these Terms, please contact us:
          </p>
          <ul>
            <li>Email: <a className="underline" href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
            <li>Address: {address}</li>
          </ul>
        </Section>
      </div>

     
    </main>
  );
}
