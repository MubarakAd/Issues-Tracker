-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "gender" TEXT,
    "age" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "issue" TEXT NOT NULL DEFAULT 'OPEN'
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
