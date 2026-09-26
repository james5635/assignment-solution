import { useState } from 'react';
import { Stack } from '../stack';

export default function UndoRedoEditor() {
  const [text, setText] = useState('');

  const [undoStack, setUndoStack] = useState<Stack<string>>(new Stack<string>);
  const [redoStack, setRedoStack] = useState<Stack<string>>(new Stack<string>);

  function handleInputChange(newText: string): void {
    undoStack.push(text)

    setRedoStack(new Stack());

    setText(newText);
  }

  function undo(): void {
    if (undoStack.length === 0) {
      return;
    }

    const previousText = undoStack.pop();

    redoStack.push(text);


    setText(previousText);
  }

  function redo(): void {
    if (redoStack.length === 0) {
      return;
    }

    const nextText = redoStack.pop();

    undoStack.push(text)

    setText(nextText);
  }
  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void {
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault();
      undo();
    }

    if (e.ctrlKey && e.key === 'y') {
      e.preventDefault();
      redo();
    }
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type here..."
        rows={10}
        cols={50}
      />

      <div className='flex gap-4'>
        <button className="bg-green-500 hover:bg-green-700 font-bold text-white rounded py-2 px-4" onClick={undo} disabled={undoStack.length === 0}>
          Undo
        </button>

        <button className="bg-blue-500 hover:bg-blue-700 font-bold text-white rounded py-2 px-4" onClick={redo} disabled={redoStack.length === 0}>
          Redo
        </button>
      </div>
    </div>
  );
}