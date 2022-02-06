$(document).ready(function () {
    $(document.body).on('click', '.multi-select-dropbox', function (e) {
        if ($(e.target).attr('class') == 'selected-items') {
            $(this).find('.chooser-panel').toggle();
        }
    });
    $(document.body).on('click', '.selected-items .item', function (e) {
        let removeId = $(e.target).attr('dataId');
        // console.log($(e.target).attr('dataId'));
        var select = $(e.target.parentElement).find('select');
        let options = $(select).find('option');
        for (let i = 0; i < options.length; i++) {
            // console.log($(options[i]).attr('value'), removeId);
            if ($(options[i]).attr('value') == removeId) {
                $(options[i]).remove();
                $(e.target).remove();
                // console.log(options.length)
            }
        }
    });
    $(document.body).on('click', '.found-items .item', function (e) {
        // console.log($(e.target).parent().parent().parent().parent().parent().parent())
        let dataID = $(e.target).attr('dataId');
        let data = $(e.target).text();
        let imageurl = $(e.target).find('img').attr('src');
        console.log(imageurl)
        let mainParent = $(e.target).parent().parent().parent().parent().parent().parent();
        let options = mainParent.find('select').find('option');
        // console.log(mainParent.find('select').html())
        let alreadyFound = false;
        for (let i = 0; i < options.length; i++) {
            if ($(options[i]).attr('value') == dataID) {
                alreadyFound = true;
                // console.log(options.length)
            }
        }
        if (alreadyFound == false) {
            // console.log('added')
            mainParent.find('.selected-items').append('<div class="item" dataId="' + dataID + '"><img style="width: 30px; height: 30px;border-radius: 50%;" src="'+imageurl+'">' + data + '</div>');
            mainParent.find('select').append('<option value="' + dataID + '" selected>' + data + '</option>');
        }
    });
    $('#appendSongs').on('change', function (event) {
        appendSongsToForm($(this).val());
    })
});

function appendSongsToForm(num) {
    let formSongsCount = document.querySelectorAll('.card').length;
    for (let i = 1; i <= num; i++) {
        var songData = `<div class="card">
<div class="card-header" id="headingOne">
    <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse"
            data-target="#collapse${formSongsCount + i}" aria-expanded="true" aria-controls="collapseOne">
           song number ${ formSongsCount + i}
        </button>
    </h2>
</div>

<div id="collapse${formSongsCount + i}" class="collapse" aria-labelledby="headingOne"
    data-parent="#accordionExample">
    <div class="card-body">
        <div class="form-group">
            <label for="album-name">song name</label>
            <input type="text" class="form-control" name="songName${formSongsCount + i}"  
                aria-describedby="emailHelp">
        </div>
        <div class="form-group multi-select-dropbox">
            <label for="singers">Singers</label>
            <div class="selected-items">
                <select style="display: none;" name="singers${formSongsCount + i}" 
                    multiple>
                </select>
            </div>
            <div class="chooser-panel">
                <div class="chooserList">
                    <div class="form-group">
                        <input type="text" class="form-control inputChooser ajaxRequester"  
                            placeholder="type name to get form server"
                            aria-describedby="emailHelp">
                            <div class="items">
                            <div class="found-items">
                            </div>

                            <div class="not-found">
                                <div class="message">Nothing found</div>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add artist Data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group multi-select-dropbox">
            <label for="music-director">Lyricists</label>
            <div class="selected-items">
                <select style="display: none;" name="lyricists${formSongsCount + i}" 
                    multiple>
                </select>
            </div>
            <div class="chooser-panel">
                <div class="chooserList">
                    <div class="form-group">
                        <input type="text" class="form-control inputChooser ajaxRequester"  
                            placeholder="type name to get form server"
                            aria-describedby="emailHelp">
                            <div class="items">
                            <div class="found-items">
                            </div>

                            <div class="not-found">
                                <div class="message">Nothing found</div>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add artist Data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group multiple-checkbox">
                                    <label for="slectionOfMood">Select song mood type</label>
                                    <div class="selected-items">
                                        <select name="moodNames${formSongsCount + i}" multiple>
                                        </select>
                                        <li>Aggressive</li>
                                        <li>Bitter</li>
                                        <li>Bittersweet</li>
                                        <li>Bleak</li>
                                        <li>Dreamy</li>
                                        <li>Driving</li>
                                        <li>Elegant</li>
                                        <li>Epic</li>
                                        <li>Erotic</li>
                                        <li>Exotic</li>
                                        <li>Fun</li>
                                        <li>Gentle</li>
                                        <li>Gloomy</li>
                                        <li>Graceful</li>
                                        <li>Grim</li>
                                        <li>Sad</li>
                                        <li>Love</li>
                                        <li>Motivate</li>
                                        <li>Scary</li>
                                        <li>Spicy</li>
                                    </div>
                                    <div class="total-items">
                                        <div class="grouper">
                                            <li>Aggressive</li>
                                            <li>Bitter</li>
                                            <li>Bittersweet</li>
                                            <li>Bleak</li>
                                            <li>Dreamy</li>
                                            <li>Driving</li>
                                            <li>Elegant</li>
                                            <li>Epic</li>
                                            <li>Erotic</li>
                                            <li>Exotic</li>
                                            <li>Fun</li>
                                            <li>Gentle</li>
                                            <li>Gloomy</li>
                                            <li>Graceful</li>
                                            <li>Grim</li>
                                            <li>Sad</li>
                                            <li>Love</li>
                                            <li>Motivate</li>
                                            <li>Scary</li>
                                            <li>Spicy</li>
                                        </div>
                                    </div>
                                </div>
        <div class="form-group">
            <label for="album-name">song URL</label>
            <input type="file" class="form-control" name="songURL${formSongsCount + i}"  
                aria-describedby="emailHelp">
        </div>
    </div>
</div>
</div>`;
        $('#accordionExample').append(songData)
    }
    $('#appendSongs').val(0)
}

$(document).ready(function () {
    $(document.body).on('keyup', '.ajaxRequester', function (e) {
        let value = $(e.target).val();
        $.post("/api/getSuggestion", { val: value }, function (data, status) {
            let htmlContent = "";
            if (data.status === true) {
                $(e.target).parent().find('.items').find('.not-found').css('display', 'none')
                data.result.forEach(ele => {
                    let imageurl = ele.imageURL=="default"?"/img/logo.jpg":"/artist-data/"+ele.imageURL;
                    htmlContent = htmlContent + `<div class="item" dataId="${ele.id}"><img src="${imageurl}" style="width: 30px; height: 30px;border-radius: 50%;">${ele.name}</div>`;
                });
            }
            else {
                $(e.target).parent().find('.items').find('.not-found').css('display', 'block');
            }
            $(e.target).parent().find('.items .found-items').html(htmlContent);
        });
    });
    $('#post-artist').on('click', e => {
        let artistName = $('#artist-name').val();
        let artistImage = $('#artist-image').prop('files')[0];
        let imageValue = $('#artist-image').val();
        let pattern = /.png$|.jpg$|.jpeg$/i;
        let fd = new FormData();
        $('#post-artist').prop('disabled',true);
        fd.append('imageURL', artistImage);
        fd.append('name', artistName);
        if (artistName !== '') {
            if(!imageValue==''||!imageValue==null||!imageValue==undefined){
                if(!pattern.test(imageValue)){
                 alert("invalid image format!")
                 return;
                }
            }
            $.ajax({
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    // xhr.upload.addEventListener("progress", function (evt) {
                    //     if (evt.lengthComputable) {
                    //         var percentComplete = evt.loaded / evt.total;
                    //         console.log(percentComplete);
                    //         $('.progress').css('display','block');
                    //         $('.progress .progress-bar').css('width',percentComplete* 100 + '%');

                    //         if (percentComplete === 1) {
                    //             $('.progress').css('display','none');
                    //         }
                    //     }
                    // }, false);
                    xhr.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            $('.progress').css('display', 'block');
                            $('.progress .progress-bar').css('width', percentComplete * 100 + '%');
                            if (percentComplete === 1) {
                                $('.progress').css('display', 'none');
                                $('.alert').addClass('alert-success');
                                $('.alert').text('Upload Successfull')
                            }
                        }
                    }, false);
                    return xhr;
                },
                url: '/api/storeArtistData',
                type: 'POST',
                data: fd,
                processData: false,
                contentType: false,
                cache: false,
                success: function (result) {
                    $('#post-artist').prop('disabled',false);
                },
                error: function () {
                    $('.progress').css('display', 'none');
                    $('.alert').addClass('alert-danger');
                    $('.alert').text('Failed ')
                    $('#post-artist').prop('disabled',false);
                }
            })
        }
    });
});

$(document).ready(function () {
    $(document).on('click', 'html', function (e) {
        if ($(e.target).prop('tagName') == 'HTML') {
            $('.grouper').css('display', 'none');
        }
    })
    $(document).on('click', '.selected-items', function (e) {
        $(e.target).parent().find('.total-items').find('.grouper').toggle();
    })
    $(document).on('click', '.selected-items li', function (e) {
        let source = e.target;
        let destini = $(source).parent().parent().find('.total-items').find('.grouper').find('li');
        let optionList = $(source).parent().find('option');
        optionList.each(function (index, ele) {
            if ($(source).text() == $(ele).val()) {
                $(ele).remove();
            }
        })
        destini.each(function (index, ele) {
            if ($(source).text() == $(this).text()) {
                $(source).css('display', 'none');
                $(ele).css('display', 'block');
            }
        })

    })
    $(document).on('click', '.grouper li', function (e) {
        let source = e.target;
        let destini = $(source).parent().parent().parent().find('.selected-items').find('li');
        let selectField = $(source).parent().parent().parent().find('.selected-items').find('select');
        selectField.append(`<option value="${$(source).text()}" selected>${$(source).text()}</option>`);
        destini.each(function (index, ele) {
            if ($(source).text() == $(this).text()) {
                $(source).css('display', 'none');
                $(ele).css('display', 'inline-block');
            }
        })
    });
})

$(document).ready(function () {
    $('.alert-container').on('click', 'div', function (e) {
        $(e.target).animate({ left: '100%', opacity: '1', 'z-index': '-100' });
        $(e.target).hide(100)
    });
    $(document.body).on('keyup', '#albumSelector', function (e) {
        let value = $(e.target).val();
        $.post("/api/getAlbumSuggestion", { val: value }, function (data, status) {
            let htmlContent = "";
            if (data.status === true) {
                $(e.target).parent().find('.items').find('.not-found').css('display', 'none')
                data.result.forEach(ele => {
                    htmlContent = htmlContent + `<div class="item" dataId="${ele.id}">${ele.name}</div>`;
                });
            }
            else {
                $(e.target).parent().find('.items').find('.not-found').css('display', 'block');
            }
            $(e.target).parent().find('.items .found-items').html(htmlContent);
        });
    });
})
const jsEvent = document.querySelectorAll('.alert-container div');
jsEvent.forEach(e => {
    e.addEventListener('animationend', function (event) {
        e.target.style.display = 'none';
    })
});
