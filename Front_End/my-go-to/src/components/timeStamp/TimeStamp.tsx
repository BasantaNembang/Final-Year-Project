import { formatDistanceToNow } from "date-fns";
import React from "react";

interface timeStampProps {
  time: string;
}

const TimeStamp = ({ time }: timeStampProps) => {

  const timeAGO = formatDistanceToNow(new Date(time), { addSuffix: true });

  return (
    <>
      <div>{timeAGO}</div>
    </>
  );
};

export default TimeStamp;
