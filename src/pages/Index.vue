<template>
  <q-page class="row justify-evenly bg-white">
    <example-component
      title="Sua lista de Tarefas"
      :todos="todos"
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'Lavar Roupa',
        concluido: false
      },
      {
        id: 2,
        content: 'Ler Livro',
        concluido: false
      },
      {
        id: 3,
        content: 'Tomar Banho',
        concluido: false
      },
      {
        id: 4,
        content: 'Estudar JavaScript',
        concluido: false
      },
      {
        id: 5,
        content: 'Dormir',
        concluido: false
      }
    ]);
    return { todos };
  }
});

</script>
