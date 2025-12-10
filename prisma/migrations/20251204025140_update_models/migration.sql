/*
  Warnings:

  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `name`,
    ADD COLUMN `category` ENUM('fashion', 'electronics', 'book', 'hobby', 'sports', 'beauty', 'lifestyle', 'handmade', 'kids', 'pet', 'food', 'other') NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('SELLING', 'SOLD_OUT') NOT NULL DEFAULT 'SELLING',
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `buyerId` INTEGER NOT NULL,
    `purchasedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
