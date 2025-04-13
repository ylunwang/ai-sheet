<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { read } from 'xlsx'
import { Button, Upload, type UploadProps } from 'tdesign-vue-next'
import Workbook from 'src/components/Workbook/index.vue'
import { convertToUniverWorkbook } from './convertWorkbook.ts'

const workbook = useTemplateRef('workbook')

const getUniverAPI = () => workbook.value?.univerAPI

// const uploadRequestMethod: UploadProps['requestMethod'] = async () => ({ status: 'success', response: {} })

const handleImport: UploadProps['onSelectChange'] = async (files) => {
  const [file] = files
  const fileArrayBuffer = await file.arrayBuffer()
  const xlsxWorkbook = read(fileArrayBuffer, { type: 'array' })
  const univerWorkbook = convertToUniverWorkbook(xlsxWorkbook)
  getUniverAPI()?.createWorkbook(univerWorkbook)
  return true;
}

const handleExport = () => {
  console.log(getUniverAPI()?.getActiveWorkbook()?.save())
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <div class="shrink-0 py-2 px-3 flex items-center gap-2 border-b border-gray-200">
      <Upload :onSelectChange="handleImport" />
      <Button :onClick="handleExport">导出</Button>
    </div>
    <Workbook ref="workbook" class="flex-auto" />
  </div>
</template>
