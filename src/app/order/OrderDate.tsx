interface OrderDateProps {
  date: string;
}

export default function OrderDate({ date }: OrderDateProps) {
  return (
    <div className="flex justify-between mt-8 mb-2 text-xs text-gray">
      <span>{date} 주문내역</span>
      <span>자세히보기 &gt;&gt;</span>
    </div>
  );
}
