'use client'
import { useState } from "react";

/**
 * Represents a node in the doubly linked activity feed.
 */
class FeedNode {
  activity: string;
  prev: FeedNode | null = null;
  next: FeedNode | null = null;

  constructor(activity: string) {
    this.activity = activity;
  }
}

/**
 * Social media activity feed backed by a doubly linked list.
 * The head of the list is the most recent activity.
 */
class ActivityFeed {
  private head: FeedNode | null = null;
  private tail: FeedNode | null = null;
  private count = 0;

  /**
   * Adds a new activity to the front of the feed (most recent first).
   */
  addActivity(activity: string): void {
    const node = new FeedNode(activity);
    node.next = this.head;

    if (this.head) {
      this.head.prev = node;
    } else {
      this.tail = node;
    }

    this.head = node;
    this.count++;
  }

  /**
   * Removes the activity at the given index (0 = most recent).
   */
  deleteActivity(index: number): void {
    if (index < 0 || index >= this.count) return;

    let node = this.head;
    for (let i = 0; i < index && node; i++) {
      node = node.next;
    }

    if (!node) return;

    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;

    this.count--;
  }

  /**
   * Returns all activities in order (most recent first).
   */
  showActivities(): string[] {
    const activities: string[] = [];
    let node = this.head;
    while (node) {
      activities.push(node.activity);
      node = node.next;
    }
    return activities;
  }
}

const DEMO_ACTIVITIES = [
  "Alice liked your post",
  "Bob commented: \"Nice work!\"",
  "Carol started following you",
  "Dave shared your article",
];

/**
 * React component for the social media activity feed.
 */
const ActivityFeedComponent = () => {
  const [feed] = useState(() => {
    const f = new ActivityFeed();
    DEMO_ACTIVITIES.forEach((activity) => f.addActivity(activity));
    return f;
  });
  const [activities, setActivities] = useState<string[]>(DEMO_ACTIVITIES);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const refresh = () => {
    setActivities(feed.showActivities());
  };

  const addActivity = () => {
    const activity = input.trim();
    if (!activity) {
      setMessage("Please type an activity.");
      return;
    }
    feed.addActivity(activity);
    setMessage("Activity added.");
    setInput("");
    refresh();
  };

  const deleteActivity = (index: number) => {
    feed.deleteActivity(index);
    setMessage(`Deleted activity at index ${index}.`);
    refresh();
  };

  return (
    <div className="p-4 border rounded shadow-lg w-[520px]">
      <h2 className="text-xl font-bold">📣 Social Media Activity Feed</h2>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addActivity();
          }}
          placeholder="e.g. Emma reacted to your story"
          className="flex-1 px-3 py-1 border rounded"
        />
        <button
          onClick={addActivity}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>

      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}

      <div className="mt-4">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-400">No activities yet.</p>
        ) : (
          <ul className="border rounded divide-y">
            {activities.map((activity, index) => (
              <li
                key={`${activity}-${index}`}
                className="px-3 py-2 flex items-center justify-between gap-2"
              >
                <span className="text-sm">
                  <span className="text-gray-400 mr-2 font-mono">#{index}</span>
                  {activity}
                </span>
                <button
                  onClick={() => deleteActivity(index)}
                  className="px-2 py-0.5 text-xs bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ActivityFeedComponent;