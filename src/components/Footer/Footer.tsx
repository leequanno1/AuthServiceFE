import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {

    return (
        <footer>
            <div className="ft-block">
                <h3>About Authify</h3>
                <span>
                    Authify is a modern authentication gateway that helps organizations integrate secure login solutions into any external system. We support OAuth2, OpenID Connect, and other protocols with a developer-friendly experience.
                </span>
            </div>
            <div className="ft-block block-ct">
                <h3>Why choose us?</h3>
                <ul>
                    <li>Easy integration</li>
                    <li>Enterprise-grade security</li>
                    <li>Compatible with any platform</li>
                    <li>Real-time analytics</li>
                </ul>
            </div>
            <div className="ft-block">
                <h3>Need Help?</h3>
                <span>Visit our Documentation, or contact support@authify.com</span>
            </div>
        </footer>
    );
}

export default Footer;