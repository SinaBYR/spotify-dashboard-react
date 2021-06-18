import React, { useEffect } from 'react';
import classes from './AlbumSongs.module.css';
import Song from '../../LikedSongs/Song/Song';
import SongSkeleton from '../../../../UI/Skeletons/SongSkeleton/SongSkeleton';
import Error from '../../../../Errors/Error/Error';

const AlbumSongs = props => {

    console.log(props);
    useEffect(() => {
        props.fetchSongs(props.match.params.albumID);
    }, [])

    let albumSongs = (
        <React.Fragment>
            <SongSkeleton />
            <SongSkeleton />
            <SongSkeleton />
        </React.Fragment>
    );
    if(!props.loading && props.data.songs.length) {
        albumSongs = props.data.songs.map((song, index) => {
            let artists = song.artists.map(artist => {
                return artist.name;
            })
            .join(', ');

            return <Song trackName={song.name} cover={props.data.cover} artists={artists} key={index}/>
        })
    };
    return (
        props.error.errorPage === 'AlbumSongs'
        ? <Error data={props.error}/>
        : 
        <div>
            <h2 style={{textAlign: 'left'}}>{props.match.params.albumName}</h2>
            <div className={classes.AlbumSongs}>
                {albumSongs}
            </div>
            <div className={classes.PageNavigation} style={{display: props.data.pages.prev && props.data.pages.next ? 'flex' : 'none'}}>
                {props.data.pages.prev
                ? <div className={classes.Prev} onClick={() => props.fetchSongs(undefined, props.data.pages.prev)}>Prev</div>
                : null}
                {props.data.pages.next
                ? <div className={classes.Next} onClick={() => props.fetchSongs(undefined, props.data.pages.next)}>Next</div>
                : null}
            </div>
        </div>
    )
}

export default AlbumSongs;