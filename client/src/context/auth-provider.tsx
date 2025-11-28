/* eslint-disable @typescript-eslint/no-explicit-any */
import { PermissionType } from "@/constant";
import useAuth from "@/hooks/api/use-auth";
import useGetWorkspaceQuery from "@/hooks/api/use-get-workspace";
import usePermissions from "@/hooks/use-permissions";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { UserType, WorkspaceType } from "@/types/api.type";
import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define the context shape
type AuthContextType = {
  user?: UserType;
  workspace?: WorkspaceType;
  hasPermission: (permission: PermissionType) => boolean;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  workspaceLoading: boolean;
  refetchAuth: () => void;
  refetchWorkspace: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provides authenticated user, workspace data, permissions,
 * and related loading/error states to the application.
 *
 * Redirects to home when the user lacks access to the workspace.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const workspaceId = useWorkspaceId();

  const {
    data: authData,
    error: authError,
    isLoading,
    isFetching,
    refetch: refetchAuth,
  } = useAuth();
  const user = authData?.user;

  const {
    data: workspaceData,
    isLoading: workspaceLoading,
    error: workspaceError,
    refetch: refetchWorkspace,
  } = useGetWorkspaceQuery(workspaceId);

  const workspace = workspaceData?.workspace;

  useEffect(() => {
    if (workspaceError) {
      if (workspaceError?.errorCode === "ACCESS_UNAUTHORIZED") {
        navigate("/"); // Redirect if the user is not a member of the workspace
      }
    }
  }, [navigate, workspaceError]);

  const permissions = usePermissions(user, workspace);

  /**
  * Checks whether the authenticated user has the specified permission
  * within the current workspace context.
  */
  const hasPermission = (permission: PermissionType): boolean => {
    return permissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        workspace,
        hasPermission,
        error: authError || workspaceError,
        isLoading,
        isFetching,
        workspaceLoading,
        refetchAuth,
        refetchWorkspace,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook for accessing the AuthContext.
 * Throws if used outside an AuthProvider.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }
  return context;
};
