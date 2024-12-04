import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoSearchOutline } from 'react-icons/io5';
import { GiShop } from 'react-icons/gi';
import { MdShoppingCart } from 'react-icons/md';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';

import Dropdownlanguage from './dropdownLanguage/dropdownLanguage';
import style from './styleHeader.module.css';

function Header() {
  const { t } = useTranslation();
  const API_PRODUCT = `${import.meta.env.VITE_API_STORE}/products`;
  const [showSearch, setShowSearch] = useState(false);
  const [inputDetails, setInputDetails] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setShowSearch(false);
    }
  };


  useEffect(() => {
    if (inputDetails.trim() === '') {
      setSearchResults([]);
      setShowSearch(false);
    } else {
      handleSearch();
    }
  }, [inputDetails]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(API_PRODUCT);
      const filteredResults = response.data.filter((item: { title: string }) =>
        item.title.toLowerCase().includes(inputDetails.toLowerCase())
      );

      setShowSearch(true);
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  interface ListItems {
    id: string;
    title: string;
    price: number;
    image: string;
  }

  return (
    <div ref={searchRef} className={classNames(style['section-nav__header'])}>
      <section
        className={classNames(style['section-nav'])}
        color="backgroundColor"
      >
        <Link className={classNames(style['section-nav__logo'])} to="/">
          <div className={classNames(style['section-nav__logo-wrapper'])}>
            <p className={classNames(style['section-nav__logo-text'])}>
              Prangati
            </p>
          </div>
        </Link>
        <section className={classNames(style['section-nav__helpers'])}>
          <motion.div
            className={classNames(style['section-nav__helpers-search-wrapper'])}
            whileHover={{
              x: 5,
              rotate: 0,
            }}
          >
            <label
              className={classNames(style['section-nav__helpers-search-label'])}
              htmlFor="search"
            >
              <IoSearchOutline className={classNames('text-black text-xl')} />
            </label>
            <div className={classNames(style['section-nav__helpers-search'])}>
              <input
                className={classNames(
                  style['section-nav__helpers-search-input']
                )}
                id="search"
                name="search"
                placeholder={t('search')}
                type="text"
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const { value } = e.currentTarget;

                  setInputDetails(value);
                }}
              />
            </div>
          </motion.div>
        </section>
        <ul className={classNames(style['section-nav__menu'])}>
          <Dropdownlanguage />
          <li className={classNames(style['section-nav__menu-item'])}>
            <Link
              className={classNames(style['section-nav__menu-item-link'])}
              to="/"
            >
              {' '}
              <FaUser
                className={classNames(
                  style['section-nav__menu-item-link__icon']
                )}
              />
              {t('login')}
            </Link>
          </li>
          <li className={classNames(style['section-nav__menu-item'])}>
            <Link
              className={classNames(style['section-nav__menu-item-link'])}
              to="/cart"
            >
              {' '}
              <MdShoppingCart
                className={classNames(
                  style['section-nav__menu-item-link__icon']
                )}
              />
              {t('cart')}
            </Link>
          </li>
          <li className={classNames(style['section-nav__menu-item'])}>
            <Link
              className={classNames(style['section-nav__menu-item-link'])}
              to="/"
            >
              {' '}
              <GiShop
                className={classNames(
                  style['section-nav__menu-item-link__icon']
                )}
              />
              {t('becomeSeller')}
            </Link>
          </li>
        </ul>

        {showSearch && (
          <div className={classNames(style['section-nav__search-results'])}>
            <ul className={classNames(style['section-nav__search-list'])}>
              {searchResults.map((item: ListItems) => {
                  const { id, title, image, price } = item;

                  if (image.length === 0) return "";
                  if (inputDetails === "") {
                    setSearchResults([]);
                    setShowSearch(false);
                  }

                  return (
                    <Link to={`/products/${id}`}>
                    <li className={classNames(style['section-nav__search-list-item'])}>
                      <img alt="" src={image} />{" "}
                      <div
                        className={classNames(
                          style["section-nav__search-results-description"],
                        )}
                      >
                        <h5>{title}</h5> <p>{price}$</p>
                      </div>
                    </li>
                    </Link>
                  );
                })}
            </ul>
          </div>
        )}
      </section>
      <hr className={classNames(style['section-nav__underline'])} />
    </div>
  );
}

export default Header;
