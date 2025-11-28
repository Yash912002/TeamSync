import { parseAsBoolean, useQueryState } from "nuqs";

/**
 * Custom React hook to manage the state of the "Create Workspace" dialog.
 *
 * @returns {object} An object containing:
 * - `open` {boolean} - whether the dialog is open.
 * - `onOpen` {function} - function to open the dialog.
 * - `onClose` {function} - function to close the dialog.
 *
 * @example
 * const { open, onOpen, onClose } = useCreateWorkspaceDialog();
 * return (
 *   <Dialog open={open} onOpenChange={onClose}>
 *     <DialogTrigger onClick={onOpen}>
 *        Create Workspace
 *     </DialogTrigger>
 *   </Dialog>
 * );
 */
const useCreateWorkspaceDialog = () => {
  const [open, setOpen] = useQueryState(
    "new-workspace",
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

export default useCreateWorkspaceDialog;
