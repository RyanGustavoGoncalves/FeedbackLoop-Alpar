const addButton = document.getElementById("addBtn");
const taskCont = document.getElementById("task-container");
const taskName = document.getElementById("taskName");
const url = "http://localhost:3000/api/tasks";

const fetchTasks = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data || data.length == 0) {
                taskCont.innerHTML = `<h2 style="margin-top: .5rem;">Nenhuma tarefa cadastrada</h2>`
            } else {
                taskCont.innerHTML = "";
                data.forEach(task => renderTask(task));
            }
        })
        .catch(error => console.error('Erro ao buscar tarefas:', error));
}

const renderTask = (task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
    <div class="checkbox-wrapper-15">
    <input class="inp-cbx" onClick="updateTask('${task.name}', '${task.id}', this.checked)" id="cbx-${task.id}" type="checkbox" style="display: none;" />
        <label class="cbx" for="cbx-${task.id}">
            <span>
                <svg width="12px" height="9px" viewBox="0 0 12 9">
                    <polyline points="1 5 4 8 11 1"></polyline>
                </svg>
            </span>
            <span>${task.name}</span> 
        </label>
    </div>
    <svg onClick="deletar(${task.id})" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#c11822" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
    </svg>`;
    taskCont.appendChild(taskElement);

    const checkbox = document.getElementById(`cbx-${task.id}`);
    checkbox.checked = task.checked;

    const deleteIcon = taskElement.querySelector(".bi-trash");
    deleteIcon.addEventListener("click", () => {
        deletar(task.id, taskElement);
    });
}

addButton.addEventListener('click', () => {
    const task = {
        name: taskName.value,
        check: false,
    };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response) => {
            if (response.ok) {
                fetchTasks();
                return response.json();
            } else {
                throw new Error('Erro ao adicionar a tarefa');
            }
        })
        .then((data) => {
            renderTask(data);
            taskName.value = "";
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
});


fetchTasks();

function deletar(id, taskElement) {
    if (!id || !taskElement) {
        return;
    }
    fetch(`${url}/${id}`, {
        method: "DELETE",
    })
        .then(() => {
            taskElement.remove();
        })
        .catch(error => console.error('Erro ao deletar tarefa:', error))
        .finally(() => {
            fetchTasks();
        });
}

function updateTask(name, id, checked) {
    fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, checked: checked }),
    })
        .then(response => response.json())
        .then(updatedTask => {
            fetchTasks();
        })
        .catch(error => {
            console.error('Error updating task:', error);
        });
}
