import { Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import hmbLogo from "../assets/hmbLogo.png";
import "../styles/logo.css";

type Props = {};

function Title({}: Props) {
  return (
    <div>
      <Row className="justify-content-md-center">
        <Col style={{ alignContent: "center", alignItems: "center" }}>
          <Image src={hmbLogo} rounded className="logo-img" />

          <div className="text-center">
            <h3
              style={{
                fontWeight: "bold",
                backgroundColor: "#e9e9e9ff",
                borderRadius: "10px",
                fontSize:"40px"
              }}
            >
              Equipments
            </h3>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Title;
