export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Linked List Assignments</h1>
      <ul className="space-y-2">
        <li>
          <a href="browser-history-manager" className="text-blue-600 underline">
            Browser History Manager (Doubly Linked List)
          </a>
        </li>
        <li>
          <a href="infinite-image-carousel" className="text-blue-600 underline">
            Infinite Image Carousel (Circular Linked List)
          </a>
        </li>
        <li>
          <a href="lru-cache" className="text-blue-600 underline">
            LRU Cache for API Responses (LRU + Doubly Linked List + HashMap)
          </a>
        </li>
        <li>
          <a href="social-media-activity-feed" className="text-blue-600 underline">
            Social Media Activity Feed (Doubly Linked List)
          </a>
        </li>
      </ul>
    </main>
  );
}