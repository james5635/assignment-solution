import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <a href="browser-navigation-history" className="">browser-navigation-history</a>
      <br />
      <a href="nested-modal-stack" className="">nested-modal-stack</a>
      <br />
      <a href="undo-redo-text-editor" className="">undo-redo-text-editor</a>
      <br />
    </>
  )
}
