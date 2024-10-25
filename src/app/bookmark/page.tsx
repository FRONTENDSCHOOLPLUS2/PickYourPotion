import { auth } from "@/auth";
import BookmarkList from "./BookmarkList";
export default async function page() {
  const session = await auth();
  const token = session?.accessToken;
  return (
    <div>
      <BookmarkList token={token} />
    </div>
  );
}
