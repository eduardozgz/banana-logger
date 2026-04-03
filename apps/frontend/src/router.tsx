import { BrowserRouter, Route, Routes } from "react-router";

import { routes } from "@bl/common/Routes";

import { Lazy } from "./app/components/Lazy";
import { ProtectedRoute } from "./app/components/ProtectedRoute";
import RootLayout from "./app/layout";
import Home from "./app/page";
import { NavigationBlockerProvider } from "./lib/navigation";

export default function Router() {
  return (
    <BrowserRouter>
      <NavigationBlockerProvider>
        <Routes>
          <Route element={<RootLayout />}>
            {/* Home */}
            <Route index element={<Home />} />

            {/* Auth */}
            <Route
              path={routes.login.$path({ relative: true })}
              element={Lazy(() => import("./app/login/page"))}
            />
            <Route
              path={routes.logout.$path({ relative: true })}
              element={Lazy(() => import("./app/logout/page"))}
            />
            <Route
              path={routes.account.$path({ relative: true })}
              element={
                <ProtectedRoute>
                  {Lazy(() => import("./app/account/page"))}
                </ProtectedRoute>
              }
            />

            {/* Dashboard */}
            <Route
              path={routes.dashboard.$path({ relative: true })}
              element={
                <ProtectedRoute>
                  {Lazy(() => import("./app/dashboard/layout"))}
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={Lazy(() => import("./app/dashboard/page"))}
              />
              <Route
                path={routes.dashboard.$.servers.server.$path({
                  relative: true,
                })}
                element={Lazy(
                  () => import("./app/dashboard/servers/[guildId]/layout"),
                )}
              >
                <Route
                  index
                  element={Lazy(
                    () => import("./app/dashboard/servers/[guildId]/page"),
                  )}
                />
                <Route
                  path={routes.dashboard.$.servers.server.$.settings.$path({
                    relative: true,
                  })}
                  element={Lazy(
                    () =>
                      import(
                        "./app/dashboard/servers/[guildId]/settings/layout"
                      ),
                  )}
                >
                  <Route
                    index
                    element={Lazy(
                      () =>
                        import(
                          "./app/dashboard/servers/[guildId]/settings/page"
                        ),
                    )}
                  />
                </Route>
                <Route
                  path={routes.dashboard.$.servers.server.$.logChannel.$path({
                    relative: true,
                  })}
                  element={Lazy(
                    () =>
                      import(
                        "./app/dashboard/servers/[guildId]/log-channel/page"
                      ),
                  )}
                />
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={Lazy(() => import("./app/not-found"))} />
          </Route>
        </Routes>
      </NavigationBlockerProvider>
    </BrowserRouter>
  );
}
