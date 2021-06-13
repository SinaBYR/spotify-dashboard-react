import React, { useEffect } from 'react';
import classes from './AlbumSongs.module.css';
import Song from '../../LikedSongs/Song/Song';
import SongSkeleton from '../../../../UI/Skeletons/SongSkeleton/SongSkeleton';

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
        <div className={classes.AlbumSongs}>
            {/* <h2 style={{textAlign: 'left'}}>{props.match.params.playlistName}</h2> */}
            {albumSongs}
            <div className={classes.PageNavigation}>
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