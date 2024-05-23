document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.querySelector('.input .core .input-book button.form');
    const checkbox = document.getElementById('input-publisher');

    function loadBooks() {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        books.forEach(book => {
            addBookToDOM(book.title, book.author, parseInt(book.year, 10), book.isComplete, book.id);
        });
    }

    function addBookToDOM(title, author, year, isComplete, id = +new Date()) {
        const book = document.createElement('div');
        book.className = 'book';
        book.dataset.id = id;

        const text = document.createElement('div');
        text.className = 'text';
        const h4 = document.createElement('h4');
        h4.textContent = title;
        const pAuthor = document.createElement('p');
        pAuthor.textContent = author;
        const pYear = document.createElement('p');
        pYear.textContent = year;
        text.appendChild(h4);
        text.appendChild(pAuthor);
        text.appendChild(pYear);

        const btn = document.createElement('div');
        btn.className = 'btn';
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fa fa-pencil"></i>';
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        btn.appendChild(editButton);
        btn.appendChild(deleteButton);

        const backButton = document.createElement('button');
        backButton.className = 'back';
        backButton.innerHTML = isComplete ? 'Belum<br>Dibaca' : 'Sudah<br>Dibaca';
        btn.appendChild(backButton);

        book.appendChild(text);
        book.appendChild(btn);

        const targetList = isComplete ? document.getElementById('after') : document.getElementById('before');
        targetList.appendChild(book);

        backButton.addEventListener('click', function() {
            isComplete = !isComplete;
            const newTargetList = isComplete ? document.getElementById('after') : document.getElementById('before');
            newTargetList.appendChild(book);
            backButton.innerHTML = isComplete ? 'Belum<br>Dibaca' : 'Sudah<br>Dibaca';
            saveBooks();
        });

        deleteButton.addEventListener('click', function() {
            if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
                book.remove();
                saveBooks();
            }
        });

        setupEditButton(editButton, book);
    }

    function setupEditButton(editButton, book) {
        editButton.addEventListener('click', function() {
            const newTitle = prompt("Masukkan judul buku baru:", book.querySelector('h4').textContent);
            if (newTitle) {
                book.querySelector('h4').textContent = newTitle;
            }

            const newAuthor = prompt("Masukkan nama penulis baru:", book.querySelector('p:nth-child(2)').textContent);
            if (newAuthor) {
                book.querySelector('p:nth-child(2)').textContent = newAuthor;
            }

            const newYear = prompt("Masukkan tahun buku baru:", book.querySelector('p:nth-child(3)').textContent);
            if (newYear && !isNaN(newYear)) {
                book.querySelector('p:nth-child(3)').textContent = parseInt(newYear, 10);
            }

            saveBooks();
        });
    }

    function saveBooks() {
        const books = [];
        document.querySelectorAll('.output .book').forEach(book => {
            const id = book.dataset.id;
            const title = book.querySelector('h4').textContent;
            const author = book.querySelector('p:nth-child(2)').textContent;
            const year = parseInt(book.querySelector('p:nth-child(3)').textContent, 10);
            const isComplete = book.parentNode.id === 'after';
            books.push({ id, title, author, year, isComplete });
        });
        localStorage.setItem('books', JSON.stringify(books));
    }

    saveButton.addEventListener('click', function(event) {
        event.preventDefault();
        const title = document.getElementById('input-book').value;
        const author = document.getElementById('input-author').value;
        const year = document.getElementById('input-year').value;
        const isComplete = checkbox.checked;

        addBookToDOM(title, author, year, isComplete);
        saveBooks(); 
    });

    loadBooks();
    const searchInput = document.querySelector('.nav .search input[type="search"]');

    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.toLowerCase();
        const books = document.querySelectorAll('.output .book');
        console.log(`Jumlah buku: ${books.length}`);

        books.forEach(book => {
            const title = book.querySelector('h4').textContent.toLowerCase();
            const author = book.querySelector('p:nth-child(2)').textContent.toLowerCase();
            const year = book.querySelector('p:nth-child(3)').textContent.toLowerCase();
            console.log(`Judul: ${title}, Pengarang: ${author}, Tahun: ${year}`);

            if (title.includes(searchText) || author.includes(searchText) || year.includes(searchText)) {
                book.style.display = '';
            } else {
                book.style.display = 'none';
            }
        });
    });
    
});
