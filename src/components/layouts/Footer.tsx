import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '@styles/scss/Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <p> {t('footer.title')}</p>
    </footer>
  );
};

export default Footer;
