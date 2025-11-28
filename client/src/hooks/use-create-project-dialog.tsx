import { parseAsBoolean, useQueryState } from "nuqs";

/**
 * Custom React hook to manage the state of the "Create Project" dialog.
 */
const useCreateProjectDialog = () => {
  const [open, setOpen] = useQueryState(
    "new-project",
    parseAsBoolean.withDefault(false)
  );
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return {
    open,
    onOpen,
    onClose,
  };
};

export default useCreateProjectDialog;
