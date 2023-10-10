import { useState } from "react";
import CopyIcon from "../CopyIcon";
import "./style.css";

export default function CopyPastaBtn({ text }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const copyToClipBoard = () => {
    setTooltipVisible(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => setTooltipVisible(false), 1500);
  };
  return (
    <div className="copyPastaBtn">
      <button
        onClick={copyToClipBoard}
        className="h-8 w-8 rounded border border-gray-400 p-1 text-gray-400 hover:border-black hover:text-black"
      >
        <CopyIcon />
      </button>
      <span className={`tooltip h-8 ${tooltipVisible ? "" : "hidden"}`}>
        Copied!!
      </span>
    </div>
  );
}
