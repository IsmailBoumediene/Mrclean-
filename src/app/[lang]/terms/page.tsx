import { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { Locale } from '@/lib/i18n/config';
import { buildBreadcrumbLd, buildPageMetadata } from '@/lib/seo';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isFr = params.lang === 'fr';
  return buildPageMetadata({
    lang: params.lang,
    route: 'terms',
    title: isFr ? "Conditions d'Utilisation - Mr Clean+" : 'Terms of Use - Mr Clean+',
    description: isFr
      ? "Consultez les conditions d'utilisation des services Mr Clean+."
      : 'Read the terms of use for Mr Clean+ services.',
  });
}

const Section = ({ id, section }: { id: string; section: any }) => (
  <section id={id}>
    <h2>{section.title}</h2>
    {section.subtitle && <h3>{section.subtitle}</h3>}
    {section.inShort && <p><strong>{section.inShort}</strong></p>}
    {section.p1 && <p className="mc-legal-preline">{section.p1}</p>}
    {section.list && (
      <ul>
        {section.list.map((item: string, i: number) => <li key={i}>{item}</li>)}
      </ul>
    )}
    {section.p2 && <p className="mc-legal-preline">{section.p2}</p>}
    {section.p3 && <p className="mc-legal-preline">{section.p3}</p>}
    {section.email && (
      <p><a href={`mailto:${section.email}`}>{section.email}</a></p>
    )}
    {section.address && (
      <address>
        {section.address.map((line: string, i: number) => <div key={i}>{line}</div>)}
      </address>
    )}
  </section>
);

export default async function TermsPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const breadcrumbLd = buildBreadcrumbLd({
    lang: params.lang,
    items: [
      { name: dict.nav.home, path: '' },
      { name: dict.footer.terms, path: '/terms' },
    ],
  });
  const terms = dict.terms as {
    title: string;
    lastUpdated: string;
    intro: string;
    tocTitle: string;
    toc: { id: string; label: string }[];
    sections: Record<string, any>;
  };

  return (
    <div className="mc-legal-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <article className="privacy-policy-container mc-legal-container">
      <h1 className="mc-legal-title">{terms.title}</h1>
      <p><strong>{terms.lastUpdated}</strong></p>

      {terms.intro && (
        <section>
          <p
            className="mc-legal-preline"
            dangerouslySetInnerHTML={{ __html: terms.intro }}
          />
        </section>
      )}

      <section>
        <h2>{terms.tocTitle}</h2>
        <ol>
          {terms.toc.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ol>
      </section>

      {terms.toc.map((item) => (
        <Section
          key={item.id}
          id={item.id}
          section={terms.sections[item.id]}
        />
      ))}
      </article>
    </div>
  );
}
