/*
  Warnings:

  - You are about to alter the column `status` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `status` ENUM('selling', 'sold_out') NOT NULL DEFAULT 'selling';
