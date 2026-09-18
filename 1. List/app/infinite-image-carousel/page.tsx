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

    </div>
  );
};

export default InfiniteImageCarousel;