import { IFlightCard } from '../types/types';

export function cardFilter(arr: IFlightCard[], transferAll: boolean, transferFilter: boolean[]) {
  return arr.filter((item: IFlightCard) => {
    if (transferAll) {
      return true;
    }
    if (transferFilter[0]) {
      if (item.segments[0].stops.length === 0 || item.segments[1].stops.length === 0) {
        return true;
      }
    }
    if (transferFilter[1]) {
      if (item.segments[0].stops.length === 1 || item.segments[1].stops.length === 1) {
        return true;
      }
    }
    if (transferFilter[2]) {
      if (item.segments[0].stops.length === 2 || item.segments[1].stops.length === 2) {
        return true;
      }
    }
    if (transferFilter[3]) {
      if (item.segments[0].stops.length === 3 || item.segments[1].stops.length === 3) {
        return true;
      }
    }
    return false;
  });
}

export function sortFast(array: IFlightCard[]) {
  return [...array].sort((a, b) => {
    return (
      Math.min(a.segments[0].duration, a.segments[1].duration) -
      Math.min(b.segments[0].duration, b.segments[1].duration)
    );
  });
}

export function sortCheap(array: IFlightCard[]) {
  return [...array].sort((a, b) => a.price - b.price);
}
