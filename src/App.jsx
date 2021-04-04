import React from 'react';
import { Container, Row, Col, FormControl, InputGroup, Button } from 'react-bootstrap';

import { Channels } from './components/index.js';

const App = () => (
  <Row className="h-100">
    <Col xs={3}>
      <Channels />
    </Col>
    <Col>
      <div className="d-flex flex-column h-100">
        <div>
        Hello main
        </div>
        <div className="mt-auto">
          <InputGroup size="lg">
            <FormControl
              placeholder="Type text..."
              aria-label="Input"
            />
            <InputGroup.Append>
              <Button variant="outline-success" style={{ minWidth: "80px" }}>
                Sent
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    </Col>
  </Row>
);

export default App;
