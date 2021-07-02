import EventEmitter from 'events'

export class ArrayEmittable<T> extends EventEmitter {
  public items: Array<T> = []

  public push(...items: T[]) {
    const returned = this.items.push(...items)
    this.emit('change', this.items)
    return returned
  }

  public unshift(...items: T[]) {
    const returned = this.items.unshift(...items)
    this.emit('change', this.items)
    return returned
  }

  public removeAtIndex(index: number) {
    const returned = this.items.splice(index, 1)
    this.emit('change', this.items)
    return returned
  }

  public removeItem(item: T) {
    const index = this.items.indexOf(item)

    if (index > -1) {
      return this.removeAtIndex(index)
    }

    return this.items
  }

  public getLength() {
    return this.items.length
  }
}
