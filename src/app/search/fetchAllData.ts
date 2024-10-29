export async function fetchAllData(page = 1, limit = 5) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/products/?page=${page}&limit=${limit}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "client-id": `${CLIENT_ID}`,
    },
  });
  const resJson = await res.json();
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson;
}
