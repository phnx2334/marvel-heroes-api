import { useState, useRef, MutableRefObject } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";

interface ICollapsibleProps {
  label: string;
}

const Collapsible: React.FC<ICollapsibleProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<any>();
  const scrollHeight = containerRef.current
    ? containerRef.current.scrollHeight
    : 0;

  const maxH = isOpen ? `max-h-[${scrollHeight}px]` : `max-h-0`;
  const rotate = isOpen ? "rotate-180" : "";

  console.log("scroll height", scrollHeight);
  console.log("maxH", maxH);
  console.log("rotate", rotate);

  return (
    <div className="relative w-[370px] overflow-hidden m-20">
      <div
        className="flex items-center w-full h-12 pl-5 bg-blue-500 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className="text-lg font-semibold text-white">{props.label}</h1>
        <ChevronDownIcon
          width="20px"
          className={`absolute text-white transition-transform duration-500 rotate-0 top-3 right-3 ${rotate}`}
        />
      </div>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-500 bg-white ${maxH}`}
        ref={containerRef}
      >
        <div className="p-4">{props.children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
