const URL = 'http://localhost:3000/api/quotes';

function showQuotes() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', URL, true);

  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);

      let output = '';
      const div = document.createElement('div');
      div.className = 'list-group';
      for (let i = 0; i < response.data.length; i++) {
        output += `
            <div class="list-group-item-action card border-secondary mb-3">
                <div class="card-body">
                    <p class="card-text">
                    <blockquote class="blockquote">
                        <p class="mb-0">"${response.data[i].quote}"</p>
                        <footer class="blockquote-footer">${response.data[i].quote_author}</footer>
                    </blockquote>
                    </p>
                </div>
            </div>`;
      }

      div.innerHTML = output;
      const show = document.getElementById('display_quotes');
      show.appendChild(div);
    }
  };

  xhr.send();
}

showQuotes();