import classes from "./LikedSongs.module.css";
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { useEffect, useState } from "react";
import SongSkeleton from "../../../UI/Skeletons/SongSkeleton/SongSkeleton";
import axios from "axios";
import React from "react";

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
        </React.Fragment>
    )

    console.log('hi')
    if(!props.loading && props.data.songs.length){
        displayedSongs = props.data.songs.map((song, index) => {
            let artists = song.track.artists.map(artist => {
                return artist.name;
            })
            .join(', ');

            return (
                <div className={classes.Song} key={song.track.name + index}>
                    <div className={classes.Cover}>
                        <img src={song.track.album.images[0].url} alt="cover"/>
                    </div>
                    <div className={classes.Info}>
                        <div className={classes.Title}>{song.track.name}</div>
                        <div className={classes.Artist}>{artists}</div>
                    </div>
                    <div className={classes.Options}>
                        <BsThreeDotsVertical />
                    </div>
                </div>
            )
        })
    }
    let pageNavigationButtons;
    return (
        <div className={classes.LikedSongs}>
            {displayedSongs}
            <div className={classes.PageNavigation}>
                {props.data.pages.prev
                ? <div className={classes.Prev} onClick={() => props.fetchSongs(props.data.pages.prev)}>Prev</div>
                : null}
                {props.data.pages.next
                ? <div className={classes.Next} onClick={() => props.fetchSongs(props.data.pages.next)}>Next</div>
                : null}
            </div>
        </div>
    )
}

export default LikedSongs;