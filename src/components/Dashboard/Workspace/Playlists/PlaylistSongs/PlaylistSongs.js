import React from "react";
import classes from "./PlaylistSongs.module.css";
import { useEffect, useState } from "react";
import Song from "../../LikedSongs/Song/Song";
import SongSkeleton from "../../../../UI/Skeletons/SongSkeleton/SongSkeleton";

const PlaylistSongs = props => {


    console.log(props);
    useEffect(() => {
        // return source.cancel('[App]: Fetching Canceled');
        // return source.cancel('[PlaylistSongs]: Fetching Songs Cancelled');
        props.fetchSongs(props.match.params.playlistID);
    }, [])
    let playlistSongs = (
        <React.Fragment>
            <SongSkeleton />
            <SongSkeleton />
            <SongSkeleton />
        </React.Fragment>
    )
    if(!props.loading && props.data.songs.length) {
        playlistSongs = props.data.songs.map((song, index) => {
            let artists = song.track.artists.map(artist => {
                return artist.name;
            })
            .join(', ');

            return <Song trackName={song.track.name} cover={song.track.album.images[0]} artists={artists} key={index}/>
        })
    }
    return (
        <div className={classes.PlaylistSongs}>
            <h2 style={{textAlign: 'left'}}>{props.match.params.playlistName}</h2>
            {playlistSongs}
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

export default PlaylistSongs;