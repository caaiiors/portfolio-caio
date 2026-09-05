import { socials } from '../../data/projects';
import { ArrowUpRight, WhatsApp } from '../ui/Icons';

const email = 'caiorissa@gmail.com';
const whatsappNumber = '5551994210879';

export default function Contact({ t }) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t.contact.whatsappMessage)}`;

  return (
    <section
      id="contact"
      className="section contact-section"
      aria-labelledby="contact-title"
    >
      <div className="content-wrap">
        <div className="contact-card">
          <p className="section-label">{t.contact.eyebrow}</p>
          <h2 id="contact-title">{t.contact.title}</h2>
          <p>{t.contact.text}</p>
          <div className="contact-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="button button-light"
            >
              <WhatsApp />
              {t.contact.whatsapp}
            </a>
            <a
              href={`mailto:${email}?subject=${encodeURIComponent(t.contact.subject)}`}
              className="text-link"
              aria-label={`${t.contact.email}: ${email}`}
            >
              {email}
              <ArrowUpRight />
            </a>
          </div>
          <div className="social-row">
            <span>{t.contact.social}</span>
            <div>
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.name}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
