import { Navbar, Nav, Button, Offcanvas, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import logo from "../media/logo.png";
const Header = (props) => {
    return (
        <div>
            <Container fluid>
                <Navbar
                    collapseOnSelect
                    bg="dark"
                    expand="sm"
                    key="nav"
                    variant="dark"
                    className="mb-3"
                >
                    {/* <Navbar.Brand href="/">
                        ORDIMINT
                    </Navbar.Brand> */}
                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            width="130"
                            height="50"
                            className="d-inline-block align-top align-start"
                            alt="Ordimint Brand Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Offcanvas
                        id="responsive-navbar-nav"
                        aria-labelledby="offcanvasNavbarLabel-expand-nav"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton closeVariant="white">
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand-nav">
                                <Container className="justify-content-center">
                                    {/* <img src={logo} alt="LN ⚡ VPN" id="nav-menu-image"></img>  */}
                                </Container>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav variant="pills" className="container">
                                <Nav.Item>
                                    <LinkContainer to="/">
                                        <Nav.Link>Inscribe  </Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                                <Nav.Item>
                                    <LinkContainer to="/checkorder">
                                        <Nav.Link>Check Order </Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                                <Nav.Item>
                                    <LinkContainer to="/wallet">
                                        <Nav.Link>Wallet</Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                                <Nav.Item>
                                    <LinkContainer to="/collections">
                                        <Nav.Link>Collections</Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                                <Nav.Item>
                                    <LinkContainer to="/search">
                                        <Nav.Link>Search </Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                                <Nav.Item>
                                    <LinkContainer to="/faq">
                                        <Nav.Link>FAQ </Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>




                            </Nav>
                            <Nav >
                                {/* <Nav.Item >
                                    <a href="https://api.ordimint.com" target="_blank" rel="noreferrer">
                                        <Button >API</Button>
                                    </a>
                                </Nav.Item> */}
                                <Nav.Item >
                                    <a href="http://explorer.ordimint.com" target="_blank" rel="noreferrer">
                                        <Button >Explorer</Button>
                                    </a>
                                </Nav.Item>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Navbar>
                {/* <Row>
        <div id='logo'>
            <a href="/">
              <img src={logo} alt="LN ⚡ VPN" id="header-image"></img> 
            </a>
            </div>
      </Row> */}
            </Container>
        </div>
    );
};

export default Header;
