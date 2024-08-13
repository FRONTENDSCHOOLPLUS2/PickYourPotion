export default function ReplyForm() {
    const API_SERVER = process.env.PICK_YOUR_POTION_API_SERVER;
  const CLIENT_ID = process.env.PICK_YOUR_POTION_CLIENT_ID;
  const url = `${API_SERVER}/replies`
  const res = await fetch(url, {
    headers: {
      "client-id": `${CLIENT_ID}`,
    },
  });
  const resJson = await res.json();
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}
  return (
    <form className="border-[0.5px] border-gray">
      <input className="" placeholder="이번 술은 어떠셨나요?" />
      <button type="submit">전송</button>
    </form>
  );
}
