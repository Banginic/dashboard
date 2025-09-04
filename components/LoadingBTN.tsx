import { LoaderCircle } from "lucide-react";
import React from "react";

function LoadingBTN({ message}: { message: string}) {
  return (
    <div aria-label="Loading spiner" className="flex items-center gap-2">
      <LoaderCircle className="animate-spin" size={18} />
      <span className="animate-pulse">{message}</span>
    </div>
  );
}

export default LoadingBTN;
