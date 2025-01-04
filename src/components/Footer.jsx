import style from "./Footer.module.css";
function Footer() {
  return (
    <footer className={style.footer}>
      <p className={style.copyright}>
        &Copy; Copyright {new Date().getFullYear()} by worldWise inc.
      </p>
    </footer>
  );
}

export default Footer;
