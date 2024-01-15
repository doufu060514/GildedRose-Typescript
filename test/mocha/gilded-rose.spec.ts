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

  describe("Aged Brie", () => {
    it("should Aged Brie quality increase by 1 while sellIn decrease by 1", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 10, 10)]);
      const results = gildedRose.updateQuality();
      expect(results[0].sellIn).to.equal(9);
      expect(results[0].quality).to.equal(11);
    });

    it("should Aged Brie quality increase by 2 when sellIn is due", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 0, 10)]);
      const results = gildedRose.updateQuality();
      expect(results[0].sellIn).to.equal(-1);
      expect(results[0].quality).to.equal(12);
    });
  });

  describe("Sulfuras", () => {
    it("should Sulfuras quality should always be 80", () => {
      const testData = [
        new Item("Sulfuras, Hand of Ragnaros", 10, 80),
        new Item("Sulfuras, Hand of Ragnaros", 10, 10),
      ];
      const gildedRose = new GildedRose(testData);
      const results = gildedRose.updateQuality();
      expect(results[0].quality).to.equal(80);
      expect(results[1].quality).to.equal(80);
    });

    it("should Sulfuras sellIn will never due", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 1, 10),
      ]);
      const results = gildedRose.updateQuality();
      expect(results[0].sellIn).to.equal(1);
    });
  });

  describe("Backstage passes", () => {
    it("should Backstage passes quality increase by 1 while sellIn decrease by 1", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 20, 20),
      ]);
      const results = gildedRose.updateQuality();
      expect(results[0].sellIn).to.equal(19);
      expect(results[0].quality).to.equal(21);
    });

    it("should Backstage passes quality increase by 2 while sellIn is bigger than 5 and no more than 10", () => {
      const testData = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
        new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10),
      ];
      const gildedRose = new GildedRose(testData);
      const results = gildedRose.updateQuality();
      expect(results[0].quality).to.equal(12);
      expect(results[1].quality).to.equal(12);
    });

    it("should Backstage passes quality increase by 3 while sellIn is bigger than 0 and no more than 5", () => {
      const testData = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
        new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10),
      ];
      const gildedRose = new GildedRose(testData);
      const results = gildedRose.updateQuality();
      expect(results[0].quality).to.equal(13);
      expect(results[1].quality).to.equal(13);
    });

    it("should Backstage passes quality will drop to 0 when sellIn is due", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
      ]);
      const results = gildedRose.updateQuality();
      expect(results[0].quality).to.equal(0);
    });
  });

  describe("Conjured", () => {
    it("should Conjured quality decrease by 2 when sellIn is not due", () => {
      const gildedRose = new GildedRose([new Item("Conjured", 1, 20)]);
      const results = gildedRose.updateQuality();
      expect(results[0].quality).to.equal(18);
    });

    it("should Conjured quality decrease by 4 when sellIn is due", () => {
      const gildedRose = new GildedRose([new Item("Conjured", 0, 20)]);
      const results = gildedRose.updateQuality();
      expect(results[0].quality).to.equal(16);
    });
  });
});
