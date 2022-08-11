import {
  calcImgSetting, calcZoomImg, calcAxisMove 
} from './useCanvasImgCropper.js'

const imgPositionData = {
  imgX: 67,
  imgY: 50
}
const clipSizeData = {
  clipWidth: 200,
  clipHeight: 200
}
const clipPositionData = {
  clipX: 100,
  clipY: 50
}

describe('calcImgSetting - 計算 canvas 圖片初始參數', () => {
  it('有資料', () => {
    const inputData = {
      canvasWidth: 400,
      canvasHeight: 300,
      clipWidth: 200,
      clipHeight: 200,
      imgRef: {
        width: 800,
        height: 600
      }
    }
    const expectReturn = {
      imgSize: {
        imgWidth: 267,
        imgHeight: 200
      },
      imgPosition: {
        imgX: 67,
        imgY: 50
      },
      clipPosition: {
        clipX: 100,
        clipY: 50
      }
    }

    const result = calcImgSetting(inputData)
    expect(result).toStrictEqual(expectReturn)
  })
  it('資料缺漏', () => {
    const expectReturn = {
      imgSize: {
        imgWidth: 0,
        imgHeight: 0
      },
      imgPosition: {
        imgX: 0,
        imgY: 0
      },
      clipPosition: {
        clipX: 0,
        clipY: 0
      }
    }

    const result = calcImgSetting()
    expect(result).toStrictEqual(expectReturn)
  })
})

describe('calcZoomImg - 計算縮放圖片參數', () => {
  it('縮放圖片', () => {
    const inputData = {
      zoom: 1.5,
      imgSizeData: {
        imgWidth: 300,
        imgHeight: 200
      }
    }
    const expectReturn = {
      imgSize: {
        imgWidth: 450,
        imgHeight: 300
      }
    }

    const result = calcZoomImg(inputData)
    expect(result).toStrictEqual(expectReturn)
  })
  it('資料缺漏', () => {
    const expectReturn = {
      imgSize: {
        imgWidth: 0,
        imgHeight: 0
      }
    }

    const result = calcZoomImg()
    expect(result).toStrictEqual(expectReturn)
  })
})

describe('moveImg - 計算移動圖片參數', () => {
  const zoomImgSizeData = {
    zoomImgWidth: 800,
    zoomImgHeight: 600
  }
  it('範圍內移動', () => {
    const inputData = {
      moveAxis: 10,
      imgPositionAxis: imgPositionData.imgX,
      zoomImgSize: zoomImgSizeData.zoomImgWidth,
      clipSize: clipSizeData.clipWidth,
      clipAxis: clipPositionData.clipX
    }
    const expectReturn = 77
    const result = calcAxisMove(inputData)
    expect(result).toStrictEqual(expectReturn)
  })
  it('X軸右移動不超過裁切框', () => {
    const inputData = {
      moveAxis: 1000,
      imgPositionAxis: imgPositionData.imgX,
      zoomImgSize: zoomImgSizeData.zoomImgWidth,
      clipSize: clipSizeData.clipWidth,
      clipAxis: clipPositionData.clipX
    }
    const expectReturn = 100

    const result = calcAxisMove(inputData)
    expect(result).toStrictEqual(expectReturn)
  })
  it('X軸左移動不超過裁切框', () => {
    const inputData = {
      moveAxis: -1000,
      imgPositionAxis: imgPositionData.imgX,
      zoomImgSize: zoomImgSizeData.zoomImgWidth,
      clipSize: clipSizeData.clipWidth,
      clipAxis: clipPositionData.clipX
    }
    const expectReturn = -500

    const result = calcAxisMove(inputData)
    expect(result).toStrictEqual(expectReturn)
  })
  it('Y軸上移動不超過裁切框', () => {
    const inputData = {
      moveAxis: -1000,
      imgPositionAxis: imgPositionData.imgY,
      zoomImgSize: zoomImgSizeData.zoomImgHeight,
      clipSize: clipSizeData.clipHeight,
      clipAxis: clipPositionData.clipY
    }
    const expectReturn = -350

    const result = calcAxisMove(inputData)
    expect(result).toStrictEqual(expectReturn)
  })
  it('Y軸下移動不超過裁切框', () => {
    const inputData = {
      moveAxis: 1000,
      imgPositionAxis: imgPositionData.imgY,
      zoomImgSize: zoomImgSizeData.zoomImgHeight,
      clipSize: clipSizeData.clipHeight,
      clipAxis: clipPositionData.clipY
    }
    const expectReturn = 50

    const result = calcAxisMove(inputData)
    expect(result).toStrictEqual(expectReturn)
  })
  it('資料缺漏', () => {
    const expectReturn = 0

    const result = calcAxisMove()
    expect(result).toStrictEqual(expectReturn)
  })
})