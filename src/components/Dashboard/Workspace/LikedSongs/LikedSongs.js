import classes from "./LikedSongs.module.css";
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { useEffect, useState } from "react";
import SongSkeleton from "../../../UI/Skeletons/SongSkeleton/SongSkeleton";
import axios from "axios";
import React from "react";
import Song from "./Song/Song";

const LikedSongs = props => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);



    useEffect(() => {
        if(props.data.songs.length){
            return false;
        }
        props.fetchSongs();
    }, [])
    const lazyLoading = e => {
        console.log(e);
    }
    // console.log(songs);
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

            return <Song trackName={song.track.name} cover={song.track.album.images[0].url} artists={artists} key={index}/>
        })
    }
    return (
        <React.Fragment>
            <div className={classes.LikedSongs}>
                {displayedSongs}
            </div>
            <div className={classes.PageNavigation} style={{display: props.data.pages.prev && props.data.pages.next ? 'flex' : 'none'}}>
                {props.data.pages.prev
                ? <div className={classes.Prev} onClick={() => props.fetchSongs(props.data.pages.prev)}>Prev</div>
                : null}
                {props.data.pages.next
                ? <div className={classes.Next} onClick={() => props.fetchSongs(props.data.pages.next)}>Next</div>
                : null}
            </div>
        </React.Fragment>
    )
}

export default LikedSongs;