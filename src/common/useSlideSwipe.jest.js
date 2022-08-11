import {
  calcGroupStaticPos, calcSwipeTo, rangeIndex 
} from './useSlideSwipe'

describe('calcGroupStaticPos - 根據index計算容器位移', () => {
  it('當前為第一筆 => 回傳靠左位置', () => {
    const result = calcGroupStaticPos(0, 1, 100, 200)
    expect(result).toStrictEqual(0)
  })
  it('當前為最後一筆 => 回傳靠右位置', () => {
    const result = calcGroupStaticPos(2, 3, 100, 200)
    expect(result).toStrictEqual(-100)
  })
  it('當前為中間項目 => 回傳置中位置', () => {
    const result = calcGroupStaticPos(1, 3, 100, 200)
    expect(result).toStrictEqual(-50)
  })
  it('input遺失 => 回傳0', () => {
    const result = calcGroupStaticPos()
    expect(result).toStrictEqual(0)
  })
})

describe('calcSwipeTo - 計算換頁方向', () => {
  it('往左滑超過項目1/6 => 回傳1', () => {
    const result = calcSwipeTo(11, 60)
    expect(result).toStrictEqual(1)
  })
  it('往右滑超過項目1/6 => 回傳-1', () => {
    const result = calcSwipeTo(-11, 60)
    expect(result).toStrictEqual(-1)
  })
  it('往左滑不超過項目1/6 => 回傳0', () => {
    const result = calcSwipeTo(10, 60)
    expect(result).toStrictEqual(0)
  })
  it('往右滑不超過項目1/6 => 回傳0', () => {
    const result = calcSwipeTo(-10, 60)
    expect(result).toStrictEqual(0)
  })
  it('滑動距離為0 => 回傳0', () => {
    const result = calcSwipeTo(0, 60)
    expect(result).toStrictEqual(0)
  })
  it('input遺失 => 回傳0', () => {
    const result = calcSwipeTo()
    expect(result).toStrictEqual(0)
  })
})

describe('rangeIndex - index不超出範圍', () => {
  it('目標index 小於 0 => 回傳0', () => {
    const result = rangeIndex(-1, 3)
    expect(result).toStrictEqual(0)
  })
  it('目標index 大於 最後一筆index => 回傳最後一筆index', () => {
    const result = rangeIndex(3, 3)
    expect(result).toStrictEqual(2)
  })
  it('目標index於範圍內 => 回傳目標index', () => {
    const result = rangeIndex(1, 3)
    expect(result).toStrictEqual(1)
  })
  it('input遺失 => 回傳0', () => {
    const result = rangeIndex()
    expect(result).toStrictEqual(0)
  })
})