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
    const [error, setError] = useState({
        errorPage: '',
        body: null,
        code: null
    });
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
        setError({
            errorPage: '',
            body: null,
            code: null
        })

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
                if(err.response) {
                    setError({
                        errorPage: 'LikedSongs',
                        code: err.response.data.error.status,
                        body: err.response.data.error.message
                    })
                } else {
                    setError({
                        errorPage: 'LikedSongs',
                        code: null,
                        body: 'Something went wrong, please try again.'
                    })
                }
                console.log(err);
                setLoading(false);
            });
    }
    const fetchSavedAlbumsHandler = (urlPath) => {
        setLoading(true);
        setError({
            errorPage: '',
            body: null,
            code: null
        })

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
                if(err.response) {
                    setError({
                        errorPage: 'Albums',
                        code: err.response.data.error.status,
                        body: err.response.data.error.message
                    })
                } else {
                    setError({
                        errorPage: 'Albums',
                        code: null,
                        body: 'Something went wrong, please try again.'
                    })
                }
                console.log(err);
                setLoading(false);
            });
    }
    const fetchFollowedArtistsHandler = (urlPath) => {

        setLoading(true);
        setError({
            errorPage: '',
            body: null,
            code: null
        })

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
                if(err.response) {
                    setError({
                        errorPage: 'Artists',
                        code: err.response.data.error.status,
                        body: err.response.data.error.message
                    })
                } else {
                    setError({
                        errorPage: 'Artists',
                        code: null,
                        body: 'Something went wrong, please try again.'
                    })
                }
                console.log(err);
                setLoading(false);
            });
    }

    const fetchPlaylistsHandler = (urlPath) => {
        setLoading(true);
        setError({
            errorPage: '',
            body: null,
            code: null
        })

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
                if(err.response) {
                    setError({
                        errorPage: 'Playlists',
                        code: err.response.data.error.status,
                        body: err.response.data.error.message
                    })
                } else {
                    setError({
                        errorPage: 'Playlists',
                        code: null,
                        body: 'Something went wrong, please try again.'
                    })
                }
                console.log({...err});

                setLoading(false);
            });
    }
    const fetchRecentlyPlayedTracksHandler = (urlPath) => {
        setLoading(true);
        setError({
            errorPage: '',
            body: null,
            code: null
        })

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
                if(err.response) {
                    setError({
                        errorPage: 'RecentlyPlayed',
                        code: err.response.data.error.status,
                        body: err.response.data.error.message
                    })
                } else {
                    setError({
                        errorPage: 'RecentlyPlayed',
                        code: null,
                        body: 'Something went wrong, please try again.'
                    })
                }
                setLoading(false);
            });
    }
    const fetchNewReleasesHandler = (urlPath) => {
        setLoading(true);
        setError({
            errorPage: '',
            body: null,
            code: null
        })

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
                if(err.response) {
                    setError({
                        errorPage: 'NewReleases',
                        code: err.response.data.error.status,
                        body: err.response.data.error.message
                    })
                } else {
                    setError({
                        errorPage: 'NewReleases',
                        code: null,
                        body: 'Something went wrong, please try again.'
                    })
                }
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <div className={classes.Workspace}>
            <div className={classes.Content}>
                <Switch>

                    <Route path="/dashboard/liked" render={() => <LikedSongs fetchSongs={fetchLikedSongsHandler} data={likedSongsData} loading={loading} error={error} />}/>

                    <Route path="/dashboard/albums" render={() => <Albums fetchAlbums={fetchSavedAlbumsHandler} data={albumsData} loading={loading} accessToken={props.accessToken} error={error} />}/>

                    <Route path="/dashboard/artists" render={() => <Artists fetchArtists={fetchFollowedArtistsHandler} data={artistsData} loading={loading} error={error} />}/>

                    <Route path="/dashboard/playlists" render={() => <Playlists fetchPlaylists={fetchPlaylistsHandler} data={playlistsData} loading={loading} accessToken={props.accessToken} error={error} />}/>

                    <Route path="/dashboard/recently" render={() => <RecentlyPlayed fetchSongs={fetchRecentlyPlayedTracksHandler} data={recentlyPlayedData} loading={loading} error={error} />}/>

                    <Route path="/dashboard/new" render={() => <NewReleases fetchNewAlbums={fetchNewReleasesHandler} data={newReleasesData} loading={loading} accessToken={props.accessToken} error={error} />}/>

                    <Redirect to="/dashboard/liked"/>

                </Switch>
            </div>
        </div>
    )
}

export default Workspace;