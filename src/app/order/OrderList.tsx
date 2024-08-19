import OrderDetail from "./OrderDetail";

export default function OrderList() {
  return (
    <div>
      <div className="flex justify-between contentMedium mb-4">
        <span>2024.10.28</span>
        <span>&gt;</span>
      </div>
      <div className="border border-lightGray round p-3 flex flex-col gap-7">
        <OrderDetail />
        <OrderDetail />
        <OrderDetail />
      </div>
    </div>
  );
}
