export function groupBy<T>(list: T[], getKey: (item: T) => string): T[][] {
  return Array.from(list.reduce((previous: Map<string, T[]>, currentItem) => {
    const group = getKey(currentItem);
    if (!previous.get(group)) previous.set(group, []);
    previous.get(group)!!.push(currentItem);
    return previous;
  }, new Map<string, T[]>()).values())
}

//https://stackoverflow.com/questions/42136098/array-groupby-in-typescript
