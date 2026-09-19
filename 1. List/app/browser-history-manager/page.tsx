'use client'
import { useState } from "react";
import { DoublyLinkedList } from "../list";

interface BrowserHistory {
  visitPage(url: string): void
  goBack(): string | null
  goForward(): string | null
  getCurrentPage(): string | null
}
class LinkedListBrowserHistory implements BrowserHistory {
  private list = new DoublyLinkedList<string>();

  visitPage(url: string): void {
    this.list.clearForward();
    this.list.insertBack(url);
    this.list.forward()
  }

  goBack(): string | null {
    this.list.back();
    return this.list.current();
  }

  goForward(): string | null {
    this.list.forward();
    return this.list.current();
  }

  getCurrentPage(): string | null {
    return this.list.current();
  }
}

/**
 * React component for managing browser history.
 */
const BrowserHistoryComponent = () => {
  const [history] = useState(() => new LinkedListBrowserHistory());
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const visitPage = () => {
    const newPage = `Page ${Math.floor(Math.random() * 100)}`;
    history.visitPage(newPage);
    setCurrentPage(history.getCurrentPage());
  };

  const goBack = () => {
    setCurrentPage(history.goBack());
  };

  const goForward = () => {
    setCurrentPage(history.goForward());
  };

  return (
    <div className="p-4 border rounded shadow-lg w-96">
      <h2 className="text-xl font-bold">🔙 Custom Browser History</h2>
      <div className="mt-2">
        <p className="text-sm text-gray-500">Current Page:</p>
        <p className="text-lg font-semibold">{currentPage || "No Page Yet"}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={visitPage}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Visit New Page
        </button>
        <button
          onClick={goBack}
          className="px-3 py-1 bg-gray-400 text-white rounded"
        >
          🔙 Back
        </button>
        <button
          onClick={goForward}
          className="px-3 py-1 bg-gray-400 text-white rounded"
        >
          🔜 Forward
        </button>
      </div>
    </div>
  );
};

export default BrowserHistoryComponent;