import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal footer-center text-base-content p-4 fixed bottom-0">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by SafeKeyz
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
