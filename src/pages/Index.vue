<template>
  <q-page class="q-pa-md justify-center bg-white">
    <lista-tarefas-component
      title="Sua lista de Tarefas"
      :tarefas="tarefas"
      v-on:dados-atualizados="listaTarefas()"
    ></lista-tarefas-component>
  </q-page>
</template>

<script lang="ts">
import { Tarefas} from 'components/models';
import ListaTarefasComponent from 'src/components/ListaTarefasComponent.vue';
import TarefaService from '../services/TarefaService';

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: { ListaTarefasComponent },
  methods: {
    listaTarefas(){
      TarefaService.listarTarefas().then(response =>{
        this.tarefas = response.data;
      })
    }
  },
  setup() {
    const tarefas = ref<Tarefas[]>([]);
    return { tarefas };
  },
  mounted(){
    this.listaTarefas();
  },
});

</script>

