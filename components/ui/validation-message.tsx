import { FC } from "react";

interface ValidationMessageProps {
  message: string;
}

const ValidationMessage: FC<ValidationMessageProps> = ({ message }) => {
  return <p className="text-red-500 text-xs mt-1">{message}</p>;
};

export default ValidationMessage;