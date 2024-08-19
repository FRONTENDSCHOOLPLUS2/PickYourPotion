import Navbar from "@/components/Navbar";
import Kakaomap from "@/components/Kakaomap";
import OrderCard from "../../components/OrderDetail";

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
        </ul>
      </main>
    </div>
  );
}
