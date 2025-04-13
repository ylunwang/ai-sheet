import { uniqueId } from 'lodash-es'
import type { WorkBook as XlsxWorkbook } from 'xlsx'
import type {
  IWorkbookData as UniverWorkbookData,
  IWorksheetData as UniverWorksheetData,
} from '@univerjs/presets'

export function convertToUniverWorkbook(xlsxWorkbook: XlsxWorkbook): Partial<UniverWorkbookData> {
  const univerSheets: UniverWorkbookData['sheets'] = {}

  Object.entries(xlsxWorkbook.Sheets).forEach(([sheetName, sheetData]) => {
    const univerCellData: UniverWorksheetData['cellData'] = {}

    Object.entries(sheetData).forEach(([cellAddress, cellValue]) => {
      if (/^\!/.test(cellAddress)) {
        return
      }
      const matcher = cellAddress.match(/(^[A-Z]+)(\d+$)/)
      if (matcher) {
        const [_, letters, numbers] = matcher
        const row = parseInt(numbers) - 1
        const col = lettersToIndex(letters)
        // 构建cellData结构
        if (!univerCellData[row]) {
          univerCellData[row] = {}
        }
        univerCellData[row][col] = { v: cellValue.v }
      }
    })

    univerSheets[sheetName] = {
      id: uniqueId('sheet_'),
      name: sheetName,
      cellData: univerCellData
    }
  })

  return {
    id: uniqueId('workbook_'),
    sheets: univerSheets
  }
}

function lettersToIndex(letters: string) {
  return letters.split('').reduce((acc, char) => {
    return acc * 26 + (char.charCodeAt(0) - 64)
  }, 0) - 1
}
