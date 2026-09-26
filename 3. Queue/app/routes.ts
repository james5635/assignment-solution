import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
route("ai-message-queue-processing", "routes/ai-message queue-processing.tsx"),
route("priority-based-download-manager", "routes/priority-based-download-manager.tsx")

] satisfies RouteConfig;
