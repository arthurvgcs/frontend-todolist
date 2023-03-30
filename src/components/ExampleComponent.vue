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
    <q-item v-for="todo in todos" :key="todo.id" @click="todo.concluido = !todo.concluido"
      :class="{ 'concluido': todo.concluido }" v-ripple>
      <q-item-section avatar>
        <q-checkbox v-model="todo.concluido" :val="todo.id" color="primary" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ todo.tarefa }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn @click.stop="deletarTarefa(todo.id)" flat round dense color="negative" icon="delete" />
      </q-item-section>
    </q-item>
    <div v-if="!todos.length" class="sem-tarefas absolute-center">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">
        Sem tarefas
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { response } from 'express';
import TarefaService from 'src/services/TarefaService';
import {
  defineComponent, PropType, computed, ref, toRef, Ref,
} from 'vue';
import { Todo, Meta } from './models';

export default defineComponent({
  name: 'CompositionComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    todos: {
      type: (Array as unknown) as PropType<Todo[]>,
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
      index: '',
      color: ref(['cyan']),
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
