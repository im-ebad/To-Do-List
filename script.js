
document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();

        if (todoText !== '') {
            addTodo(todoText);
            todoInput.value = '';
        }
    });

    function addTodo(text) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = `
<span>${text}</span>
<button class="check-btn"><i class="fa-solid fa-check"></i></button>
<button class="edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>
<button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
`;

        li.querySelector('.check-btn').addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            li.remove();
        });

        li.querySelector('.edit-btn').addEventListener('click',()=>{
        const todoTextElement = li.querySelector('.todo-input');
        const currentText = todoTextElement.textContent;

        // Create an input field to edit the to-do text
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = currentText;
        editInput.classList.add('edit-input');

        // Replace the span with the input field
        todoTextElement.replaceWith(editInput);

        // Focus on the input field
        editInput.focus();

        // Handle saving the new value when the user presses 'Enter' or clicks outside
        const saveChanges = () => {
            const updatedText = editInput.value.trim();

            if (updatedText !== '') {
                const newSpan = document.createElement('span');
                newSpan.classList.add('todo-text');
                newSpan.textContent = updatedText;
                editInput.replaceWith(newSpan);
            } else {
                // If input is empty, delete the item
                li.remove();
            }
        };

        // Save changes on pressing 'Enter'
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveChanges();
            }
        });

        // Save changes when the input field loses focus
        editInput.addEventListener('blur', () => {
            saveChanges();
        });
        });
        todoList.appendChild(li);
    }
});

