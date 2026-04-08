import { getDictionary } from '@/lib/i18n/getDictionary';
import { Locale } from '@/lib/i18n/config';

type Props = { params: { lang: Locale } };

const Section = ({ id, section }: { id: string; section: any }) => (
  <section id={id}>
    <h2>{section.title}</h2>
    {section.subtitle && <h3>{section.subtitle}</h3>}
    {section.inShort && <p><strong>{section.inShort}</strong></p>}
    {section.p1 && <p style={{ whiteSpace: 'pre-line' }}>{section.p1}</p>}
    {section.list && (
      <ul>
        {section.list.map((item: string, i: number) => <li key={i}>{item}</li>)}
      </ul>
    )}
    {section.p2 && <p style={{ whiteSpace: 'pre-line' }}>{section.p2}</p>}
    {section.p3 && <p style={{ whiteSpace: 'pre-line' }}>{section.p3}</p>}
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
  const terms = dict.terms as {
    title: string;
    lastUpdated: string;
    intro: string;
    tocTitle: string;
    toc: { id: string; label: string }[];
    sections: Record<string, any>;
  };

  return (
    <div className="privacy-policy-container">
      <span style={{ fontWeight: 'bold', fontSize: '24px', color: 'blue', display: 'block', textAlign: 'center', marginBottom: '10px' }}>{terms.title}</span>
      <p><strong>{terms.lastUpdated}</strong></p>

      {terms.intro && (
        <section>
          <p
            style={{ whiteSpace: 'pre-line' }}
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
    </div>
  );
}
