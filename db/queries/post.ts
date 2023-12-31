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

export function fetchPostBySearch(term: string): Promise<PostWithListData[]> {
  return db.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
  });
}

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

export function fetchTopPost(): Promise<PostWithListData[]> {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
    ],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
  });
}
