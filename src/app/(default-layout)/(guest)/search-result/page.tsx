import dynamic from "next/dynamic";

// Render component client-side only
const SearchResultClient = dynamic(() => import("./SearchResultClient"), {
  ssr: false,
});

export default function SearchResultPage() {
  return <SearchResultClient />;
}
