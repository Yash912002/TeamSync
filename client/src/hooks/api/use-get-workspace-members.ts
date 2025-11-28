import { getMembersInWorkspaceQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetches all members of a given workspace.
 * Wraps the request in a React Query hook and caches results indefinitely.
 *
 * @param workspaceId - Unique identifier of the workspace whose members are being retrieved.
 * @returns React Query result object containing workspace members and metadata.
 */
const useGetWorkspaceMembers = (workspaceId: string) => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: () => getMembersInWorkspaceQueryFn(workspaceId),
    staleTime: Infinity,
  });
  return query;
};

export default useGetWorkspaceMembers;
