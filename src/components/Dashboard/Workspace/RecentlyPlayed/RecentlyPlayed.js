import React from 'react';
import classes from './RecentlyPlayed.module.css';
import { useEffect } from 'react';
import Song from '../LikedSongs/Song/Song';
import SongSkeleton from '../../../UI/Skeletons/SongSkeleton/SongSkeleton';
import Error from '../../../Errors/Error/Error';

const RecentlyPlayed = props => {

    useEffect(() => {
        if(props.data.songs.length){
            return false;
        }
        props.fetchSongs();
    }, [])
    let displayedSongs = (
        <React.Fragment>
            <SongSkeleton />
            <SongSkeleton />
            <SongSkeleton />
            <SongSkeleton />
        </React.Fragment>
    )

    if(!props.loading && props.data.songs.length){
        displayedSongs = props.data.songs.map((song, index) => {
            let artists = song.track.artists.map(artist => {
                return artist.name;
            })
            .join(', ');

            return (
                <Song
                    trackName={song.track.name}
                    cover={song.track.album.images.length ? song.track.album.images[0].url : null}
                    artists={artists}
                    key={index}/>
            )
        })
    }
    return (
        props.error.errorPage === 'RecentlyPlayed'
        ? <Error data={props.error} />
        :
        <div className={classes.RecentlyPlayed}>
            {displayedSongs}
        </div>
    )
}

export default RecentlyPlayed;