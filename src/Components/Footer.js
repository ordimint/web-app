import React from "react";
import { FaTwitterSquare, FaGithub, FaTelegram } from "react-icons/fa";


const Footer = () => {
    return (
        <div className="footer-text">
            <div className="mb-3">
                <a
                    href="https://twitter.com/ordimint"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaTwitterSquare color="white" size="30" />
                </a>
                &ensp;|&ensp;
                <a
                    href="https://github.com/ordimint/web-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub color="white" size="30" />
                </a>{" "}
                &ensp;|&ensp;
                {/*             
            &ensp;|&ensp;
            <a href="/api/documentation" target="_blank" rel="noopener noreferrer">
                API
            </a>{" "}
            &ensp;|&ensp;  */}
                <a
                    href="https://t.me/ordimint"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaTelegram color="white" size="30" />
                </a><br></br>
            </div>
            {/* <div>
                {" "}
                {" "}2023{" "}by{" "}
                <a
                    href="https://twitter.com/Lightrider5"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Lightrider
                </a>
            </div> */}
        </div>
    );
};

export default Footer;