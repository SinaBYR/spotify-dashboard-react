import React from 'react';
import classes from './NewReleases.module.css';
import { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import AlbumSongs from '../Albums/AlbumSongs/AlbumSongs';
import AlbumSkeleton from '../../../UI/Skeletons/AlbumSkeleton/AlbumSkeleton';
import { BsFillXSquareFill } from 'react-icons/bs';

const NewReleases = props => {

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
        props.fetchNewAlbums();
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
            let artists = album.artists.map(artist => {
                return artist.name;
            })
            .join(', ');
            return (
                <Link to={"/dashboard/albums/" + album.id} key={index + album.name}>
                    <div className={classes.Album}>
                        <div className={classes.Cover}>
                            <img src={album.images[0].url} alt="cover"/>
                        </div>
                        <div className={classes.Info}>
                            <div className={classes.Title}>{album.name}</div>
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
        <div className={classes.NewReleases}>
            <Switch>
                <Route
                    path="/dashboard/new/:albumID"
                    render={(props) => <AlbumSongs fetchSongs={fetchAlbumSongsHandler} data={songsData} {...props} loading={loading} />}/>
                <Route path="/dashboard/new">
                    {displayedAlbums}
                </Route>
            </Switch>
        </div>
    )
}

export default NewReleases;