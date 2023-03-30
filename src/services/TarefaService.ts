import axios from 'axios';

const API_URL = "http://localhost:3000/api";

class TarefaService {
    listarTarefas() {
        return axios.get(`${API_URL}/tarefas`);
    }

    deletarTarefa(id: number){
        return axios.delete(`${API_URL}/tarefas/${id}`)
    }

    criarTarefa(tarefa: String){
        return axios.post(`${API_URL}/tarefas`, {
            "tarefa": tarefa,
            "concluido": false
        })
    }


}



export default new TarefaService();

