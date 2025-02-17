/*
  Warnings:

  - Added the required column `title` to the `chatHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chatHistory" ADD COLUMN     "title" TEXT NOT NULL;
