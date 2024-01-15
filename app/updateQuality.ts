import { Item } from "./gilded-rose";
import { SpecialItemNames } from "./types";

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

function updateGeneralItemQuality(item: Item): Item {
  if (item.sellIn > 0) {
    item.quality = item.quality > MIN_QUALITY ? item.quality - 1 : MIN_QUALITY;
  } else {
    item.quality =
      item.quality - 2 > MIN_QUALITY ? item.quality - 2 : MIN_QUALITY;
  }
  item.sellIn -= 1;
  return item;
}

function updateAgedBrieItemQuality(item: Item): Item {
  if (item.sellIn > 0) {
    item.quality = item.quality < MAX_QUALITY ? item.quality + 1 : MAX_QUALITY;
  } else {
    item.quality =
      item.quality + 2 < MAX_QUALITY ? item.quality + 2 : MAX_QUALITY;
  }
  item.sellIn -= 1;
  return item;
}

function updateSulfurasItemQuality(item: Item): Item {
  if (item.sellIn > 1) {
    item.sellIn -= 1;
  }
  return item;
}

function updateBackstagePassesItemQuality(item: Item): Item {
  if (item.sellIn <= 0) {
    item.sellIn -= 1;
    item.quality = MIN_QUALITY;
    return item;
  }

  if (item.sellIn <= 5) {
    item.sellIn -= 1;
    item.quality =
      item.quality + 3 < MAX_QUALITY ? item.quality + 3 : MAX_QUALITY;
    return item;
  }

  if (item.sellIn <= 10) {
    item.sellIn -= 1;
    item.quality =
      item.quality + 2 < MAX_QUALITY ? item.quality + 2 : MAX_QUALITY;
    return item;
  }

  item.sellIn -= 1;
  item.quality = item.quality < MAX_QUALITY ? item.quality + 1 : MAX_QUALITY;
  return item;
}

export function updateItemQuality(item: Item): Item {
  switch (item.name) {
    case SpecialItemNames.AgedBrie:
      return updateAgedBrieItemQuality(item);

    case SpecialItemNames.Sulfuras:
      return updateSulfurasItemQuality(item);

    case SpecialItemNames.BackstagePasses:
      return updateBackstagePassesItemQuality(item);

    default:
      return updateGeneralItemQuality(item);
  }
}
