import CartCard from "@/components/CartCard";
import Navbar from "@/components/Navbar";
import Kakaomap from "@/components/Kakaomap";
import OrderCard from "../order/OrderCard";

export default function Page() {
  return (
    <div>
      <Navbar />
      <Kakaomap />
      <main>
        <ul>
          <li>
            <OrderCard />
          </li>
          <li>
            <OrderCard />
          </li>
          <li>
            <OrderCard />
          </li>
          <li>
            <OrderCard />
          </li>
        </ul>
      </main>
    </div>
  );
}
