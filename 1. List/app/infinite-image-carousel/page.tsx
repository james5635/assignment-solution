'use client'
import { useState } from "react";

const DEMO_IMAGES = [
  "https://picsum.photos/seed/1/640/400",
  "https://picsum.photos/seed/2/640/400",
  "https://picsum.photos/seed/3/640/400",
  "https://picsum.photos/seed/4/640/400",
];

/**
 * Represents a node in the circular doubly linked list.
 * A new node points to itself on both sides, keeping the circle
 * valid even when it is the only node in the list.
 */
class ListNode {
  url: string;
  prev: ListNode;
  next: ListNode;

  constructor(url: string) {
    this.url = url;
    this.prev = this;
    this.next = this;
  }
}

/**
 * Manages the carousel images using a circular linked list.
 */
class ImageCarousel {
  private current: ListNode | null = null;

  /**
   * Adds a new image. The last image's next pointer wraps around to the
   * first image, so navigation never hits a dead end.
   */
  addImage(url: string): void {
    const node = new ListNode(url);

    if (!this.current) {
      this.current = node;
      return;
    }

    node.next = this.current;
    node.prev = this.current.prev;
    this.current.prev.next = node;
    this.current.prev = node;
  }

  /**
   * Moves to the next image, looping back to the first one at the end.
   */
  nextImage(): string {
    if (!this.current) return "";
    this.current = this.current.next;
    return this.current.url;
  }

  /**
   * Moves to the previous image, looping back to the last one at the start.
   */
  prevImage(): string {
    if (!this.current) return "";
    this.current = this.current.prev;
    return this.current.url;
  }

  /**
   * Returns the current image URL.
   */
  getCurrentImage(): string | null {
    return this.current ? this.current.url : null;
  }

  /**
   * Jumps directly to the first node matching the given URL, keeping the
   * data structure in sync when a thumbnail is selected.
   */
  jumpTo(url: string): void {
    if (!this.current) return;

    let node: ListNode = this.current;
    do {
      if (node.url === url) {
        this.current = node;
        return;
      }
      node = node.next;
    } while (node !== this.current);
  }

  /**
   * Traverses the circle once and returns every URL (for rendering only;
   * the list itself is not backed by an array).
   */
  getImages(): string[] {
    if (!this.current) return [];

    const images: string[] = [];
    let node: ListNode = this.current;
    do {
      images.push(node.url);
      node = node.next;
    } while (node !== this.current);

    return images;
  }
}

/**
 * React component for the infinite image carousel.
 */
const InfiniteImageCarousel = () => {
  const [carousel] = useState(() => {
    const c = new ImageCarousel();
    DEMO_IMAGES.forEach((url) => c.addImage(url));
    return c;
  });
  const [currentImage, setCurrentImage] = useState<string | null>(
    DEMO_IMAGES[0] ?? null
  );
  const [images, setImages] = useState<string[]>(DEMO_IMAGES);
  const [urlInput, setUrlInput] = useState("");

  const addImage = () => {
    const url = urlInput.trim() || DEMO_IMAGES[Math.floor(Math.random() * DEMO_IMAGES.length)];
    carousel.addImage(url);
    setCurrentImage(carousel.getCurrentImage());
    setImages(carousel.getImages());
    setUrlInput("");
  };

  const nextImage = () => {
    setCurrentImage(carousel.nextImage());
  };

  const prevImage = () => {
    setCurrentImage(carousel.prevImage());
  };

  return (
    <div className="p-4 border rounded shadow-lg w-[640px]">
      <h2 className="text-xl font-bold">🎠 Infinite Image Carousel</h2>

      <div className="mt-4 bg-gray-800 rounded overflow-hidden">
        {currentImage ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImage}
              alt="Carousel slide"
              className="w-full h-[400px] object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/60 text-white rounded-full"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/60 text-white rounded-full"
            >
              ›
            </button>
          </div>
        ) : (
          <div className="h-[400px] flex items-center justify-center text-gray-400">
            No images yet — add one below.
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Paste an image URL…"
          className="flex-1 px-3 py-1 border rounded"
        />
        <button
          onClick={addImage}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add Image
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={prevImage}
          className="px-3 py-1 bg-gray-400 text-white rounded"
        >
          ‹ Prev
        </button>
        <button
          onClick={nextImage}
          className="px-3 py-1 bg-gray-400 text-white rounded"
        >
          Next ›
        </button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto">
        {images.map((url, index) => (
          <button
            key={url}
            onClick={() => {
              carousel.jumpTo(url);
              setCurrentImage(carousel.getCurrentImage());
            }}
            className={`shrink-0 rounded border-2 ${
              url === currentImage
                ? "border-blue-500"
                : "border-transparent"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={`Thumbnail ${index + 1}`}
              className="w-16 h-16 object-cover rounded"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default InfiniteImageCarousel;