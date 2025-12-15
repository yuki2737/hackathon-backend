-- AlterTable
ALTER TABLE `Product` ADD COLUMN `beautySubCategory` ENUM('skincare', 'makeup', 'fragrance', 'beauty_other') NULL,
    ADD COLUMN `bookSubCategory` ENUM('novel', 'comic', 'magazine', 'book_other') NULL,
    ADD COLUMN `electronicsSubCategory` ENUM('smartphone', 'computer', 'audio', 'electronics_other') NULL,
    ADD COLUMN `fashionSubCategory` ENUM('tops', 'bottoms', 'shoes', 'fashion_other') NULL,
    ADD COLUMN `foodSubCategory` ENUM('snack', 'beverage', 'ingredient', 'food_other') NULL,
    ADD COLUMN `handmadeSubCategory` ENUM('jewelry', 'clothing', 'craft', 'handmade_other') NULL,
    ADD COLUMN `hobbySubCategory` ENUM('toy', 'model', 'collectible', 'hobby_other') NULL,
    ADD COLUMN `kidsSubCategory` ENUM('clothing', 'toy', 'baby_goods', 'kids_other') NULL,
    ADD COLUMN `lifestyleSubCategory` ENUM('kitchen', 'furniture', 'decor', 'lifestyle_other') NULL,
    ADD COLUMN `otherSubCategory` ENUM('misc') NULL,
    ADD COLUMN `petSubCategory` ENUM('food', 'accessory', 'toys', 'pet_other') NULL,
    ADD COLUMN `sportsSubCategory` ENUM('equipment', 'clothing', 'accessory', 'sports_other') NULL;
