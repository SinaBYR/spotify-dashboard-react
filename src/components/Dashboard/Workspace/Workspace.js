import classes from "./Workspace.module.css"
import { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import axios from 'axios';
import LikedSongs from "./LikedSongs/LikedSongs"
import Albums from "./Albums/Albums";
import Artists from "./Artists/Artists";

const Workspace = props => {
    const [loading, setLoading] = useState(false);
    const [likedSongsData, setLikedSongsData] = useState({
        songs: [],
        pages: {
            next: null,
            prev: null
        }
    });
    const [albumsData, setAlbumsData] = useState({
        albums: [],
        pages: {
            next: null,
            prev: null
        }
    });
    const [artistsData, setArtistsData] = useState({
        artists: [],
        pages: {
            next: null,
            prev: null
        }
    });

    const fetchLikedSongsHandler = (urlPath) => {
        setLoading(true);
        const url = urlPath || `https://api.spotify.com/v1/me/tracks?limit=50`;
        const config = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            headers: {
                "Authorization": "Bearer " + props.accessToken
            }
        };
        axios.get(url, config)
            .then(res => {
                setLikedSongsData({
                    songs: res.data.items,
                    pages: {
                        next: res.data.next || null,
                        prev: res.data.previous || null
                    }
                });
                setLoading(false);
                console.log(res.data);
                console.log('[Workspace]: Liked Songs Fetched');
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }
    const fetchSavedAlbumsHandler = (urlPath) => {
        setLoading(true);
        const url = urlPath || 'https://api.spotify.com/v1/me/albums?limit=50';
        const config = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            headers: {
                "Authorization": "Bearer " + props.accessToken
            }
        };
        axios.get(url, config)
            .then(res => {
                setAlbumsData({
                    albums: res.data.items,
                    pages: {
                        next: res.data.next || null,
                        prev: res.data.previous || null
                    }
                });
                setLoading(false);
                console.log(res.data);
                console.log('[Workspace]: Albums Fetched');
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }
    const fetchFollowedArtistsHandler = (urlPath) => {
        setLoading(true);
        const url = urlPath || 'https://api.spotify.com/v1/me/following?type=artist&limit=50';
        const config = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            headers: {
                "Authorization": "Bearer " + props.accessToken
            }
        };
        axios.get(url, config)
            .then(res => {
                setArtistsData({
                    artists: res.data.artists.items,
                    pages: {
                        next: res.data.artists.next || null,
                        prev: res.data.artists.previous || null
                    }
                });
                setLoading(false);
                console.log(res.data);
                console.log('[Workspace]: Followed Artists Fetched');
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }
    return (
        <div className={classes.Workspace}>
            {/* <h2>{'Liked Songs'}</h2> */}
            <div className={classes.Content}>
                <Switch>
                    <Route path="/dashboard/liked" render={() => <LikedSongs fetchSongs={fetchLikedSongsHandler} data={likedSongsData} loading={loading} />}/>
                    <Route path="/dashboard/albums" render={() => <Albums fetchAlbums={fetchSavedAlbumsHandler} data={albumsData} loading={loading}/>}/>
                    <Route path="/dashboard/artists" render={() => <Artists fetchArtists={fetchFollowedArtistsHandler} data={artistsData} loading={loading} />}/>
                    <Route path="/dashboard/recently" render={() => <h1>Recently Played</h1>}/>
                    <Route path="/dashboard/playlists" render={() => <h1>Playlists</h1>}/>
                    <Route path="/dashboard/new" render={() => <h1>New Releases</h1>}/>
                    {/* <Route render={() => <h1>SORRY COULDN'T FIND THAT PAGE 404</h1>}/> */}
                    {/* <Route render={() => <LikedSongs accessToken={props.accessToken} />}/> */}
                    <Redirect to="/"/>
                </Switch>
            </div>
        </div>
    )
}

export default Workspace;