import { useEffect, useState } from "react";

interface ProgressBarProps {
  currentPage: number;
}

export default function ProgressBar({ currentPage }: ProgressBarProps) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(currentPage === 0 ? 50 : 100);
    }, 200);

    return () => clearTimeout(timer);
  }, [currentPage]);

  return (
    <div className="fixed top-14 h-[6px] w-full bg-whiteGray">
      <div
        className={`h-full bg-primary transition-all duration-700 ease-in-out`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
