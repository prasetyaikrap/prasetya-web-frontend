import { z } from "zod";

export const articleFormSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1, "Title is required"),
  summary: z
    .string()
    .trim()
    .min(50, "Summary is required")
    .max(300, "Maximum character is 300"),
  slug: z.string().trim().min(1, "Slug is required"),
  categories: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
    })
  ),
  tags: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
    })
  ),
  featuredImage: z.string(),
  content: z.string(),
  visibility: z.object({
    publicity: z.string().trim().min(1, "Publicity is required"),
    status: z.string().trim().min(1, "Status is required"),
  }),
  author: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      avatar: z.string(),
    })
  ),
  metadata: z.record(z.any()).optional(),
  modified_at: z.string(),
  created_at: z.string(),
  created_by: z.string(),
  modified_by: z.string(),

  _selected_author: z
    .object({
      id: z.string(),
      email: z.string(),
      avatar: z.string(),
    })
    .optional(),
});

export const publicityOptions = [
  {
    label: "Public",
    value: "public",
  },
  {
    label: "Subscriber",
    value: "subscriber",
  },
];
