document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.querySelector('.input .core .input-book button.form');
    saveButton.addEventListener('click', function(event) {
        event.preventDefault(); // Mencegah form dari submit biasa

        // Membuat elemen .book
        const book = document.createElement('div');
        book.className = 'book';

        // Membuat elemen .text
        const text = document.createElement('div');
        text.className = 'text';
        const h4 = document.createElement('h4');
        h4.textContent = document.getElementById('input-book').value; // Judul buku
        const pAuthor = document.createElement('p');
        pAuthor.textContent = document.getElementById('input-author').value; // Pengarang
        const pYear = document.createElement('p');
        pYear.textContent = document.getElementById('input-year').value; // Tahun
        text.appendChild(h4);
        text.appendChild(pAuthor);
        text.appendChild(pYear);

        // Membuat elemen .btn
        const btn = document.createElement('div');
        btn.className = 'btn';
        const editButton = document.createElement('button');
        editButton.id = 'edit'; // Menambahkan id 'edit'
        editButton.innerHTML = '<i class="fa fa-pencil"></i>';
        const deleteButton = document.createElement('button');
        deleteButton.id = 'delete'; // Menambahkan id 'delete'
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        btn.appendChild(editButton);
        btn.appendChild(deleteButton);

        // Menambahkan event listener untuk tombol delete
        deleteButton.addEventListener('click', function() {
            if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
                book.remove(); // Menghapus elemen .book dari DOM
                alert("Buku telah dihapus.");
            }
        });

        // Menambahkan event listener untuk tombol edit
        editButton.addEventListener('click', function() {
            const newTitle = prompt("Edit Judul Buku:", h4.textContent);
            if (newTitle !== null) h4.textContent = newTitle;
            const newAuthor = prompt("Edit Pengarang Buku:", pAuthor.textContent);
            if (newAuthor !== null) pAuthor.textContent = newAuthor;
            const newYear = prompt("Edit Tahun Terbit:", pYear.textContent);
            if (newYear !== null) pYear.textContent = newYear;
        });

        // Menyusun elemen
        book.appendChild(text);
        book.appendChild(btn);

        // Menentukan target list berdasarkan status checkbox
        const isRead = document.getElementById('input-publisher').checked;
        const targetList = isRead ? document.querySelector('.output .after .list') : document.querySelector('.output .before .list');

        // Menambahkan ke dalam list yang sesuai
        targetList.appendChild(book);
    });

    const searchInput = document.querySelector('.nav .search input[type="search"]');

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
