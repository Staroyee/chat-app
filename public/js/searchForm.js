const search = document.querySelector('#searchForm');

async function searchHandler(event) {
    event.preventDefault();

    const searchFormData = new FormData(search);
    const searchTerm = searchFormData.get('searchTerm');
    
    document.location.replace(`/search/${searchTerm}`)
}

search.addEventListener('submit', searchHandler);
