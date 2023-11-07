import { z } from "zod";

export const todoListValidationSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
});

export type TodoListValidationSchema = z.infer<typeof todoListValidationSchema>

export const todoItemValidationSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string(),
  deadLine: z.preprocess((val) => {
    if (!val || typeof val !== "string") return undefined;
    return new Date(val);
  }, z.date().optional()),
});

export type TodoItemValidationSchema = z.infer<typeof todoItemValidationSchema>;
