import { projectDetails } from "@/constants/project-details";
import { useFetch } from "@/hooks/useFetch";
import { ProjectDetails } from "@/models/settings";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-3">
        {title}
      </h2>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm md:text-base">
        {children}
      </div>
    </section>
  );
}

export default async function CookiePolicyPage() {
  const fetchDetails = {
    endpoint: "/policies",
    method: "GET",
    title: "Project details",
  };
  const data = await useFetch<ProjectDetails>(fetchDetails);

  const PROJECT_DATA = data?.data[0] || projectDetails;

  const vendors = [
    { name: "Vercel", purpose: "hosting" },
    { name: "Google Analytics", purpose: "analytics" },
    // { name: "Stripe", purpose: "payments" },
  ];

  const {
    projectName,
    email,
    phone,
    address,
    city,
    country,
    createdAt,
    updatedAt,
  } = PROJECT_DATA;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${projectName} Cookie Policy`,
    description: `${projectName} cookie policy describing how cookies and tracking technologies are used on ${projectName}.`,
    isPartOf: {
      "@type": "WebSite",
      name: projectName,
    },
    datePublished: createdAt,
    dateModified: updatedAt,
  };

  return (
    <section className="mx-auto bg-secondary/70 text-foreground border rounded-md w-[95%] max-w-4xl px-4 sm:px-6 md:px-8 my-8 py-10 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
          Cookie Policy
        </h1>
        <p className="mt-2 text-sm md:text-base text-muted-foreground">
          <span className="mr-3">
            Effective Date:{" "}
            <time dateTime={new Date(createdAt).toISOString()}>
              {new Date(createdAt).toLocaleDateString("en-GB")}
            </time>
          </span>
          <span>
            Last Updated:{" "}
            <time dateTime={new Date(updatedAt).toISOString()}>
              {new Date(updatedAt).toLocaleDateString("en-GB")}
            </time>
          </span>
        </p>
      </div>

      {/* Quick navigation */}
      <nav className="mb-10">
        <ul className="grid md:grid-cols-2 gap-2 text-sm">
          {[
            ["intro", "Introduction"],
            ["what-are-cookies", "What Are Cookies?"],
            ["types", "Types of Cookies We Use"],
            ["purpose", "Why We Use Cookies"],
            ["third-party", "Third-Party Cookies"],
            ["manage", "Managing Cookies"],
            ["changes", "Changes to This Policy"],
            ["contact", "Contact Us"],
          ].map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-flex items-center rounded-xl border px-3 py-2 hover:bg-accent hover:text-accent-foreground transition"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-10">
        <Section id="intro" title="Introduction">
          <p className="text-secondary-foreground">
            This Cookie Policy explains how {projectName} uses cookies and
            similar technologies on {projectName}. By using our Services, you
            consent to the use of cookies as described in this Policy.
          </p>
        </Section>

        <Section id="what-are-cookies" title="What Are Cookies?">
          <p className="text-secondary-foreground">
            Cookies are small text files placed on your device by websites you
            visit. They help websites remember information about your visit,
            improve performance, and provide a better user experience.
          </p>
        </Section>

        <Section id="types" title="Types of Cookies We Use">
          <ul className="text-secondary-foreground">
            <li>
              <strong>Essential cookies</strong> — Required for the operation of
              our website (e.g., authentication, security).
            </li>
            <li>
              <strong>Performance cookies</strong> — Collect information about
              how visitors use our site to help us improve functionality.
            </li>
            <li>
              <strong>Functional cookies</strong> — Remember preferences and
              personalize content.
            </li>
            <li>
              <strong>Advertising/targeting cookies</strong> — Deliver relevant
              ads and measure ad performance (only if applicable).
            </li>
          </ul>
        </Section>

        <Section id="purpose" title="Why We Use Cookies">
          <p>We use cookies to:</p>
          <ul className="text-secondary-foreground">
            <li>Ensure the website functions properly.</li>
            <li>Enhance performance and improve user experience.</li>
            <li>Analyze traffic and usage patterns.</li>
            <li>
              Provide personalized content and advertising (if applicable).
            </li>
          </ul>
        </Section>

        <Section id="third-party" title="Third-Party Cookies">
          <p className="text-secondary-foreground">
            Some cookies may be placed by third-party providers (e.g.,
            analytics, advertising networks, social media platforms). We do not
            control these cookies. Please refer to the respective third-party
            privacy/cookie policies for details.
          </p>
        </Section>

        <Section id="manage" title="Managing Cookies">
          <p className="text-secondary-foreground">
            You can manage or disable cookies through your browser settings.
            Note that disabling certain cookies may affect website
            functionality.
          </p>
          <p className="mt-2 text-sm">
            <span className="underline">Cookie Settings</span>
          </p>
        </Section>

        <Section id="changes" title="Changes to This Policy">
          <p className="text-secondary-foreground">
            We may update this Cookie Policy from time to time. Any changes will
            be posted here with an updated "Last Updated" date. Continued use of
            the website constitutes acceptance of the updated Policy.
          </p>
        </Section>

        <Section id="contact" title="Contact Us">
          <p className="text-secondary-foreground">
            If you have any questions about our Cookie Policy, contact us:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a className="underline" href={`mailto:${email}`}>
                {email}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a className="underline" href={`tel:${phone}`}>
                {phone}
              </a>
            </li>
            <li>
              Address: {address} {city} {country}
            </li>
          </ul>
        </Section>
      </div>
    </section>
  );
}
