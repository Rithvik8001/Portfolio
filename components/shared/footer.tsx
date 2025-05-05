import FooterDay from "./footer-day";

const Footer = () => {
  return (
    <footer className="mt-8">
      <hr />
      <div className="flex items-center justify-between pt-4 pb-8">
        <p className="[font-size:_12px_!important]">
          © 2025 Rithvik Pallamreddy
        </p>
        <FooterDay />
      </div>
    </footer>
  );
};

export default Footer;
