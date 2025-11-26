import { v4 as uuidv4 } from "uuid";

/**
 * Generates a random 8-character invite code using UUID.
 * @returns {string} A unique 8-character invite code
 */
export function generateInviteCode(): string {
  return uuidv4().replace(/-/g, "").substring(0, 8);
}

/**
 * Generates a random task code prefixed with "task-".
 * Uses the first 3 characters of a UUID (without dashes).
 * 
 * @returns {string} A unique task code like "task-abc"
 */
export function generateTaskCode(): string {
  return `task-${uuidv4().replace(/-/g, "").substring(0, 3)}`;
}
