import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useBlockerId, useNavigationBlocker } from "~/lib/navigation";

function useConfirmOnLeave(shouldConfirm: boolean, onBlocked?: () => void) {
  const effectiveShouldConfirm = import.meta.env.DEV ? false : shouldConfirm;
  const [t] = useTranslation();
  const { register, unregister } = useNavigationBlocker();
  const id = useBlockerId();

  const warningText = t("hooks.useConfirmOnLeave");

  useEffect(() => {
    if (effectiveShouldConfirm) {
      register(id, warningText, onBlocked);
    } else {
      unregister(id);
    }
    return () => {
      unregister(id);
    };
  }, [
    effectiveShouldConfirm,
    warningText,
    onBlocked,
    register,
    unregister,
    id,
  ]);
}

export default useConfirmOnLeave;
