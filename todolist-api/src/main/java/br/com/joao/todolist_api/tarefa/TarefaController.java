package br.com.joao.todolist_api.tarefa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
@CrossOrigin

public class TarefaController {
    @Autowired
    private TarefaService tarefaService;

    // CREATE
    @PostMapping
    public Tarefa criarTarefa(@RequestBody Tarefa tarefa) {
        return tarefaService.criar(tarefa);
    }

    // READ - Listar Todas
    @GetMapping
    public List<Tarefa> listarTarefas() {
        return tarefaService.listarTodas();
    }

    // READ - Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> buscarTarefaPorId(@PathVariable Long id) {
        return tarefaService.buscarPorId(id)
                .map(ResponseEntity::ok) // Se encontrar, retorna 200 OK com a tarefa
                .orElse(ResponseEntity.notFound().build()); // Se não, retorna 404 Not Found
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizarTarefa(@PathVariable Long id, @RequestBody Tarefa tarefa) {
        try {
            Tarefa atualizada = tarefaService.atualizar(id, tarefa);
            return ResponseEntity.ok(atualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTarefa(@PathVariable Long id) {
        try {
            tarefaService.deletar(id);
            return ResponseEntity.noContent().build(); // Retorna 204 No Content, sucesso sem corpo
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

