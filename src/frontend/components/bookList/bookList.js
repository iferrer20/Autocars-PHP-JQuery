
class BookList {
    async getBooks() {
        let { items } = await req("GET","https://www.googleapis.com/books/v1/volumes?q=search+terms");
        for (let i=0; i<items.length; i++) {
            let book = items[i];
            let image = book.volumeInfo.imageLinks.smallThumbnail;
            let preview_link = book.volumeInfo.previewLink;
            this.list.append(`<a href="${preview_link}"><div class="book-list-el" style="background-image: url('${image}')"></div></a>`)
        }
    }
    constructor() {
        this.list = this.obj.find(".book-list");
        this.getBooks();
    }
}