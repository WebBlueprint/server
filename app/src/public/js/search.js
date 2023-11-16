function performSearch() {
    const query = document.getElementById('searchInput').value;
    fetch(`/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        });
}

function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';
    results.forEach(result => {
        const div = document.createElement('div');
        div.textContent = result.name;
        resultsContainer.appendChild(div);
    });
}
