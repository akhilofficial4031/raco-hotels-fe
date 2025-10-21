import { getHotelsForNavigation } from "@/lib/hotels";
import Header from "./Header";

/**
 * Server component wrapper for Header that fetches hotels data
 * This allows us to keep Header as a client component while fetching data on the server
 */
export default async function HeaderWrapper() {
  // Fetch hotels data on the server
  const hotels = await getHotelsForNavigation();

  return <Header hotels={hotels} />;
}
