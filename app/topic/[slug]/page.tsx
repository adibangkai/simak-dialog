import PostCreateForm from "@/components/post/PostCreateForm";
import PostList from "@/components/post/PostList";
import { fetchPostByTopicSlug } from "@/db/queries/post";
interface TopicShowPageProps {
  params: {
    slug: string;
  };
}
export default function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
