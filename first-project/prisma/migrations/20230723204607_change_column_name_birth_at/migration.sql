/*
  Warnings:

  - You are about to drop the column `birthAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `birthAt`,
    ADD COLUMN `birth_at` DATE NULL;
