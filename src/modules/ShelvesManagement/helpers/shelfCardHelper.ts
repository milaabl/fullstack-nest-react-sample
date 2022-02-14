export function checkIfOwnerOfShelf(ownerId: string, userId: string | undefined | null): boolean {
  return ownerId === userId;
}
