<template>
  <q-page class="row justify-evenly bg-white">
    <example-component
      title="Sua lista de Tarefas"
      :todos="todos"
      v-on:dados-atualizados="listaTarefas()"
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import TarefaService from '../services/TarefaService';

import { defineComponent, onUpdated, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },
  methods: {
    listaTarefas(){
      TarefaService.listarTarefas().then(response =>{
        this.todos = response.data;
      })
    }
  },
  setup() {
    const todos = ref<Todo[]>([]);
    return { todos };
  },
  mounted(){
    this.listaTarefas();
  },
});

</script>
