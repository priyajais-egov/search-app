import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import SearchForm from './Components/search-form/search-form';
import { Row, Col } from 'react-bootstrap'
import { Container } from '@material-ui/core';

class App extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="App">
        <Container className="mt-5">
          <Row>
            <Col>
              <SearchForm></SearchForm>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
