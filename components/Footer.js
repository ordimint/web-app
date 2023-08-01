import React from "react";
import { FaTwitterSquare, FaGithub, FaYoutube, FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";
import Image from 'next/image';


const Footer = () => {
    return (
        <div className="px-4 pt-4 position-relative" >
            <div className="px-4" >
                <div style={{ position: "absolute", width: "100%", right: 50, zIndex: 5 }}>


                    <div style={{ display: "flex", justifyContent: "end", alignItems: "center", color: "#888889", }} >

                        <div className="d-flex gap-4 " >
                            <a href="https://t.me/ordimint" target="_blank" className="link_text">
                                <FaTelegramPlane size="25" /> <span>Telegram</span>
                            </a>
                            <a href="https://github.com/ordimint/web-app" target="_blank" className="link_text">
                                <FaGithub size="25" /> <span>Github</span>
                            </a>
                            <a href="https://twitter.com/ordimint" target="_blank" className="link_text">
                                <FaTwitterSquare size="25" /> <span>Twitter</span>
                            </a>



                        </div>
                    </div>
                </div>
                <div className="py-4">


                </div>
                <div className="d-flex gap-4 pb-4 d-flex justify-content-center">
                    <div className="small text-muted">Ordimint. ©2023. All rights reserved</div>
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