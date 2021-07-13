import React from 'react';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { CommonLayout } from '../index.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <CommonLayout>
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow">
              <Card.Header as="h1" className="text-center fs-3">
                {t('404')}
              </Card.Header>
              <Card.Img src="/assets/images/404.png" />
              <Card.Footer className="text-center">
                <Link to="/">{t('home')}</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </CommonLayout>
  );
};

export default NotFoundPage;
