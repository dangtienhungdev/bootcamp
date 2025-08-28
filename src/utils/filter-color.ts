export const filterColor = (color: string) => {
  switch (color) {
    case 'Đỏ':
      return '#f44336'
    case 'Xanh':
      return '#2196F3'
    case 'Tím':
      return '#9c27b0'
    case 'Vàng':
      return '#fbc02d'
    case 'Cam':
      return '#ff9800'
    case 'Nâu':
      return '#795548'
    default:
      return '#000000'
  }
}
