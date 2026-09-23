import type { Route } from "./+types/nested-modal-stack";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Page A" }];
}

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Page A</h1>
    </div>
  );
}
