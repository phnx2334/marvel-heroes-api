import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const path = router.pathname;
  const footerText = "Data provided by Marvel. © 2021 MARVEL";
  return (
    <div
      className={`flex p-1 justify-center text-xs text-white bg-[#ac171c] w-full ${
        path === "/" ? "fixed bottom-0" : ""
      }`}
    >
      <a href="http://marvel.com">{footerText}</a>
    </div>
  );
};

export default Footer;
