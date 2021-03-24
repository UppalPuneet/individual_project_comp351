const URL = 'https://uppalpuneet.com/project/api/quotes';

const xhr = new XMLHttpRequest();

document.addEventListener('DOMContentLoaded', showQuotes);

const form = document.getElementById('myForm');
const show = document.getElementById('display_quotes');

form.addEventListener('submit', addQuote);

function addQuote(e) {
  let quoteInput = document.getElementById('quote');
  let authorInput = document.getElementById('author');

  let quoteValue = quoteInput.value;
  let authorValue = authorInput.value;

  if (quoteValue === '' || authorValue === '') {
    alert('Please input all the fields');
  } else {
    const data = { quoteValue, authorValue };

    xhr.open('POST', URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (this.status == 200) {
        showQuotes();
      } else {
        console.log('No');
      }
    };

    xhr.send(JSON.stringify(data));

    quoteInput.value = '';
    authorValue.value = '';
  }

  e.stopPropagation();
}

function showQuotes() {
  clearQuotes();
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
                    <div class="row">
                        <label for="quote_${response.data[i].id}" class="col-sm-2 col-form-label">Quote</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="quote_${response.data[i].id}" id="quote_${response.data[i].id}" value="${response.data[i].quote}">
                        </div>

                        <label for="author_${response.data[i].id}" class="col-sm-2 col-form-label mt-3">Author</label>
                        <div class="col-sm-10 mt-3">
                            <input type="text" class="form-control" name="author_${response.data[i].id}" id="author_${response.data[i].id}" value="${response.data[i].quote_author}">
                        </div>
                        <div class="col mt-3">
                            <button id="${response.data[i].id}" class="btn btn-primary btn-lg update" onClick="reply_click(this, event)" data-id="${response.data[i].id}" role="button">Update</button>
                            <button href="#!" id="${response.data[i].id}" class="btn btn-danger btn-lg mx-3 delete" onClick="reply_click(this, event)" data-id="${response.data[i].id}" role="button">Delete</button>
                        </div>
                    </div>
                </div>
            </div>`;
      }

      div.innerHTML = output;
      show.appendChild(div);
    }
  };

  xhr.send();
}

function reply_click(btn, e) {
  if (btn.classList.contains('update')) {
    e.preventDefault();

    const id = btn.dataset.id;
    const quote = document.getElementById(`quote_${id}`).value;
    const author = document.getElementById(`author_${id}`).value;

    const data = { quote, author };

    xhr.open('PUT', `${URL}/${id}`, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function () {
      const response = JSON.parse(xhr.responseText);
      if (xhr.readyState == 4 && xhr.status == '200') {
        alert(response.msg);
        showQuotes();
      } else {
        alert(response.msg);
      }
    };
    xhr.send(JSON.stringify(data));
  } else if (btn.classList.contains('delete')) {
    e.preventDefault();

    if (confirm('Are you sure?')) {
      const id = btn.dataset.id;
      xhr.open('DELETE', `${URL}/${id}`, true);
      xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == '200') {
          alert(response.msg);
          showQuotes();
        } else {
          alert(response.msg);
        }
      };
      xhr.send(null);
    }
  }

  // e.preventDefault();
}

function clearQuotes() {
  show.innerHTML = '';
}