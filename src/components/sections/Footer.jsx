import { BrandMark } from '../ui/Icons';

export default function Footer({ t }) {
  return (
    <footer className="site-footer">
      <div className="content-wrap">
        <a
          href="#home"
          className="brand-symbol"
          aria-label={`Caio Rissa — ${t.top}`}
        >
          <BrandMark />
        </a>
        <p>{t.footer.replace('{year}', new Date().getFullYear())}</p>
        <a href="#home" aria-label={t.top}>
          ↑
        </a>
      </div>
    </footer>
  );
}
