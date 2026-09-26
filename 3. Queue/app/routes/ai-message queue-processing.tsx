import { useState, useRef } from 'react';
import { Queue } from '~/queue';

export default function BrowserHistory() {
  const [queue, setQueue] = useState(new Queue<string>());
  const [chat, setChat] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const processing = useRef(false);

  function sendMessage(userMessage: string): void {
    if (!userMessage.trim()) return;

    queue.enqueue(userMessage);

    setChat((p) => [
      ...p,
      { sender: "User", text: userMessage }
    ]);

    setInput("");

    processNextAIResponse();
  }

  function processNextAIResponse(): void {
    if (processing.current) {
      return;
    }

    if (queue.length === 0) {
      return;
    }

    processing.current = true;

    setTimeout(() => {
      setChat((p) => [
        ...p,
        {
          sender: "AI",
          text: getRandomAIResponse()
        }
      ]);

      queue.dequeue();

      processing.current = false;

      processNextAIResponse();
    }, 5000);
  }

  function getRandomAIResponse(): string {
    const AI_RESPONSES = [
      "Hi! How can I help you?",
      "I'm doing great! How about you?",
      "Why did the chicken cross the road?",
      "That's an interesting question!",
      "Sure, I'd be happy to help!",
    ];

    return AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)]
  }

  return (
    <>
      <div className="flex gap-2">
        <input
          className="border"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="bg-green-500 hover:bg-green-700 font-bold text-white rounded py-2 px-4"
          onClick={() => sendMessage(input)}
        >
          send
        </button>
      </div>

      <div>
        {chat.map((v, i) => (
          <div key={i}>
            {v.sender}: {v.text}
          </div>
        ))}
      </div>
    </>
  );
}
