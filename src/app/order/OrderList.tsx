import Link from "next/link";
import OrderDetail from "../../components/OrderDetail";
import { Order } from "./order";

interface OrderListProps {
  date: string;
  orders: Order[];
}

export default function OrderList({ date, orders }: OrderListProps) {
  return (
    <div>
      <div className="flex justify-between contentMedium mb-4">
        <span>{date}</span>
      </div>
      <div className="border border-lightGray round p-3 flex flex-col gap-7">
        {orders.map((order) =>
          order.products.map((product) => (
            <Link href={`detail/${product._id}`} key={product._id}>
              <OrderDetail
                image={product.image}
                name={product.name}
                brewery={product.extra.brewery}
                price={product.price}
                quantity={product.quantity}
              />
            </Link>
          )),
        )}
      </div>
    </div>
  );
}
