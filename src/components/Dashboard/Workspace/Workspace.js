import classes from "./Workspace.module.css"
import { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import axios from 'axios';
import LikedSongs from "./LikedSongs/LikedSongs"
import Albums from "./Albums/Albums";
import Artists from "./Artists/Artists";
import Playlists from "./Playlists/Playlists";
import RecentlyPlayed from "./RecentlyPlayed/RecentlyPlayed";
import NewReleases from "./NewReleases/NewReleases";
import { useHistory } from "react-router-dom";

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
    const [playlistsData, setPlaylistsData] = useState({
        playlists: [],
        pages: {
            next: null,
            prev: null
        }
    });
    const [recentlyPlayedData, setRecentlyPlayedData] = useState({
        songs: []
    });
    const [newReleasesData, setNewReleasesData] = useState({
        albums: []
    });
    const [searchData, setSearchData] = useState({
        results: []
    })

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
    const fetchPlaylistsHandler = (urlPath) => {
        setLoading(true);
        const url = urlPath || 'https://api.spotify.com/v1/me/playlists?limit=50';
        const config = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            headers: {
                "Authorization": "Bearer " + props.accessToken
            }
        };
        axios.get(url, config)
            .then(res => {
                setPlaylistsData({
                    playlists: res.data.items,
                    pages: {
                        next: res.data.next || null,
                        prev: res.data.previous || null
                    }
                });
                setLoading(false);
                console.log(res.data);
                console.log('[Workspace]: Playlists Fetched');
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }
    const fetchRecentlyPlayedTracksHandler = (urlPath) => {
        
        setLoading(true);
        const url = urlPath || 'https://api.spotify.com/v1/me/player/recently-played?limit=50';
        const config = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            headers: {
                "Authorization": "Bearer " + props.accessToken
            }
        };
        axios.get(url, config)
            .then(res => {
                setRecentlyPlayedData({
                    songs: res.data.items
                });
                setLoading(false);
                console.log(res.data);
                console.log('[Workspace]: Recently Played Tracks Fetched');
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }
    const fetchNewReleasesHandler = (urlPath) => {
        
        setLoading(true);
        const url = urlPath || 'https://api.spotify.com/v1/browse/new-releases?limit=20';
        const config = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            headers: {
                "Authorization": "Bearer " + props.accessToken
            }
        };
        axios.get(url, config)
            .then(res => {
                setNewReleasesData({
                    albums: res.data.albums.items
                });
                setLoading(false);
                console.log(res.data);
                console.log('[Workspace]: New Releases Fetched');
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

                    <Route path="/dashboard/albums" render={() => <Albums fetchAlbums={fetchSavedAlbumsHandler} data={albumsData} loading={loading} accessToken={props.accessToken} />}/>

                    <Route path="/dashboard/artists" render={() => <Artists fetchArtists={fetchFollowedArtistsHandler} data={artistsData} loading={loading} />}/>

                    <Route path="/dashboard/playlists" render={() => <Playlists fetchPlaylists={fetchPlaylistsHandler} data={playlistsData} loading={loading} accessToken={props.accessToken} />}/>

                    <Route path="/dashboard/recently" render={() => <RecentlyPlayed fetchSongs={fetchRecentlyPlayedTracksHandler} data={recentlyPlayedData} loading={loading} />}/>

                    <Route path="/dashboard/new" render={() => <NewReleases fetchNewAlbums={fetchNewReleasesHandler} data={newReleasesData} loading={loading} accessToken={props.accessToken} />}/>

                    {/* <Route render={() => <h1>SORRY COULDN'T FIND THAT PAGE 404</h1>}/> */}
                    {/* <Route render={() => <LikedSongs accessToken={props.accessToken} />}/> */}
                    <Redirect to="/"/>
                </Switch>
            </div>
        </div>
    )
}

export default Workspace;