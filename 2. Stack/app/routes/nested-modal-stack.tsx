import { useState } from 'react';
import { Stack } from './stack';

export default function NestedModalStack() {
  const [modalStack, setModalStack] = useState<Stack<string>>(
    new Stack<string>()
  );

  function openModal(modalId: string): void {
    modalStack.push(modalId);
    setModalStack(modalStack.clone());
  }

  function closeModal(): void {
    if (modalStack.length === 0) {
      return;
    }
    modalStack.pop();
    setModalStack(modalStack.clone());
  }

  function getOpenModals(): string[] {
    return [...modalStack.items];
  }

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 font-bold text-white rounded py-2 px-4" onClick={() => openModal('login')}>
          Open Login
        </button>

        <button className="bg-blue-500 hover:bg-blue-700 font-bold text-white rounded py-2 px-4" onClick={() => openModal('settings')}>
          Open Settings
        </button>

        <button className="bg-blue-500 hover:bg-blue-700 font-bold text-white rounded py-2 px-4" onClick={() => openModal('confirm')}>
          Open Profile
        </button>
      </div>

      <button
        className="bg-green-500 hover:bg-green-700 font-bold text-white rounded py-2 px-4"

        onClick={closeModal}
        disabled={modalStack.length === 0}
      >
        Close Top Modal
      </button>

      <div className="mt-4">
        <h2>Open Modals</h2>

        {getOpenModals().map((modalId, index) => (
          <div key={modalId}>
            {index + 1}. {modalId}
          </div>
        ))}
      </div>
    </div>
  );
}