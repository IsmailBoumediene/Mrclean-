
import { getDictionary } from '@/lib/i18n/getDictionary';
import { Locale } from '@/lib/i18n/config';

type Props = { params: { lang: Locale } };

const Section = ({ id, section, index }: { id: string; section: any; index: number }) => (
  <section id={id}>
    <h2>{section.title}</h2>
    {section.subtitle && <h3>{section.subtitle}</h3>}
    {section.inShort && <p><strong>{section.inShort}</strong></p>}
    {section.p1 && <p>{section.p1}</p>}
    {section.list && (
      <ul>
        {section.list.map((item: string, i: number) => <li key={i}>{item}</li>)}
      </ul>
    )}
    {section.p2 && <p>{section.p2}</p>}
    {section.p3 && <p>{section.p3}</p>}
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

const PrivacyPolicyPage = async ({ params }: Props) => {
  const dict = await getDictionary(params.lang);
  type SectionKey =
    | 'info-collect'
    | 'info-process'
    | 'legal-bases'
    | 'info-share'
    | 'third-party'
    | 'cookies'
    | 'info-retain'
    | 'info-safe'
    | 'minors'
    | 'privacy-rights'
    | 'dnt'
    | 'confidentialite'
    | 'updates'
    | 'contact'
    | 'review-update-delete';

  const policy = dict.privacyPolicy as {
    title: string;
    lastUpdated: string;
    intro: string;
    summaryTitle: string;
    summaryText: string;
    summaryList: string[];
    tocTitle: string;
    toc: { id: SectionKey; label: string }[];
    sections: Record<SectionKey, any>;
  };
  return (
    <div className="privacy-policy-container">

      <span style={{ fontWeight: 'bold', fontSize: '24px', color: 'blue', display: 'block', textAlign: 'center', marginBottom: '10px' }}>{policy.title}</span>
      <p><strong>{policy.lastUpdated}</strong></p>

      {policy.intro && (
        <section className="privacy-policy-intro">
          <p
            style={{ whiteSpace: 'pre-line' }}
            dangerouslySetInnerHTML={{ __html: policy.intro }}
          />
        </section>
      )}

      <section>
        <h2>{policy.summaryTitle}</h2>
        <p>{policy.summaryText}</p>
        <ul>
          {policy.summaryList.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </section>

      <section>
        <h2>{policy.tocTitle}</h2>
        <ol>
          {policy.toc.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ol>
      </section>

      {policy.toc.map((item, idx) => (
        <Section
          key={item.id}
          id={item.id}
          section={policy.sections[item.id]}
          index={idx}
        />
      ))}
    </div>
  );
};

export default PrivacyPolicyPage;
