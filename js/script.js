function searchMovies() {
    $.ajax({
        url      : 'http://omdbapi.com',
        type     : 'get',
        dataType : 'json',
        data: {
            'apikey' : '9b90f353',
            's'      : $('#search-input').val()
        },
        success  : function(result) {
            $('#movie-list').html(``);
            
            if (result.Response == "True") {
                let movies = result.Search;
                
                $.each(movies, function(i, data) {
                    let dataPoster = data.Poster === "N/A" ? "" : '<img src="' + data.Poster + '" class="card-img-top" alt="...">';
                    
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                ` + dataPoster + `
                                <div class="card-body">
                                    <h5 class="card-title">` + data.Title + `</h5>
                                    <h5 class="card-subtitle mb-2 text-muted">` + data.Year + `</h5>
                                    <!--
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-primary see-detail-1" data-toggle="modal" data-target="#exampleModal" data-id="' + data.imdbID + '">See Detail</a>
                                    -->
                                    <a href="#" class="card-link see-detail-2" data-toggle="modal" data-target="#exampleModal" data-id="` + data.imdbID + `">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            }
            else {
                $('#movie-list').html(`
                    <div class="col">
                        <h3 class="text-center">` + result.Error + `</h3>
                    </div>
                `);
            }
        }
    });
}

function movieDetail(imdbID) {
    $.ajax({
        url      : 'http://omdbapi.com',
        type     : 'get',
        dataType : 'json',
        data     : {
            'apikey' : '9b90f353',
            'i'      : imdbID // $(this).data('id')
        },
        success  : function(result) {
            if (result.Response == "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="` + result.Poster + `" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h4>` + result.Title + `</h4></li>
                                    <li class="list-group-item">Release: ` + result.Released + `</li>
                                    <li class="list-group-item">Genre: ` + result.Genre + `</li>
                                    <li class="list-group-item">Director: ` + result.Director + `</li>
                                    <li class="list-group-item">Actors: ` + result.Actors + `</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
            else {
                $('#movie-list').html(`
                    <div class="col">
                        <h3 class="text-center">` + result.Error + `</h3>
                    </div>
                `);
            }
        }
    });
}

$('#search-button').on('click', function() {
    $('#movie-list').html(`
        <h4 class="text-center">Loading...</h4>
    `);
    
    searchMovies();
});

$('#search-input').on('keyup', function(event) {
    if (event.keyCode  === 13) {
        $('#movie-list').html(`
            <h4 class="text-center">Loading...</h4>
        `);
    
        searchMovies();
    }
});

$('#movie-list').on('click', '.see-detail-2', function() {
    // var imdbID = $(this).data('id');
    // console.log(imdbID);
    
    $('.modal-body').html(`
        <h4 class="text-center">Loading...</h4>
    `);
    
    movieDetail($(this).data('id'));
});
