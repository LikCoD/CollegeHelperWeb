export class Data<T, V> {
  constructor(public data: T, public value: V, public label: string) {
  }

  static from<T, V>(data: Data<T, V>[] | T[] | Map<string, T>): Data<T, V>[] {
    if (Array.isArray(data)) {
      if (!data) return []

      if (data[0] instanceof Data<T, V>) return data as Data<T, V>[]

      return data.map((v) => new Data(v as T, v as V, v?.toString() || ""))
    }
    return Array.from(data.entries()).map((v) => new Data(v[1], v[1] as unknown as V, v[0]))
  }
}
