<template>
  <div>
    <div class="row q-pa-sm">
      <q-input class="col" square filled bg-color="white" v-model="novaTarefa" @keyup.enter="adicionarTarefa()" placeholder="Adicione uma tarefa" dense>
        <template v-slot:append>
          <q-btn @click="adicionarTarefa()" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
    <q-item v-for="(todo, index) in todos" :key="todo.id" @click="todo.concluido = !todo.concluido"
      :class="{ 'concluido': todo.concluido }" v-ripple>
      <q-item-section avatar>
        <q-checkbox v-model="todo.concluido" :val="todo.id" color="primary" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ todo.content }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn @click.stop="deletarTarefa(index)" flat round dense color="negative" icon="delete" />
      </q-item-section>
    </q-item>
    <div v-if="!todos.length" class="sem-tarefas absolute-center">
      <q-icon
        name="check"
        size="100px"
        color="primary"
      />
      <div class="text-h5 text-primary text-center">
        Sem tarefas
      </div>
    </div>
  </div>
</template>

<script lang="ts">

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
    }
  },
  methods: {
    deletarTarefa(index: number) {
      this.todos.splice(index, 1)
    },
    adicionarTarefa(){
      this.todos.push({
        id: 10,
        content: this.novaTarefa,
        concluido: false
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
