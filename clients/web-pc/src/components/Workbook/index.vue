<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, toRaw, useTemplateRef } from 'vue'

import { createUniver, defaultTheme, LocaleType, merge } from '@univerjs/presets';
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core';
import UniverPresetSheetsCoreZhCN from '@univerjs/presets/preset-sheets-core/locales/zh-CN';

import type { FUniver } from '@univerjs/presets'

import '@univerjs/presets/lib/styles/preset-sheets-core.css';

const container = useTemplateRef('container');

const univerAPIRef = ref<FUniver | null>(null);

onMounted(() => {
  const { univerAPI } = createUniver({
    locale: LocaleType.ZH_CN,
    locales: {
      [LocaleType.ZH_CN]: merge(
        {},
        UniverPresetSheetsCoreZhCN,
      ),
    },
    theme: defaultTheme,
    presets: [
      UniverSheetsCorePreset({
        container: container.value || undefined,
      }),
    ],
  });
  univerAPIRef.value = univerAPI;
});

onBeforeUnmount(() => {
  toRaw(univerAPIRef.value)?.dispose();
  univerAPIRef.value = null;
});

defineExpose({
  univerAPI: univerAPIRef
})
</script>

<template>
  <div ref="container" class="workbook"></div>
</template>
