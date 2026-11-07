import { HashTable } from '@/hash-table';

export class FileIntegrityChecker {
  private readonly fileTable = new HashTable<string, string>();

  public generateFileHash(fileContent: string): string {
    let hash = 5381;
    for (let i = 0; i < fileContent.length; i++) {
      hash = (hash * 33 + fileContent.charCodeAt(i)) % 1000000007;
    }
    return hash.toString(36) + fileContent.length.toString(36);
  }

  public storeFileHash(fileName: string, fileContent: string): string {
    const hash = this.generateFileHash(fileContent);
    this.fileTable.set(fileName, hash);
    return hash;
  }

  public verifyFileIntegrity(fileName: string, fileContent: string): string {
    const stored = this.fileTable.get(fileName);
    if (stored === undefined) {
      return 'No stored hash for this file';
    }
    return stored === this.generateFileHash(fileContent)
      ? 'File is intact'
      : 'File has been modified';
  }

  public getStoredHash(fileName: string): string | undefined {
    return this.fileTable.get(fileName);
  }
}
