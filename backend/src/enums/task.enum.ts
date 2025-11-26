export const TaskStatusEnum = {
  BACKLOG: "BACKLOG",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
} as const;

export const TaskPriorityEnum = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

/**
 * Union type representing valid task status values.
 */
export type TaskStatusEnumType = keyof typeof TaskStatusEnum;
/**
 * Union type representing valid task priority values.
 */
export type TaskPriorityEnumType = keyof typeof TaskPriorityEnum;
