import React from 'react';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Connect from '@components/Connect';
import LanguageSwitcher from '@components/common/LanguageSwitcher';
import SocialLinks from '@components/common/SocialLinks';
import styles from '@styles/scss/Header.module.scss';

const Header = () => {
  return (
    <AppBar position="fixed" className={styles.header}>
      <Toolbar disableGutters className={styles.toolbar}>
        <Box>
          <img src="/assets/icon.svg" alt="Mobile Logo" className={styles.mobileLogo} />
          <img src="/assets/logo.svg" alt="Logo" className={styles.logo} />
        </Box>
        <Connect />
        <div className={styles.rightContent}>
          <SocialLinks />
          <LanguageSwitcher />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
