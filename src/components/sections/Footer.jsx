export default function Footer({ t }) {
  return (
    <footer className="site-footer">
      <div className="content-wrap">
        <a href="#home" className="footer-brand">CR</a>
        <p>{t.footer.replace('{year}', new Date().getFullYear())}</p>
        <a href="#home" aria-label={t.top}>↑</a>
      </div>
    </footer>
  );
}
