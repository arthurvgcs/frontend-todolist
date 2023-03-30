<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-10 text-primary">
        <q-toolbar-title>
          Lista de Tarefas
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import { defineComponent} from 'vue';


export default defineComponent({
  name: 'MainLayout',
  setup() {
    
  }
});

</script>
