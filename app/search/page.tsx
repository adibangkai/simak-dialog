import { redirect } from "next/navigation";
import PostList from "@/components/post/PostList";
import { fetchPostBySearch } from "@/db/queries/post";

interface SearchProps {
  searchParams: {
    term: string;
  };
}

export default async function SearchPage({ searchParams }: SearchProps) {
  const { term } = searchParams;
  if (!term) {
    redirect("/");
  }

  return (
    <div>
      <PostList fetchData={() => fetchPostBySearch(term)} />
    </div>
  );
}
