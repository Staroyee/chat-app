const search = document.querySelector('#searchForm');

async function searchHandler(event) {
    event.preventDefault();

    const searchFormData = new FormData(search);
    const searchTerm = searchFormData.get('searchTerm');
    if (!searchTerm) {
        document.location.replace('/products')
    } else {
    document.location.replace(`/search/${searchTerm}`)
}
}

search.addEventListener('submit', searchHandler);
