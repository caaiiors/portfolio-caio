import { socials } from '../../data/projects';
import { ArrowUpRight, WhatsApp } from '../ui/Icons';

const email = 'caiorissa@gmail.com';
const whatsappNumber = '5551994210879';

export default function Contact({ t }) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t.contact.whatsappMessage)}`;

  return (
    <section id="contact" className="section contact-section">
      <div className="content-wrap">
        <div className="contact-card">
          <p className="eyebrow eyebrow-light">{t.contact.eyebrow}</p>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.text}</p>
          <div className="contact-actions">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button button-light">
              <WhatsApp />{t.contact.whatsapp}
            </a>
            <a href={`mailto:${email}?subject=Contato%20via%20Portfólio`} className="button button-ghost-light">
              {t.contact.email}<ArrowUpRight />
            </a>
          </div>
          <div className="social-row">
            <span>{t.contact.social}</span>
            <div>
              {socials.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noreferrer">
                  {social.name}<ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
