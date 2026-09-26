import { useState, useRef } from 'react';
import { PriorityQueue, Queue } from '~/queue';

interface Download {
  fileName: string;
  priority: number;
  downloadTime: number;
}
export default function DownloadManager() {
  const [queue] = useState(
    new PriorityQueue<Download>((a, b) => b.priority - a.priority)
  )
  const [logs, setLogs] = useState<string[]>([]);
  const activeDownloads = useRef(0);
  const currentTime = useRef(0);

  function enqueueDownload(
    fileName: string,
    priority: number,
    downloadTime: number
  ): void {
    queue.enqueue({
      fileName,
      priority,
      downloadTime,
    });

    checkQueue();
  }

  function checkQueue(): void {
    if (activeDownloads.current >= 3) {
      return;
    }

    if (queue.length === 0) {
      return;
    }

    const download = queue.dequeue();

    activeDownloads.current++;

    setLogs((p) => [
      ...p,
      `[${getCurrentTime().toFixed(1)}s] Download started: ${download.fileName} (priority ${download.priority})`,
    ]);

    setTimeout(() => {
      currentTime.current += download.downloadTime;

      activeDownloads.current--;

      setLogs((p) => [
        ...p,
        `[${getCurrentTime().toFixed(1)}s] Download completed: ${download.fileName}`,
      ]);

      checkQueue();
    }, download.downloadTime * 1000);

    checkQueue();
  }

  function getCurrentTime(): number {
    return currentTime.current;
  }
  function addExampleDownloads(): void {
    enqueueDownload("fileA.mp4", 2, 5);
    enqueueDownload("fileB.zip", 5, 8);
    enqueueDownload("fileC.jpg", 2, 4);
    enqueueDownload("fileD.docx", 4, 6);
    enqueueDownload("fileE.pdf", 1, 4);
    enqueueDownload("fileF.ts", 3, 7);
    enqueueDownload("fileG.java", 3, 10);
    enqueueDownload("fileH.kt", 6, 9);
    enqueueDownload("fileI.css", 4, 9);
    enqueueDownload("fileJ.dart", 5, 8);
  }

  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-700 font-bold text-white rounded py-2 px-4"
        onClick={addExampleDownloads}
      >
        Start Downloads
      </button>

      <div className="mt-4">
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </>
  );
}