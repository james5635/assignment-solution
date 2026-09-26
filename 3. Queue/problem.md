# 3. Queue

## AI Message Queue Processing

### 📌 Problem Statement

Build a chat system where users send messages and receive AI responses after a delay.

AI responses should be queued and processed one by one in the order they were received.

---

### 🎯 Requirements

1. User messages appear immediately in the chat.
2. AI responses are delayed (3–5 seconds) and processed one at a time (FIFO order).
3. AI responses should be randomly selected from a predefined list.
4. The queue should ensure only one AI response is processed at a time.
5. Implement this in a React functional component.

---

### 🛠 Required Function Signatures

```typescript
function sendMessage(userMessage: string): void;
// - Adds the user's message to the chat and queues an AI response.

function processNextAIResponse(): void;
// - Removes the next AI response from the queue after a delay.

function getRandomAIResponse(): string;
// - Returns a randomly chosen AI response.
```

---

### 📝 Example Flow

```text
User: "Hello!"
User: "How are you?"
User: "Tell me a joke!"

(After delays, one response at a time)

AI: "Hi! How can I help you?"
AI: "I'm doing great! How about you?"
AI: "Why did the chicken cross the road?"
```

---

## Priority-Based Download Manager

### 📌 Problem Statement

Build a download manager where users request file downloads with different priorities and download times.

Files should be processed in priority order (higher first), with a maximum of 3 concurrent downloads.

A queue check runs every 0.1 seconds to start or complete downloads as needed.

---

### 🎯 Requirements

1. Users request downloads with:

   * File name (`string`)
   * Priority (higher = more important)
   * Download time (seconds, simulating file size)
2. At most 3 files can be downloaded at the same time.
3. Every 0.1s, check the queue to start new downloads if slots are available.
4. Each file logs when it starts and when it completes.

---

### 🛠 Required Function Signatures

```typescript
function enqueueDownload(
  fileName: string,
  priority: number,
  downloadTime: number
): void;
// - Adds a file download request to the queue.

function checkQueue(): void;
// - Runs every 0.1s to start or complete downloads.

function getCurrentTime(): number;
// - Returns the current simulated time.
```

---

### 📝 Example Output

```text
[0.0s] Download started: fileB.zip (priority 5)
[0.0s] Download started: fileD.docx (priority 4)
[0.0s] Download started: fileA.mp4 (priority 2)
[5.0s] Download completed: fileA.mp4
[5.0s] Download started: fileC.jpg (priority 2)
[6.0s] Download completed: fileD.docx
[6.0s] Download started: fileE.pdf (priority 1)
[8.0s] Download completed: fileB.zip
[9.0s] Download completed: fileC.jpg
[10.0s] Download completed: fileE.pdf
```
