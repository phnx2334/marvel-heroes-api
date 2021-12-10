import { useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";

interface ICollapsibleProps {
  label: string;
}

const Collapsible: React.FC<ICollapsibleProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const rotate = isOpen ? "rotate-180" : "rotate-0";

  return (
    <div className="relative mw-[370px] m-0 sm:w-full">
      <div
        className={`flex items-center w-full h-12 pl-5 cursor-pointer ${
          isOpen ? "bg-[#ac171c]" : "bg-gray-700"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className="text-lg font-semibold text-white">{props.label}</h1>

        <ChevronDownIcon
          width="20px"
          className={`absolute text-white transition-transform duration-700  top-3 right-3 ${rotate}`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-700 bg-white w-full`}
        ref={parentRef}
        style={
          isOpen
            ? { height: parentRef.current?.scrollHeight + "px" }
            : { height: "0px" }
        }
      >
        {props.children}
      </div>
    </div>
  );
};

export default Collapsible;
