import React from "react";
import { FaTwitterSquare, FaGithub, FaYoutube, FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";
import Image from 'next/image';


const Footer = () => {
    return (
        <div className="px-4 pt-4 position-relative" >
            <div className="px-4">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#888889", zIndex: 5 }} >
                    <div className="d-flex gap-4  ">
                        <a href="/" className="link_text">
                            Inscribe
                        </a>

                        <a href="/check-order" className="link_text" >
                            Check Order
                        </a>
                        <a href="/wallet" className="link_text">
                            Wallet
                        </a>
                        <a href="/ordinal-collections" className="link_text">
                            Collections
                        </a>
                        <a href="/search" className="link_text">
                            Search
                        </a>
                        <a href="/faq" className="link_text">
                            Faq
                        </a>
                    </div>

                    <div className="d-flex gap-4 ">
                        <a href="https://t.me/ordimint" className="link_text">
                            <FaTelegramPlane size="25" /> <span>Telegram</span>
                        </a>
                        <a href="https://github.com/ordimint/web-app" className="link_text">
                            <FaGithub size="25" /> <span>Github</span>
                        </a>
                        <a href="https://twitter.com/ordimint" className="link_text">
                            <FaTwitterSquare size="25" /> <span>Twitter</span>
                        </a>
                        <a href="https://youtube.com/ordimint" className="link_text">
                            <FaYoutube size="25" /> <span>Youtube</span>
                        </a>


                    </div>
                </div>
                <div className="py-4">

                    <Image
                        src="/media/logo.png"
                        width={150}
                        height={60}
                        priority={false}
                        className="d-inline-block align-top align-start"
                        alt="Ordimint Brand Logo"
                    />

                </div>
                <div className="d-flex gap-4 pb-4">
                    <div className="text-sm">Terms of Service</div> <div className="small text-muted">Ordimint. ©2023. All rights reserved</div>
                </div>
            </div>

            <div style={{
                position: "absolute", right: -10, bottom: 0, borderRadius: "560px",
                opacity: "0.6000000238418579", filter: "blur(280px)"
            }}>
                <div style={{ height: "250px", width: '250px', background: "#f69102" }}>

                    <div className="glow">

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Footer;