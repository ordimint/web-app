import { Navbar, Nav, Button, Offcanvas, Container } from "react-bootstrap";
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from 'next/image';




const Header = (props) => {

    const router = useRouter();

    const isActive = (href) => {
        if (href === "/") {
            return router.pathname === href ? "active" : "";
        }
        return router.pathname.startsWith(href) ? "active" : '';
    };

    return (
        <div>
            <Container fluid>
                <Navbar
                    collapseOnSelect
                    bg="dark"
                    expand="md"
                    key="nav"
                    variant="dark"
                    className="mb-3"
                >
                    <Link href="/">
                        <Navbar.Brand>
                            <Image
                                src="/media/logo.png"
                                width={130}
                                height={50}
                                className="d-inline-block align-top align-start"
                                alt="Ordimint Brand Logo"
                            />
                        </Navbar.Brand>
                    </Link>
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
                        <Offcanvas.Body id="mobile-menu">
                            <Nav variant="pills" className="container">
                                <Nav.Item>
                                    <Nav.Link className={isActive('/')} href="/">
                                        Inscribe  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={isActive('/check-order')} href="/check-order">Check Order</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={isActive('/wallet')} href="/wallet">Wallet</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={isActive('/ordinal-collections')} href="/ordinal-collections">Collections</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={isActive('/market')} href="/market">Market</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={isActive('/search')} href="/search">Search </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={isActive('/faq')} href="/faq">FAQ </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Nav >
                                <Nav.Item >
                                    <a href="https://api.ordimint.com" target="_blank" rel="noreferrer">
                                        <Button >API (New)</Button>
                                    </a>
                                </Nav.Item>
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
        </div >
    );
};

export default Header;
