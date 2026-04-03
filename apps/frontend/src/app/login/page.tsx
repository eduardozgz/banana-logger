import { routes } from "@bl/common/Routes";

export default function Page() {
  window.location.replace(routes.api.auth.$buildPath({}));
  return null;
}
