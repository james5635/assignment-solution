import type { Route } from "./+types/browser-navigation-history";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Page B" }];
}

export default function PageB() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Page B</h1>
    </div>
  );
}
