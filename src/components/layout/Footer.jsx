function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__symbol">&gt;_</span>
          <span>NEXUS</span>
        </div>

        <p className="site-footer__tagline">Ideas connected. Stories shared.</p>

        <p className="site-footer__copyright">
          © {new Date().getFullYear()} NEXUS. All rights reserved by Pearla
          Mutombo.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
