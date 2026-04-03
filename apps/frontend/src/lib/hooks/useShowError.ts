import { TRPCClientError } from "@trpc/client";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod/v4";

import { KnownErrorsTypeNames } from "@bl/common/KnownError/index";

export default function useShowError() {
  const { t } = useTranslation();

  const showUnknown = (error: unknown): unknown => {
    toast.error(t("common.unknownError"));
    return error;
  };

  return (error: unknown) => {
    if (!(error instanceof TRPCClientError)) throw showUnknown(error);

    const errorMessage = z.enum(KnownErrorsTypeNames).safeParse(error.message);

    if (!errorMessage.success) throw showUnknown(error);

    toast.error(t(`common.knownError`), {
      description: t(`common.knownErrors.${errorMessage.data}`),
    });
  };
}
