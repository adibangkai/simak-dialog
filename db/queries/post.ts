import { db } from "@/db";
import type { Post } from "@prisma/client";

export type PostWithListData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

//alternate way to make type

export type AlternatePostWithListData = Awaited<
  ReturnType<typeof fetchPostByTopicSlug>
>[number];

export function fetchPostByTopicSlug(
  slug: string
): Promise<PostWithListData[]> {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}
