<script setup lang="ts">
import { Upload, type UploadProps } from 'tdesign-vue-next'
import { read } from 'xlsx'

const handleSelectChange: UploadProps['onSelectChange'] = (files) => {
  files.forEach(file => {
    file.arrayBuffer().then(value => {
      const workbook = read(value, { type: 'array' })
      console.log(workbook)
    })
  })
}

</script>

<template>
  <Upload
    :autoUpload="false"
    :onSelectChange="handleSelectChange"
  />
</template>
