import { Loader2 } from "lucide-react";
import React from "react";

const ButtonLoader = () => {
  return (
    <div className="flex items-center justify-center w-4 h-4 text-white">
      <Loader2 className="animate-spin text-muted-foreground text-white" />

    </div>
  );
};

export default ButtonLoader;
