"use client";

import { useState } from "react";
import Card from "./Card";

export default function VerticalCard() {
  const [isDiscount, setIsDisCount] = useState(true);
  const originalPrice = 32000;
  return (
    <div className="flex flex-row gap-4">
      <Card isDiscount={isDiscount} originalPrice={originalPrice} />
      <Card isDiscount={!isDiscount} originalPrice={originalPrice} />
    </div>
  );
}
