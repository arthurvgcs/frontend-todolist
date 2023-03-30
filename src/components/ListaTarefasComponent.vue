<template>
  <div>
    <div class="q-pa-md row items-center justify-center q-gutter-md">
      <q-card dark bordered class="bg-grey-9 my-card">
        <q-card-section>
          <q-input class="col" square filled bg-color="grey-9" v-model="novaTarefa" @keyup.enter="adicionarTarefa()"
            placeholder="Adicione uma tarefa" dense dark>
            <template v-slot:append>
              <q-btn @click="adicionarTarefa()" round dense flat icon="add" color="primary" />
            </template>
          </q-input>
        </q-card-section>
        <q-separator color="primary" inset />
        <q-card-section>
            <q-list dense bordered padding class="rounded-borders my-list q-py-xs">
              <q-item v-for="tarefa in tarefas" :key="tarefa.id" @click="atualizarTarefa(tarefa.id, tarefa.tarefa, tarefa.concluido)"
                :class="{ 'concluido': tarefa.concluido }" v-ripple clickable>
                <q-item-section avatar>
                  <q-checkbox v-model="tarefa.concluido" :val="tarefa.id"
                    color="primary" class="no-pointer-events" dark />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">{{ tarefa.tarefa }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn @click.stop="deletarTarefa(tarefa.id)" flat round dense color="negative" icon="delete" />
                </q-item-section>
              </q-item>
              <div v-if="!tarefas.length" class="sem-tarefas text-center">
                <q-icon name="check" size="100px" color="primary" />
                <div class="text-h5 text-primary text-center">
                  Sem tarefas
                </div>
              </div>
            </q-list>
        </q-card-section>
      
    
      </q-card>
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
  name: 'ListaTarefasComponent',
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
      if (this.novaTarefa.trim() === "") {
        alert("Digite algo na nova tarefa")
      } else {
        TarefaService.criarTarefa(this.novaTarefa).then(response => {
          this.$emit('dados-atualizados');
        })
        this.novaTarefa = ''
      }
    },
    atualizarTarefa (id: number, tarefa: String, concluido: boolean){
      concluido = !concluido;
      TarefaService.atualizarTarefa(id, tarefa, concluido).then(response => {
          this.$emit('dados-atualizados');
        })
    }
  },
  data() {
    
    return {
      novaTarefa: '',
    };
  },
});

</script>

<style lang="scss">
.my-card {
  width: 100%;
  max-width: 600px;
  max-height: 620px;
}

.concluido {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}

.sem-tarefas {
  opacity: 1.0;
}
</style>
