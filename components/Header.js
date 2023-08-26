import { Navbar, Nav, Button, Offcanvas, Container } from "react-bootstrap";
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from 'next/image';


const Header = (props) => {

    const router = useRouter();

    const isActive = (href) => {
        if (href === "/") {
            return router.pathname === href ? "active_nav" : "inactive_nav";
        }
        return router.pathname.startsWith(href) ? "active_nav" : 'inactive_nav';
    };

    return (
        <div className="">
            <Container fluid>
                <Navbar
                    collapseOnSelect
                    bg="dark"
                    expand="lg"
                    key="nav"
                    variant="dark"
                    className="mb-4 pt-4"
                    style={{ border: "none" }}
                >
                    <div style={{
                        position: "absolute", left: -10, borderRadius: "560px",
                        opacity: "0.6000000238418579", filter: "blur(280px)",
                        zIndex: "1",
                    }}>
                        <div style={{ height: "560px", width: '560px', background: "#500e49", zIndex: "0", }}>

                            <div className="glow">

                            </div>

                        </div>
                    </div>

                    <Link href="/" style={{ zIndex: 5 }}  >
                        <Navbar.Brand className="m-3"  >
                            <Image
                                src="/media/OrdimintSVGLogo.svg"
                                width={150}
                                height={70}
                                priority={false}
                                className="d-inline-block align-top align-start "
                                alt="Ordimint Brand Logo"
                            />
                        </Navbar.Brand>
                    </Link>


                    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ zIndex: 5 }} />

                    <Navbar.Offcanvas
                        id="responsive-navbar-nav"
                        aria-labelledby="offcanvasNavbarLabel-expand-nav"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton closeVariant="white">
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand-nav">
                                <Container className="justify-content-center">

                                </Container>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body id="mobile-menu">
                            <Nav variant="pills" className="container" style={{ zIndex: 5 }}>

                            </Nav>


                            <Nav style={{ zIndex: 5 }}>
                                <Nav.Item>
                                    <a href="/" className={isActive('/')}>

                                        Inscribe
                                    </a>
                                </Nav.Item>
                                <Nav.Item>
                                    <a href="/check-order" className={isActive('/check-order')}>
                                        Check Order
                                    </a>
                                </Nav.Item>
                                <Nav.Item>
                                    <a href="/wallet" className={isActive('/wallet')}>
                                        Wallet
                                    </a>
                                </Nav.Item>
                                <Nav.Item>
                                    <a href="/ordinal-collections" className={isActive('/ordinal-collections')}>
                                        Collections
                                    </a>
                                </Nav.Item>

                                <Nav.Item>
                                    <a href="/faq" className={isActive('/faq')}>

                                        FAQ
                                    </a>
                                </Nav.Item>
                                <hr></hr>
                                <Nav.Item >
                                    <a className="nav_button" href="https://api.ordimint.com" target="_blank" rel="noreferrer">
                                        API

                                    </a>
                                </Nav.Item>
                                <Nav.Item  >
                                    <a className="nav_button" href="https://testnet.ordimint.com" target="_blank" rel="noreferrer">
                                        Testnet Explorer
                                    </a>
                                </Nav.Item>
                                <Nav.Item >

                                    <a className="nav_button" href="https://explorer.ordimint.com" target="_blank" rel="noreferrer">
                                        <span>Ordinals Explorer</span>
                                    </a>
                                </Nav.Item>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Navbar >
                {/* <Row>
        <div id='logo'>
            <a href="/">
              <img src={logo} alt="LN ⚡ VPN" id="header-image"></img> 
            </a>
            </div>
      </Row> */}
            </Container >
        </div >
    );
};

export default Header;
