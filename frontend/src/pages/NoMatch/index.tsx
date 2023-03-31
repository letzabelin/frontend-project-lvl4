import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NoMatchPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center h-100">
      <h1 className="mb-3">{t('noMatchPage.title')}</h1>

      <p className="fw-bold mb-2">{t('noMatchPage.whatsHappenedQuestion')}</p>

      <p>{t('noMatchPage.whatsHappenedAnswer')}</p>

      <p className="fw-bold mb-2">{t('noMatchPage.whyHappenedQuestion')}</p>

      <p className="text-center">{t('noMatchPage.whyHappenedAnswer')}</p>

      <p className="fw-bold mb-2">{t('noMatchPage.whatToDoQuestion')}</p>

      <p>
        <span>{t('noMatchPage.whatToDoAnswer')}</span>
        &nbsp;
        <Link to="/">{t('noMatchPage.linkToHome')}</Link>
      </p>
    </Container>
  );
};

export default NoMatchPage;
