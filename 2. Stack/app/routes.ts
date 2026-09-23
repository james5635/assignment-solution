import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("browser-navigation-history", "routes/browser-navigation-history.tsx"),
  route("nested-modal-stack", "routes/nested-modal-stack.tsx"),
  route("undo-redo-text-editor", "routes/undo-redo-text-editor.tsx"),
] satisfies RouteConfig;
