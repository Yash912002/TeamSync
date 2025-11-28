/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseAsBoolean, useQueryState } from "nuqs";
import { useState } from "react";


/**
 * Custom React hook to manage the state and context of a confirmation dialog.
 *
 * The dialog's open/close state is synchronized with the URL query parameter `confirm-dialog`.
 * This hook also allows passing optional context data to the dialog.
 */
const useConfirmDialog = () => {
  const [open, setOpen] = useQueryState(
    "confirm-dialog",
    parseAsBoolean.withDefault(false)
  );
  const [context, setContext] = useState<any>(null);

  const onOpenDialog = (data?: any) => {
    setContext(data || null);
    setOpen(true);
  };

  const onCloseDialog = () => {
    setContext(null);
    setOpen(false);
  };

  return {
    open,
    context,
    onOpenDialog,
    onCloseDialog,
  };
};

export default useConfirmDialog;
