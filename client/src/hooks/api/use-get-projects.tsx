import { getProjectsInWorkspaceQueryFn } from "@/lib/api";
import { AllProjectPayloadType } from "@/types/api.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

/**
 * Fetches paginated projects for a workspace.
 *
 * @param params - Workspace ID, pagination details, and skip flag.
 * @returns React Query result for workspace projects.
 */
const useGetProjectsInWorkspaceQuery = ({
  workspaceId,
  pageSize,
  pageNumber,
  skip = false,
}: AllProjectPayloadType) => {
  const query = useQuery({
    queryKey: ["allprojects", workspaceId, pageNumber, pageSize],
    queryFn: () =>
      getProjectsInWorkspaceQueryFn({
        workspaceId,
        pageSize,
        pageNumber,
      }),
    staleTime: Infinity,
    placeholderData: skip ? undefined : keepPreviousData,
    enabled: !skip,
  });
  return query;
};

export default useGetProjectsInWorkspaceQuery;
