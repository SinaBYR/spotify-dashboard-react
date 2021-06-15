import React, { useState } from 'react';
import classes from './Playlists.module.css';
import { useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import PlaylistSongs from './PlaylistSongs/PlaylistSongs';
import { AiFillPicture } from 'react-icons/ai';
import AlbumSkeleton from '../../../UI/Skeletons/AlbumSkeleton/AlbumSkeleton';

const Playlists = props => {
    console.log(props.accessToken);
    const [loading, setLoading] = useState(false);
    const [songsData, setSongsData] = useState({
        songs: [],
        pages: {
            next: null,
            prev: null
        }
    });

    const fetchPlaylistSongsHandler = (playlistID, urlPath) => {
        setLoading(true);
        
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const url = urlPath || ('https://api.spotify.com/v1/playlists/' + playlistID + '/tracks');
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
                    songs: res.data.items,
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
        if(props.data.playlists.length){
            return false;
        }

        props.fetchPlaylists();
    }, [])
    let displayedPlaylists = (
        <React.Fragment>
            <AlbumSkeleton />
            <AlbumSkeleton />
            <AlbumSkeleton />
        </React.Fragment>
    );
    if(!props.loading && props.data.playlists.length) {
        displayedPlaylists = props.data.playlists.map((playlist, index) => {
            return (
                <Link to={"/dashboard/playlists/" + playlist.id + "/" + playlist.name} key={Math.random()}>
                    <div className={classes.Playlist}>
                        <div className={classes.Cover}>
                            {playlist.images.length
                            ? <img src={playlist.images[0].url} alt="playlist"/>
                            : <div className={classes.Placeholder}><AiFillPicture fontSize="10rem" /></div>}
                        </div>
                        <div className={classes.Info}>
                            <div className={classes.Name}>{playlist.name}</div>
                            <div className={classes.Owner}>by {playlist.owner.display_name}</div>
                        </div>
                    </div>
                </Link>
            )
        })
    }
    return (
        <div className={classes.Playlists}>
            <Switch>
                <Route
                    path="/dashboard/playlists/:playlistID/:playlistName"
                    render={(props) => <PlaylistSongs fetchSongs={fetchPlaylistSongsHandler} data={songsData} loading={loading} {...props}/>}
                />
                <Route exact path="/dashboard/playlists">
                    {displayedPlaylists}
                    <div className={classes.PageNavigation} >
                        {props.data.pages.prev
                        ? <div className={classes.Prev} onClick={() => props.fetchPlaylists(props.data.pages.prev)}>Prev</div>
                        : null}
                        {props.data.pages.next
                        ? <div className={classes.Next} onClick={() => props.fetchPlaylists(props.data.pages.next)}>Next</div>
                        : null}
                    </div>
                </Route>

            </Switch>

        </div>
    )
}

export default Playlists;