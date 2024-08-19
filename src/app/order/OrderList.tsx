import OrderDetail from "../../components/OrderDetail";
import { Order, Product } from "./order";

interface OrderListProps {
  date: string;
  orders: Order[];
}

export default function OrderList({ date, orders }: OrderListProps) {
  return (
    <div>
      <div className="flex justify-between contentMedium mb-4">
        <span>{date}</span>
        <span>&gt;</span>
      </div>
      <div className="border border-lightGray round p-3 flex flex-col gap-7">
        {orders.map((order) =>
          order.products.map((product) => (
            <OrderDetail
              key={product._id}
              image={product.image}
              name={product.name}
              brewery={product.extra.brewery}
              price={product.price}
              quantity={product.quantity}
            />
          )),
        )}
      </div>
    </div>
  );
}
