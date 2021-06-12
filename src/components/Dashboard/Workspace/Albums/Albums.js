import React from "react";
import classes from "./Albums.module.css"
import { useEffect } from "react";
import { BsThreeDotsVertical, BsFillXSquareFill } from 'react-icons/bs';
import AlbumSkeleton from "../../../UI/Skeletons/AlbumSkeleton/AlbumSkeleton";

const Albums = props => {

    useEffect(() => {
        if(props.data.albums.length){
            return false;
        }
        props.fetchAlbums();
    }, [])

    let displayedAlbums = (
        <React.Fragment>
            <AlbumSkeleton />
            <AlbumSkeleton />
            <AlbumSkeleton />
        </React.Fragment>
    )
    if(!props.loading && props.data.albums.length) {
        displayedAlbums = props.data.albums.map((album, index) => {
            let artists = album.album.artists.map(artist => {
                return artist.name;
            })
            .join(', ');
            return (
                <div className={classes.Album} key={index + album.album.name}>
                    <div className={classes.Cover}>
                        <img src={album.album.images[0].url} alt="cover"/>
                    </div>
                    <div className={classes.Info}>
                        <div className={classes.Title}>{album.album.name}</div>
                        <div className={classes.Artist}>{artists}</div>
                        {/* <div className={classes.Date}>{new Date(album.album.release_date).getFullYear()}</div> */}
                    </div>
                    <div className={classes.Options}>
                        <BsFillXSquareFill />
                    </div>
                </div>
            )
        })
    }

    return (
        <div className={classes.Albums}>
            {displayedAlbums}
            <div className={classes.PageNavigation}>
                {props.data.pages.prev
                ? <div className={classes.Prev} onClick={() => props.fetchAlbums(props.data.pages.prev)}>Prev</div>
                : null}
                {props.data.pages.next
                ? <div className={classes.Next} onClick={() => props.fetchAlbums(props.data.pages.next)}>Next</div>
                : null}
            </div>
        </div>
    )
}

export default Albums;