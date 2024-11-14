import { Col, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink, Row } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import './index.css';
import logo from "assets/logo.png"

const Header = () => {
    return (
        <header>
            <Navbar className="p-3 header-navbar" expand="lg">
                <Container>
                    <Row>
                        <Col md="6" className="d-flex align-items-center">
                            <NavbarBrand tag={RRNavLink} to="/" className="d-flex align-items-center">
                                <img src={logo} alt="МГТУ им. Н. Э. Баумана" className="header-logo" />
                            </NavbarBrand>
                        </Col>
                        <Col md="6" className="d-flex justify-content-end align-items-center">
                            <Nav className="fs-5 gap-3" navbar>
                                <NavItem className="nav-item-custom">
                                    <NavLink tag={RRNavLink} to="/classrooms" className="nav-link-custom">
                                        Аудитории
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;