// import isNumber from './isNumber'
import isNumber from './isNumber'
import './selectObjectFieldByString'

const excelDataFormatter = (data, format) => {
  let { header } = format
  const { columns } = format
  console.log('DATAAAAA ====> ', data)

  header = header.map(row => row.map(element => ({
    backgroundColor: '#ffff54',
    borderColor: '#000000',
    align: 'center',
    alignVertical: 'center',
    fontWeight: 'bold',
    color: '#000000',
    height: 25,
    wrap: true,
    ...element
  })))

  const newData = data.map(element => {
    const isBold = element.isBold

    return columns.map(e => {
      const value = Object.byString(element, e)

      const row = {
        value,
        borderColor: '#000000',
        height: 40,
        align: 'center',
        alignVertical: 'center',
        wrap: true
      }

      if (isBold) {
        // row.value = value.replace('BOLD-', '')
        row.fontWeight = 'bold'
      }

      if (isNumber(value)) {
        row.type = Number
        row.value = +value
      }

      return row
    }
    )
  })

  return [...header, ...newData]
}

export default excelDataFormatter
