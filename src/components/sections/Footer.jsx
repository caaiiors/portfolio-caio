export default function Footer({ t }) {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '32px 24px', textAlign: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
        {t.footer.replace('{year}', new Date().getFullYear())}
      </p>
    </footer>
  );
}
