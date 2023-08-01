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
                    className="mb-3 pt-4"
                    style={{ border: "none" }}
                >
                    <div style={{
                        position: "absolute", left: -10, borderRadius: "560px",
                        opacity: "0.6000000238418579", filter: "blur(280px)",
                    }}>
                        <div style={{ height: "560px", width: '560px', background: "#500e49" }}>

                            <div className="glow">

                            </div>

                        </div>
                    </div>

                    <Link href="/">
                        <Navbar.Brand>
                            <Image
                                src="/media/logo.png"
                                width={130}
                                height={50}
                                style={{ zIndex: 5 }}
                                priority={false}
                                className="d-inline-block align-top align-start "
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
                            <Nav variant="pills" className="container" style={{ zIndex: 5 }}>
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
                                {/* <Nav.Item>

                                    <a href="/market" className={isActive('/market')}>

                                        Market
                                    </a>



                                </Nav.Item> */}
                                <Nav.Item>

                                    <a href="/search" className={isActive('/search')}>

                                        Search
                                    </a>

                                </Nav.Item>
                                <Nav.Item>
                                    <a href="/faq" className={isActive('/faq')}>

                                        FAQ
                                    </a>
                                </Nav.Item>
                            </Nav>

                            <hr></hr>
                            <Nav >

                                <Nav.Item className="mb-4">
                                    <a className="nav_button" href="https://api.ordimint.com" target="_blank" rel="noreferrer">
                                        API

                                    </a>
                                </Nav.Item>
                                <Nav.Item className="mb-4" >
                                    <a className="nav_button" href="https://testnet.ordimint.com" target="_blank" rel="noreferrer">
                                        TestnetExplorer
                                    </a>
                                </Nav.Item>
                                <Nav.Item className="mb-4">

                                    <a className="nav_button" href="http://explorer.ordimint.com" target="_blank" rel="noreferrer">
                                        <span>OrdinalExplorer</span>
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
