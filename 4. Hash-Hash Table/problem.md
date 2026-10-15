# 4. Hash / Hash Table

## **URL Shortener**

### **📌 Problem Statement**

Build a **URL shortener** that converts long URLs into short, unique identifiers.

Users should be able to **generate a short URL**, store it, and later **retrieve the original URL** when needed.

---

### **🎯 Requirements**

1. Users can **input a long URL** and receive a **shortened version**.
2. When a short URL is entered, it should **return the original long URL**.
3. The same long URL should always generate **the same short URL**.
4. The system should efficiently **store and retrieve URL mappings using a hash table**.
5. If a hash collision occurs, it should be **handled appropriately**.

---

### **🛠 Required Function Signatures**

```javascript
function generateShortURL(longURL: string): string;
// - Creates a unique short URL from a long URL.
// - Stores the mapping in a hash table.

function getOriginalURL(shortURL: string): string | null;
// - Retrieves the original URL from a short URL.

```

---

### **🛠 Hash Function (For Short URL Generation)**

To help you get started, here is a basic **hash function** to convert a URL into a short string:

```javascript
function hashURL(longURL: string): string {
  let hash = 0;
  for (let i = 0; i < longURL.length; i++) {
    hash = (hash * 31 + longURL.charCodeAt(i)) % 1000000007;
  }
  return hash.toString(36); // Convert to base-36 (alphanumeric)
}

```

This function:

* **Converts the URL into a numerical hash**
* **Reduces it to a short alphanumeric string**
* **Ensures a deterministic output** for the same URL

---

### **📝 Example Usage**

```javascript
generateShortURL("https://www.example.com/long-url-with-query-params");
// Possible short URL: "abc123"

getOriginalURL("abc123");
// Returns: "https://www.example.com/long-url-with-query-params"

```

---

## **Hash-Based File Integrity Check**

### **📌 Problem Statement**

You need to implement a **file integrity verification system**.

When a file is uploaded, a **hash value** should be generated and stored.

Later, the system should be able to **verify whether the file has been modified** by comparing its hash value with the previously stored one.

In real-world applications, **SHA-256 is commonly used for file integrity checks**,

but for this assignment, **you must implement your own custom hash function** instead of using built-in cryptographic hash functions.

---

### **🎯 Requirements**

1. Implement a **custom hash function** to generate a hash for a given file's contents.
2. Store the generated hash value when a file is first uploaded.
3. When verifying a file, **compare its current hash with the stored hash** to check for modifications.
4. If the hashes match, return `"File is intact"`, otherwise return `"File has been modified"`.
5. The hash function should be **efficient** and should try to avoid collisions as much as possible.

---

### **🛠 Required Function Signatures**

```javascript
function generateFileHash(fileContent: string): string;
// - Implements a custom hash function to generate a hash for file content.

function storeFileHash(fileName: string, fileContent: string): void;
// - Stores the file’s initial hash value.

function verifyFileIntegrity(fileName: string, fileContent: string): string;
// - Checks if the current file hash matches the stored hash.

```

---

### **🛠 Example Usage**

```javascript
storeFileHash("report.txt", "Hello, this is my report.");

verifyFileIntegrity("report.txt", "Hello, this is my report.");
// Output: "File is intact"

verifyFileIntegrity("report.txt", "Hello, this is my modified report.");
// Output: "File has been modified"

```