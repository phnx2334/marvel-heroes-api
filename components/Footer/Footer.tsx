const Footer = () => {
  const footerText = "Data provided by Marvel. © 2021 MARVEL";
  return (
    <div className="flex justify-center text-xs text-white bg-[#EC1D24] fixed bottom-0 w-screen">
      <a href="http://marvel.com">{footerText}</a>
    </div>
  );
};

export default Footer;
