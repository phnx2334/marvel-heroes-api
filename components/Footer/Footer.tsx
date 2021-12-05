const Footer = () => {
  const footerText = "Data provided by Marvel. © 2021 MARVEL";
  return (
    <div className="flex absolute bottom-0 justify-center text-xs text-white bg-[#EC1D24] w-full">
      <a href="http://marvel.com">{footerText}</a>
    </div>
  );
};

export default Footer;
