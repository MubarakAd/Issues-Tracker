/*
  Warnings:

  - Added the required column `updatedAt` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Issue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "issue" TEXT NOT NULL DEFAULT 'OPEN'
);
INSERT INTO "new_Issue" ("description", "id", "issue", "title") SELECT "description", "id", "issue", "title" FROM "Issue";
DROP TABLE "Issue";
ALTER TABLE "new_Issue" RENAME TO "Issue";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
