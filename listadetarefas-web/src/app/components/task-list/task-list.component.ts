import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../../services/tarefa';
import { Tarefa } from '../../models/tarefa';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tarefas: Tarefa[] = [];
  novaTarefa: Tarefa = { descricao: '', concluida: false };

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefaService.getTarefas().subscribe((data) => {
      this.tarefas = data;
    });
  }

  adicionarTarefa(): void {
    if (!this.novaTarefa.descricao.trim()) return;

    this.tarefaService.addTarefa(this.novaTarefa).subscribe((tarefa) => {
      this.tarefas.push(tarefa);
      this.novaTarefa = { descricao: '', concluida: false };
    });
  }

  atualizarStatus(tarefa: Tarefa): void {
    this.tarefaService.updateTarefa(tarefa).subscribe();
  }

  deletarTarefa(id: number | undefined): void {
    if (id === undefined) return;

    this.tarefas = this.tarefas.filter((t) => t.id !== id);
    this.tarefaService.deleteTarefa(id).subscribe();
  }

  editarTarefa(id: number | undefined): void {
    if (!id) return;

    const tarefa = this.tarefas.find((t) => t.id === id);
    if (!tarefa) return;

    const novaDescricao = prompt('Edite a descrição da tarefa:', tarefa.descricao);
    if (!novaDescricao?.trim()) return;

    tarefa.descricao = novaDescricao.trim();
    this.tarefaService.updateTarefa(tarefa).subscribe();
  }

  toggleDarkMode(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    document.body.classList.toggle('dark', isChecked);
  }
}
