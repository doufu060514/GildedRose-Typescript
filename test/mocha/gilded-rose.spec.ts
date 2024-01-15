import { expect } from "chai";
import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  describe("Basic rules", () => {
    it("should each item have a sellIn property", () => {
      const testItem = new Item("Product", 10, 10);
      const properties = Object.keys(testItem);
      expect(properties.some((property) => property === "sellIn")).to.be.true;
    });

    it("should each item have a quality property", () => {
      const testItem = new Item("Product", 10, 10);
      const properties = Object.keys(testItem);
      expect(properties.some((property) => property === "quality")).to.be.true;
    });

    it("should return same length of items back", () => {
      const testData = [
        new Item("Product A", 10, 10),
        new Item("Product B", 10, 10),
      ];

      const gildedRose = new GildedRose(testData);
      const results = gildedRose.updateQuality();
      expect(results.length).to.equal(testData.length);
    });

    it("should decrease sellIn by 1 for items", () => {
      const testData = [
        new Item("Product A", 10, 10),
        new Item("Product B", 20, 20),
      ];

      const gildedRose = new GildedRose(testData);
      const results = gildedRose.updateQuality();
      expect(results[0].sellIn).to.equal(9);
      expect(results[1].sellIn).to.equal(19);
    });

    it("should decrease quality by 1 for normal items", () => {
      const gildedRose = new GildedRose([new Item("Product A", 10, 10)]);
      const results = gildedRose.updateQuality();
      expect(results[0].quality).to.equal(9);
    });

    it("should decrease quality by 2 when sellIn is due", () => {
      const gildedRose = new GildedRose([new Item("Product A", 0, 10)]);
      const results = gildedRose.updateQuality();
      expect(results[0].quality).to.equal(8);
    });

    it("should quality will never be negative", () => {
      const gildedRose = new GildedRose([new Item("Product A", 10, 0)]);
      const results = gildedRose.updateQuality();
      expect(results[0].quality).to.equal(0);
    });

    it("should quality will never over 50", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 10, 50)]);
      const results = gildedRose.updateQuality();
      expect(results[0].quality).to.equal(50);
    });
  });
});
