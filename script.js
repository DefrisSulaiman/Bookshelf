document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.querySelector('.input .core .input-book button.form');
    const checkbox = document.getElementById('input-publisher'); // Asumsi ID checkbox adalah 'input-publisher'

    // Fungsi untuk memuat buku dari localStorage
    function loadBooks() {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        books.forEach(book => {
            addBookToDOM(book.title, book.author, book.year, book.isRead);
        });
    }

    // Fungsi untuk menambahkan buku ke DOM
    function addBookToDOM(title, author, year, isRead) {
        const book = document.createElement('div');
        book.className = 'book';

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

        book.appendChild(text);
        book.appendChild(btn);

        // Gunakan ID 'before' dan 'after' untuk menargetkan list yang benar
        const targetList = isRead ? document.getElementById('after') : document.getElementById('before');
        targetList.appendChild(book);

        checkbox.checked = isRead;

        // Event listener untuk delete
        deleteButton.addEventListener('click', function() {
            if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
                book.remove();
                saveBooks();
            }
        });

        // Event listener untuk edit
        editButton.addEventListener('click', function() {
            const newTitle = prompt("Edit Judul Buku:", h4.textContent);
            if (newTitle !== null) h4.textContent = newTitle;
            const newAuthor = prompt("Edit Pengarang Buku:", pAuthor.textContent);
            if (newAuthor !== null) pAuthor.textContent = newAuthor;
            const newYear = prompt("Edit Tahun Terbit:", pYear.textContent);
            if (newYear !== null) pYear.textContent = newYear;
        });
    }

    // Fungsi untuk menyimpan semua buku ke localStorage
    function saveBooks() {
        const books = [];
        document.querySelectorAll('.output .book').forEach(book => {
            const title = book.querySelector('h4').textContent;
            const author = book.querySelector('p:nth-child(2)').textContent;
            const year = book.querySelector('p:nth-child(3)').textContent;
            const isRead = book.parentNode.id === 'after'; // Periksa apakah parent ID adalah 'after'
            books.push({ title, author, year, isRead });
        });
        localStorage.setItem('books', JSON.stringify(books));
    }

    saveButton.addEventListener('click', function(event) {
        event.preventDefault();
        const title = document.getElementById('input-book').value;
        const author = document.getElementById('input-author').value;
        const year = document.getElementById('input-year').value;
        const isRead = checkbox.checked;

        addBookToDOM(title, author, year, isRead);
        saveBooks(); // Update localStorage after adding a new book
    });

    loadBooks(); // Load books when the page is loaded
    const searchInput = document.querySelector('.nav .search input[type="search"]');

    // Fungsi search engine
    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.toLowerCase();
        const books = document.querySelectorAll('.output .book');
        console.log(`Jumlah buku: ${books.length}`); // Debug jumlah buku

        books.forEach(book => {
            const title = book.querySelector('h4').textContent.toLowerCase();
            const author = book.querySelector('p:nth-child(2)').textContent.toLowerCase(); // Mengambil pengarang
            const year = book.querySelector('p:nth-child(3)').textContent.toLowerCase(); // Mengambil tahun
            console.log(`Judul: ${title}, Pengarang: ${author}, Tahun: ${year}`); // Debug judul, pengarang, dan tahun

            if (title.includes(searchText) || author.includes(searchText) || year.includes(searchText)) {
                book.style.display = '';
            } else {
                book.style.display = 'none';
            }
        });
    });
    
});
