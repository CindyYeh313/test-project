import {
  ref, watch 
} from 'vue'
import {
  useSwipe, usePointerSwipe, useElementBounding 
} from '@vueuse/core'

const useSlideSwipe = (groupRef, index = 0, listLength = 1, itemRef, visibleZoneRef) => {
  const currentIndex = ref(index)
  const { width: visibleZoneWidth } = useElementBounding(visibleZoneRef)
  const { width: itemWidth } = useElementBounding(itemRef)

  const { distanceX } = usePointerSwipe(groupRef, {
    onSwipe (e) {
      if (e.pointerType === 'mouse') {
        const groupStaticPos = calcGroupStaticPos(currentIndex.value, listLength, itemWidth.value, visibleZoneWidth.value)
        setGroupPosX(groupRef, groupStaticPos - distanceX.value)
      }
    },
    onSwipeEnd (e) {
      if (e.pointerType === 'mouse') {
        const indexAddTo = calcSwipeTo(distanceX.value, itemWidth.value)
        moveToIndex(currentIndex.value + indexAddTo)
      }
    }
  })

  const { lengthX } = useSwipe(groupRef, {
    onSwipe () {
      const groupStaticPos = calcGroupStaticPos(currentIndex.value, listLength, itemWidth.value, visibleZoneWidth.value)

      setGroupPosX(groupRef, groupStaticPos - lengthX.value)
    },
    onSwipeEnd () {
      const indexAddTo = calcSwipeTo(lengthX.value, itemWidth.value)
      moveToIndex(currentIndex.value + indexAddTo)
    }
  })

  const moveToIndex = (index) => {
    currentIndex.value = rangeIndex(index, listLength)

    const groupStaticPos = calcGroupStaticPos(currentIndex.value, listLength, itemWidth.value, visibleZoneWidth.value)

    setGroupPosX(groupRef, groupStaticPos)
  }

  watch(itemWidth, () => {
    moveToIndex(currentIndex.value)
  })

  watch(visibleZoneWidth, () => {
    moveToIndex(currentIndex.value)
  })

  return {
    currentIndex, moveToIndex 
  }
}

// 設定容器位置
const setGroupPosX = (groupRef, movingX = 0) => {
  if (groupRef.value) {
    groupRef.value.style.transform = `translate(${ movingX }px)`
  }
}

// index不超出範圍
export const rangeIndex = (index = 0, listLength = 1) => {
  if (index < 0) {
    return 0
  } else if (index > listLength - 1) {
    return listLength - 1
  } else {
    return index
  }
}

// 根據index計算容器位移
export const calcGroupStaticPos = (index = 0, listLength = 1, itemWidth = 0, visibleZoneWidth = 0) => {
  let result = 0
  const currentItemPos = itemWidth * index * -1
  const spaceWithoutCurrentItem = visibleZoneWidth - itemWidth

  if (index === 0) {
    result = 0
  } else if (index === listLength - 1) {
    result = currentItemPos + spaceWithoutCurrentItem
  } else {
    result = currentItemPos + (spaceWithoutCurrentItem / 2)
  }

  return result
}

// 計算換頁方向
export const calcSwipeTo = (moveX = 0, itemWidth = 0) => {
  const isHalfOver = Math.abs(moveX) > itemWidth / 6
  if (isHalfOver) {
    return moveX > 0 ? 1 : -1
  }
  return 0
}

export default useSlideSwipe