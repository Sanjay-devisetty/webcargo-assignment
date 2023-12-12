import React from "react";
import { Card } from "antd";

const Character = React.memo(({ name, image, status }) => {
  let textColorClass = "text-yellow-500";

  if (status === "Alive") {
    textColorClass = "text-green-700";
  } else if (status === "Dead") {
    textColorClass = "text-red-700";
  }

  return (
    <Card
      title={name}
      extra={<span className={textColorClass}>{status}</span>}
      className="max-w-sm mx-2 my-4"
    >
      <img alt={name} src={image} className="w-full h-auto" />
    </Card>
  );
});

export default Character;
