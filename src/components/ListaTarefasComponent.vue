<template>
  <div>
    <div class="row q-pa-sm">
      <q-input class="col" square filled bg-color="white" v-model="novaTarefa" @keyup.enter="adicionarTarefa()"
        placeholder="Adicione uma tarefa" dense>
        <template v-slot:append>
          <q-btn @click="adicionarTarefa()" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
    <q-list dense bordered padding class="rounded-borders">
      <q-item v-for="tarefa in tarefas" :key="tarefa.id" @click="tarefa.concluido = !tarefa.concluido"
        :class="{ 'concluido': tarefa.concluido }" v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="tarefa.concluido" :val="tarefa.id" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ tarefa.tarefa }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn @click.stop="deletarTarefa(tarefa.id)" flat round dense color="negative" icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>

    <div v-if="!tarefas.length" class="sem-tarefas absolute-center">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">
        Sem tarefas
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import TarefaService from 'src/services/TarefaService';
import {
  defineComponent, PropType, ref
} from 'vue';
import { Tarefas } from './models';

export default defineComponent({
  name: 'CompositionComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    tarefas: {
      type: (Array as unknown) as PropType<Tarefas[]>,
      default: () => []
    },

  },
  methods: {
    deletarTarefa(id: number) {
      TarefaService.deletarTarefa(id).then(response => {
        this.$emit('dados-atualizados');
      })
    },
    adicionarTarefa() {
      TarefaService.criarTarefa(this.novaTarefa).then(response => {
        this.$emit('dados-atualizados');
      })
      this.novaTarefa = ''
    }
  },
  setup(props) {
    return {
      novaTarefa: '',
    };
  },
});

</script>

<style lang="scss">
.concluido {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}

.sem-tarefas {
  opacity: 0.5;
}
</style>
