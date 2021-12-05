import { ComicSeries } from "../../types/character";
import Collapsible from "../Layout/Collapsible";
import Image from "next/image";
import Link from "next/link";

interface ICharDetailsProps {
  items: ComicSeries[];
  type: "Comics" | "Series";
}

const CharDetails: React.FC<ICharDetailsProps> = ({ items, type }) => {
  return (
    <Collapsible label={type}>
      <div className="grid grid-cols-3 m-1 overflow-x-auto sm:flex flex-row w-full">
        {items.map((item) => {
          const url = item.urls.filter((url) => url.type === "detail")[0].url;
          return (
            <Link key={item.title} href={url} passHref>
              <div className="flex flex-col items-center m-2 cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fixed"
                  height={60}
                  width={60}
                />
                <p className="max-w-sm mt-1 text-xs text-center text-gray-800 whitespace-pre-wrap">
                  {item.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </Collapsible>
  );
};

export default CharDetails;
