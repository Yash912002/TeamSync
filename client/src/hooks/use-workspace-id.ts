import { useParams } from "react-router-dom";

/**
 * Returns the current workspaceId from route params.
 */
const useWorkspaceId = () => {
  const params = useParams();
  return params.workspaceId as string;
};

export default useWorkspaceId;
