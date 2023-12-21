import React from 'react';
import {Button, Carousel, Container, Image, Nav} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faGoogle, faInstagram, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="text-center" style={{background: 'white', color: 'gray'}}>

            <Container className='p-3'>
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                    <div>

                        <Button variant="outline-dark" className="m-1 footer-icon-button">
                            <FontAwesomeIcon icon={faFacebookF}/>
                        </Button>
                        <Button variant="outline-dark" className="m-1 footer-icon-button">
                            <FontAwesomeIcon icon={faTwitter}/>
                        </Button>
                        <Button variant="outline-dark" className="m-1 footer-icon-button">
                            <FontAwesomeIcon icon={faGoogle}/>
                        </Button>
                        <Button variant="outline-dark" className="m-1 footer-icon-button">
                            <FontAwesomeIcon icon={faInstagram}/>
                        </Button>
                        <Button variant="outline-dark" className="m-1 footer-icon-button">
                            <FontAwesomeIcon icon={faLinkedin}/>
                        </Button>
                    </div>
                    <div>
                        <Nav className="justify-content-center footer-links" activeKey="/home">
                            <Nav.Item>
                                <Nav.Link href="/home">About us</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-1">Technical Support</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2">Agreement</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>

            </Container>
        </footer>

        // <footer
        //     style={{
        //         background: "white",
        //         color: "black",
        //         height: "5vh",
        //         display: "flex",
        //         alignItems: "center",
        //         justifyContent: 'space-between',
        //     }}
        // >
        //
        //
        //     <p style={{margin: 0}}>Java EE Spring Boot, Frontend</p>
        //     <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        //
        //     </div>
        // </footer>
    );
};

export default Footer;