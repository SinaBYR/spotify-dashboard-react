import React, { useState } from "react";
import classes from "./Albums.module.css"
import { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { BsThreeDotsVertical, BsFillXSquareFill } from 'react-icons/bs';
import axios from 'axios';
import AlbumSkeleton from "../../../UI/Skeletons/AlbumSkeleton/AlbumSkeleton";
import AlbumSongs from "./AlbumSongs/AlbumSongs";

const Albums = props => {

    const [loading, setLoading] = useState(false);
    const [songsData, setSongsData] = useState({
        songs: [],
        pages: {
            next: null,
            prev: null
        }
    });

    const fetchAlbumSongsHandler = (albumID, urlPath) => {
        setLoading(true);
        
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const url = urlPath || ('https://api.spotify.com/v1/albums/' + albumID);
        const config = {
            cancelToken: source.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
            headers: {
                "Authorization": "Bearer " + props.accessToken
            }
        };
        axios.get(url, config)
            .then(res => {
                console.log(res.data);
                setSongsData({
                    songs: res.data.tracks.items,
                    cover: res.data.images[0].url,
                    pages: {
                        next: res.data.next || null,
                        prev: res.data.previous || null,
                    }
                })
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }

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
                <Link to={"/dashboard/albums/" + album.album.id} key={index + album.album.name}>
                    <div className={classes.Album}>
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
                </Link>
            )
        })
    }
    return (
        <div className={classes.Albums}>
            <Switch>
                <Route
                    path="/dashboard/albums/:albumID"
                    render={(props) => <AlbumSongs fetchSongs={fetchAlbumSongsHandler} data={songsData} {...props} loading={loading} />}/>
                <Route>
                    {displayedAlbums}
                    <div className={classes.PageNavigation}>
                        {props.data.pages.prev
                        ? <div className={classes.Prev} onClick={() => props.fetchAlbums(props.data.pages.prev)}>Prev</div>
                        : null}
                        {props.data.pages.next
                        ? <div className={classes.Next} onClick={() => props.fetchAlbums(props.data.pages.next)}>Next</div>
                        : null}
                    </div>
                </Route>
            </Switch>

        </div>
    )
}

export default Albums;