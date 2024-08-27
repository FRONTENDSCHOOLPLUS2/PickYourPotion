"use client";

import ChannelService from "@/third-party/channelTalk";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Order } from "./order/order";

function ChannelTalkManager({ order }: { order: Order | null }) {
  const session = useSession();

  // 최근 주문 상품 배열인데 profile값에 array를 넣을 수 없어 주석처리
  // const orderProducts = order.products.map((product) => {
  //   const { _id, quantity, name, price } = product;
  //   return { _id, name, quantity, price };
  // });

  useEffect(() => {
    const channelTalk = new ChannelService();
    if (!window.ChannelIO) {
      channelTalk.loadScript();
    }

    if (session.status === "authenticated") {
      channelTalk.boot({
        pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY,
        memberId: session.data?.user?.id,
        profile: {
          name: session.data?.user?.name,
          email: session.data?.user?.email,
          lastCheckoutCompletedAt: order?.updatedAt,
          recentOrderNum: order?._id,
        },
      });
    } else {
      channelTalk.boot({
        pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY,
      });
    }
    return () => {
      window.ChannelIO?.("shutdown");
    };
  }, [session.status]);
  return <></>;
}

export default ChannelTalkManager;
