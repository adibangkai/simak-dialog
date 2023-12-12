"use server";
import { Post } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/utils/auth";
import { db } from "@/db";
import paths from "@/utils/path";
import { revalidatePath } from "next/cache";

const createPostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be sign in to do this!"],
      },
    };
  }
  const topic = await db.topic.findFirst({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["cannot find topic"],
      },
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title, // result come from zod validation
        content: result.data.content, // result come from zod validation
        userId: session.user.id, // come frome session
        topicId: topic.id, //from topic slug
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["something wrong"],
        },
      };
    }
  }

  // revalidatePath("/");
  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}
