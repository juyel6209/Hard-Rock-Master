document.getElementById('searchButton').addEventListener('click', function(){
    let inputTitleName = document.getElementById('songTitle').value;
    fetch(`https://api.lyrics.ovh/suggest/${inputTitleName}`)
    .then(res => res.json())
    .then(data => displaySongNames(data))
    document.getElementById('songLyrics').style.display = 'none';
})

function displaySongNames(title){

    const lyricsName = document.getElementsByClassName('lyrics-name');
    const singerName = document.getElementsByClassName('singer-name');
    const lyricsFull = document.getElementsByClassName('full-lyrics');
    const songCover = document.getElementsByClassName('singerImage');
    document.getElementById('searchList').style.display = 'block';
    

    for (let i = 0; i < 10; i++) {
        console.log(title);
        const songTitleName = title.data[i].title;
        const displayTitleName = title.data[i].album.title;
        const artistName = title.data[i].artist.name;
        const titleCoverImage = title.data[i].album.cover;
        const songDurationSeconds = title.data[i].duration;
        let seconds = songDurationSeconds % 60;
        const minutes = (songDurationSeconds - seconds) / 60;
        if(seconds < 10){           
            seconds = '0'+seconds;
        }

        lyricsName[i].innerHTML = songTitleName;
        singerName[i].innerHTML = artistName;
        songCover[i].src = titleCoverImage;
        document.getElementById('songTitle').value = '';
        lyricsFull[i].addEventListener('click', function(){
            document.getElementById('songLyrics').style.display = 'block';
            document.getElementById('song-duration').innerHTML = `Song Duration - ${minutes} : ${seconds} Minutes`;
            document.getElementById('songDescription').innerHTML = `${songTitleName} --- ${displayTitleName}`;
            document.getElementById('singerFullName').innerHTML = `--- ${artistName}---`;
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitleName}`)
            .then(resp => resp.json())
            .then(json => {
                document.getElementById('lyricsHead').innerHTML = 'Song Lyrics';
                if(json.lyrics == undefined){
                    alert('Lyrics Not Found');
                    document.getElementById('songWithLyrics').innerHTML = 'Lyrics Not Found in These Site Please Try Another Song';
                    document.getElementById('songWithLyrics').style.color = 'red';

                    
                }
                else{
                    document.getElementById('songWithLyrics').innerHTML = json.lyrics;
                    document.getElementById('songWithLyrics').style.color = 'white';
                }
                
            })           
            .catch(error => {
                console.log(error);
            })
        })
        
    }

}

