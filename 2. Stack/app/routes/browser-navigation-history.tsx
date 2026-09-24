import { useState } from 'react';
import { Stack } from './stack';

export default function BrowserHistory() {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const [backStack, setBackStack] = useState<Stack<string>>(
    new Stack<string>()
  );

  const [forwardStack, setForwardStack] = useState<Stack<string>>(
    new Stack<string>()
  );

  function visitPage(url: string): void {
    backStack.push(currentPage!);

    setForwardStack(new Stack<string>());

    setCurrentPage(url);
  }

  function goBack(): string | null {
    if (backStack.length === 0) {
      return currentPage;
    }

    const previousPage = backStack.pop();

    forwardStack.push(currentPage!);

    return previousPage;
  }

  function goForward(): string | null {
    if (forwardStack.length === 0) {
      return currentPage;
    }

    const nextPage = forwardStack.pop();
    backStack.push(currentPage!)

    return nextPage
  }

  function getCurrentPage(): string | null {
    return currentPage;
  }

  return (
    <div className="px-10">
      <div className="mb-4">
        <p>Current page:</p>
        <strong>{(() => getCurrentPage())() ?? 'No page'}</strong>
      </div>

      <div className="flex gap-4">
        <button
          className="bg-green-500 hover:bg-green-700 font-bold text-white rounded py-2 px-4"
          onClick={() => { setCurrentPage(goBack()) }}
          disabled={backStack.length === 0}
        >
          Back
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 font-bold text-white rounded py-2 px-4"
          onClick={() => { setCurrentPage(goForward()) }}
          disabled={forwardStack.length === 0}
        >
          Forward
        </button>
      </div>

      <div className="mt-4">
        <button
          className="bg-pink-500 hover:bg-pink-700 font-bold text-white rounded py-2 px-4"
          onClick={() => visitPage(`${Math.random().toString(36).slice(2, -1)}.com`)}>
          Visit Page
        </button>

      </div>
    </div>
  );
}