let fullBeerList = [];
displayBeer();

function displayBeer() {
    const url = `https://api.punkapi.com/v2/beers`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            fullBeerList = data;
            const beerHtml = data.map(generateBeerHtml).join('');
            document.getElementById('beerContainer').innerHTML = beerHtml;
        });
}

const generateBeerHtml = beer => `
  <section class="col">
    <div class="card">
        <img src="${beer.image_url}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${beer.name}</h5>
            <div class="card-text">
                <p>${beer.tagline}</p>
            </div>
        </div>
        <div class="card-footer">
          <a class="btn btn-dark btn-sm details-link" data-beer-id="${beer.id}">weitere Details</a>
        </div>
    </div>
  </section>
`;

document.addEventListener('click', event => {
    if (event.target.classList.contains('details-link')) {
        const beerId = event.target.getAttribute('data-beer-id');
        getBeerDetails(beerId);
    }
});

function getBeerDetails(beerID) {
    const beer = fullBeerList.find(b => b.id == beerID);
    const modalHtml = `
        <div class="modal fade" id="beerModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${beer.name}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row row-cols-2 g-4">
                            <div>
                                <img src="${beer.image_url}" class="img-fluid mb-3">
                                <div class="d-flex justify-content-center">
                                    <div class="px-2">
                                        <p><b>ingredients: malt</b></p>
                                        <ul>
                                           ${beer.ingredients.malt.map(m => `<li>${m.name}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div class="px-2">
                                        <p><b>ingredients: hops</b></p>
                                        <ul>
                                           ${beer.ingredients.hops.map(h => `<li>${h.name}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">#</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>first brewed</td>
                                        <td>${beer.first_brewed}</td>
                                    </tr>
                                    <tr>
                                        <td>Volume</td>
                                        <td>${beer.volume.value} ${beer.volume.unit}</td>
                                    </tr>
                                    <tr>
                                        <td>boil volume</td>
                                        <td>${beer.boil_volume.value} ${beer.boil_volume.unit}</td>
                                    </tr>
                                    <tr>
                                        <td>methods</td>
                                        <td>${beer.method.mash_temp[0].temp.value} ${beer.method.mash_temp[0].temp.unit}</td>
                                    </tr>
                                    <tr>
                                        <td>fermentation</td>
                                        <td>${beer.method.fermentation.temp.value} ${beer.method.fermentation.temp.unit}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <p><b>Food Pairing</b></p>
                                <ul>
                                    ${beer.food_pairing.map(fp => `<li>${fp}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        <p>
                        ${beer.brewers_tips}
                        </p>
                    </div>
                    <div class="modal-footer">
                        <p><small>${beer.contributed_by}</small></p>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`;


    document.getElementById('modalContainer').innerHTML = modalHtml;
    const modal = new bootstrap.Modal(document.getElementById('beerModal'));
    modal.show();
};



