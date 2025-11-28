/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWorkspaceByIdQueryFn } from "@/lib/api";
import { CustomError } from "@/types/custom-error.type";
import { useQuery } from "@tanstack/react-query";

/**
 * Retrieves a single workspace by ID using React Query.
 * Includes retry handling and conditional execution based on workspaceId.
 *
 * @param workspaceId - Unique identifier of the workspace to fetch.
 * @returns React Query result object for the workspace data.
 */
const useGetWorkspaceQuery = (workspaceId: string) => {
  const query = useQuery<any, CustomError>({
    queryKey: ["workspace", workspaceId],
    queryFn: () => getWorkspaceByIdQueryFn(workspaceId),
    staleTime: 0,
    retry: 2,
    enabled: !!workspaceId,
  });

  return query;
};

export default useGetWorkspaceQuery;
