import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.redirect')}
        {' '}
        <Link to="/">{t('notFound.mainPage')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
