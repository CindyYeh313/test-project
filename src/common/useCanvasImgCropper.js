import { useMouse, useMousePressed } from '@vueuse/core'
import { ref, watch } from 'vue'

const useCanvasImgCropper = ({
  canvasWidth = 0, // canvas 寬
  canvasHeight = 0, // canvas 高
  clipWidth = 0, // 裁切框寬
  clipHeight = 0, // 裁切框高
  imgRef = ref(null), // 圖片 ref
  canvasRef = ref(null) // canvas ref
}) => {
  const canvasSizeData = {
    canvasWidth,
    canvasHeight
  }
  const clipSizeData = {
    clipWidth,
    clipHeight
  }
  let imgSizeData = {
    imgWidth: 0,
    imgHeight: 0
  }
  let imgPositionData = {
    imgX: 0,
    imgY: 0
  }
  let zoomImgSizeData = {
    zoomImgWidth: 0,
    zoomImgHeight: 0
  }
  let clipPositionData = {
    clipX: 0,
    clipY: 0
  }
  let ctx = null

  watch(imgRef, () => {
    if (imgRef.value) {
      imgRef.value.onload = () => {
        if (canvasRef.value) {
          ctx = canvasRef.value.getContext('2d')
        }
        drawImg()
      }
    }
  })

  // canvas 圖片初始繪製
  const drawImg = () => {
    const { imgSize, imgPosition, clipPosition } = calcImgSetting({
      canvasWidth,
      canvasHeight,
      clipWidth,
      clipHeight,
      imgRef: imgRef.value
    })
    imgSizeData = imgSize
    imgPositionData = imgPosition
    clipPositionData = clipPosition
    zoomImgSizeData = {
      zoomImgWidth: imgSize.imgWidth,
      zoomImgHeight: imgSize.imgHeight
    }
    canvasRef.value.style.cursor = 'grab'

    drawCanvas()
  }

  // 滑鼠拖移事件
  const { pressed } = useMousePressed({ touch: false, target: canvasRef })
  const { x, y } = useMouse({ touch: false })
  const pressedPosition = ref({
    x: 0,
    y: 0
  })
  watch(pressed, () => {
    if (!canvasRef.value) return
    if (pressed.value) {
      pressedPosition.value.x = x.value
      pressedPosition.value.y = y.value
      canvasRef.value.style.cursor = 'grabbing'
    } else {
      canvasRef.value.style.cursor = 'grab'
    }
  })
  watch(x, () => {
    if (pressed.value && canvasRef.value) {
      drawMoveImg()
    }
  })
  watch(y, () => {
    if (pressed.value && canvasRef.value) {
      drawMoveImg()
    }
  })

  // canvas 移動圖片
  const drawMoveImg = () => {
    const nowX = x.value - pressedPosition.value.x
    const nowY = y.value - pressedPosition.value.y
    pressedPosition.value.x = pressedPosition.value.x + nowX
    pressedPosition.value.y = pressedPosition.value.y + nowY

    imgPositionData = {
      imgX: calcAxisMove({
        moveAxis: nowX,
        imgPositionAxis: imgPositionData.imgX,
        zoomImgSize: zoomImgSizeData.zoomImgWidth,
        clipSize: clipSizeData.clipWidth,
        clipAxis: clipPositionData.clipX
      }),
      imgY: calcAxisMove({
        moveAxis: nowY,
        imgPositionAxis: imgPositionData.imgY,
        zoomImgSize: zoomImgSizeData.zoomImgHeight,
        clipSize: clipSizeData.clipHeight,
        clipAxis: clipPositionData.clipY
      })
    }

    drawCanvas()
  }

  // canvas 縮放圖片
  const drawZoomImg = (zoom) => {
    const { imgSize } = calcZoomImg({ zoom, imgSizeData })
    zoomImgSizeData = {
      zoomImgWidth: imgSize.imgWidth,
      zoomImgHeight: imgSize.imgHeight
    }

    imgPositionData = {
      imgX: calcAxisMove({
        moveAxis: 0,
        imgPositionAxis: imgPositionData.imgX,
        zoomImgSize: zoomImgSizeData.zoomImgWidth,
        clipSize: clipSizeData.clipWidth,
        clipAxis: clipPositionData.clipX
      }),
      imgY: calcAxisMove({
        moveAxis: 0,
        imgPositionAxis: imgPositionData.imgY,
        zoomImgSize: zoomImgSizeData.zoomImgHeight,
        clipSize: clipSizeData.clipHeight,
        clipAxis: clipPositionData.clipY
      })
    }

    drawCanvas()
  }

  // canvas 繪製
  const drawCanvas = () => {
    // 清除畫布
    ctx.clearRect(0, 0, canvasSizeData.canvasWidth, canvasSizeData.canvasHeight)

    // mask
    ctx.fillStyle = 'rgba(41, 41, 41, 0.7)'
    ctx.fillRect(0, 0, canvasSizeData.canvasWidth, canvasSizeData.canvasHeight)
    ctx.clearRect(clipPositionData.clipX, clipPositionData.clipY, clipSizeData.clipWidth, clipSizeData.clipHeight)

    ctx.globalCompositeOperation = 'destination-over'

    ctx.drawImage(imgRef.value, imgPositionData.imgX, imgPositionData.imgY, zoomImgSizeData.zoomImgWidth, zoomImgSizeData.zoomImgHeight)

    // 白色框
    ctx.globalCompositeOperation = 'source-over'
    ctx.lineWidth = 2
    ctx.strokeStyle = '#fff'
    ctx.strokeRect(clipPositionData.clipX, clipPositionData.clipY, clipSizeData.clipWidth, clipSizeData.clipHeight)
  }

  // 裁切圖片轉存 base64
  const getClipToBase64 = (imgRef) => {
    let canvasClipImg = document.createElement('canvas')
    canvasClipImg.width = clipSizeData.clipWidth
    canvasClipImg.height = clipSizeData.clipHeight
    const ctxClipImg = canvasClipImg.getContext('2d')

    const x = imgPositionData.imgX - clipPositionData.clipX
    const y = imgPositionData.imgY - clipPositionData.clipY
    ctxClipImg.drawImage(imgRef, x, y, zoomImgSizeData.zoomImgWidth, zoomImgSizeData.zoomImgHeight)

    const imgBase64 = canvasClipImg.toDataURL('image/jpeg')
    canvasClipImg = null

    return imgBase64
  }

  return { drawZoomImg, getClipToBase64 }
}

// 計算 canvas 圖片初始參數
export const calcImgSetting = (data = {}) => {
  const { canvasWidth = 0, canvasHeight = 0, clipWidth = 0, clipHeight = 0, imgRef = {} } = data
  const { width = 0, height = 0 } = imgRef

  // 圖片寬高比
  const imgAspectRatio = (width / height) || 0

  // 裁切範圍寬高比
  const clipAspectRatio = clipWidth / clipHeight
  const isImgWider = imgAspectRatio >= clipAspectRatio

  // 圖片初始寬高(短邊貼齊裁切框)
  const imgSize = {}
  imgSize.imgWidth = isImgWider ? Math.round(clipHeight * (width / height)) || 0 : clipWidth
  imgSize.imgHeight = isImgWider ? clipHeight : Math.round(clipWidth * (height / width)) || 0

  // 圖片初始位置
  const imgPosition = {}
  imgPosition.imgX = Math.round((canvasWidth - imgSize.imgWidth) / 2)
  imgPosition.imgY = Math.round((canvasHeight - imgSize.imgHeight) / 2)

  // 裁切框位置
  const clipPosition = {}
  clipPosition.clipX = Math.round((canvasWidth - clipWidth) / 2)
  clipPosition.clipY = Math.round((canvasHeight - clipHeight) / 2)

  return {
    imgSize,
    imgPosition,
    clipPosition
  }
}

// 計算移動圖片參數
export const calcAxisMove = (data = {}) => {
  const { moveAxis = 0, imgPositionAxis = 0, zoomImgSize = 0, clipSize = 0, clipAxis = 0 } = data

  const moveNumber = imgPositionAxis + moveAxis
  const maxMoveNumber = (clipAxis + clipSize) - zoomImgSize

  if (moveNumber > clipAxis || moveNumber < maxMoveNumber) {
    return moveNumber > clipAxis ? clipAxis : maxMoveNumber
  } else {
    return moveNumber
  }
}

// 計算縮放圖片參數
export const calcZoomImg = (data = {}) => {
  const { zoom = 1, imgSizeData = {} } = data
  const { imgWidth = 0, imgHeight = 0 } = imgSizeData

  const zoomImgSize = {}
  zoomImgSize.zoomImgWidth = Math.round(zoom * imgWidth)
  zoomImgSize.zoomImgHeight = Math.round(zoom * imgHeight)

  return {
    imgSize: {
      imgWidth: zoomImgSize.zoomImgWidth,
      imgHeight: zoomImgSize.zoomImgHeight
    }
  }
}

export default useCanvasImgCropper
