import { useRouter } from "next/router";
import { useContext } from "react";
import CharContext from "../../context/charactersContext";

const Footer = () => {
  const ctx = useContext(CharContext);
  const router = useRouter();
  const path = router.pathname;
  const footerText = "Data provided by Marvel. © 2021 MARVEL";
  const position =
    path === "/" && !(ctx.characterList.length > 0) ? "fixed bottom-0" : "md:mt-5";
  return (
    <div
      className={`flex p-1 justify-center text-xs text-white bg-[#ac171c] w-full ${position}`}
    >
      <a href="http://marvel.com">{footerText}</a>
    </div>
  );
};

export default Footer;
