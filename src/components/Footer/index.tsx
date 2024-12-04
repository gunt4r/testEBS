import { Link } from 'react-router-dom';
import style from './styleFooter.module.css';
import classNames from 'classnames';
import { FaFacebookF } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
export default function Footer() {
  return (
    <section className={classNames(style['section-footer'])}>
      <div className={classNames(style['section-footer__content'])}>
        <Link className={classNames(style['section-nav__logo'])} to="/">
          <div className={classNames(style['section-nav__logo-wrapper'])}>
            <p className={classNames(style['section-nav__logo-text'])}>
              Prangati
            </p>
          </div>
        </Link>

        <ul className={classNames(style['section-footer__content-list'])}>
          <li
            className={classNames(style['section-footer__content-list-item'])}
          >
            About
          </li>
          <li
            className={classNames(style['section-footer__content-list-item'])}
          >
            Group Companies
          </li>
          <li
            className={classNames(style['section-footer__content-list-item'])}
          >
            Help
          </li>
          <li
            className={classNames(style['section-footer__content-list-item'])}
          >
            Consumer Policy
          </li>
        </ul>
        <div className={classNames(style['section-footer__content-socials'])}>
          <a href="https://www.facebook.com/vlad.prangati/">
            <FaFacebookF className={classNames(style['section-footer__content-social'])} />
          </a>
          <a href="https://www.instagram.com/prangati.1/">
            <FaInstagram className={classNames(style['section-footer__content-social'])} />
          </a>
        </div>
      </div>
    </section>
  );
}
