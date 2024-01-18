import React, { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface FormContainerProps {
  children: ReactNode; 
}

// Use function declaration syntax
const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children} {/* Use the "children" prop */}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
