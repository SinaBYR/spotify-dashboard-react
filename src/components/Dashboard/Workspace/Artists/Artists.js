import React from 'react';
import classes from './Artists.module.css';
import { useEffect } from 'react';
import ArtistSkeleton from '../../../UI/Skeletons/ArtistSkeleton/ArtistSkeleton';
import Error from '../../../Errors/Error/Error';

const Artists = props  => {
    useEffect(() => {
        if(props.data.artists.length){
            return false;
        }
        console.log(props.data.artists)
        props.fetchArtists();
    }, [])

    let displayedArtists = (
        <React.Fragment>
            <ArtistSkeleton />
            <ArtistSkeleton />
            <ArtistSkeleton />
        </React.Fragment>
    );
    if(!props.loading && props.data.artists.length) {
        displayedArtists = props.data.artists.map((artist, index) => {
            return (
                <div className={classes.Artist} key={index + artist.name}>
                    <div className={classes.Avatar}>
                        <img src={artist.images.length ? artist.images[0].url : null} alt="cover"/>
                    </div>
                    <div className={classes.Name}>{artist.name}</div>
                </div>
            )
        })
    }
    return (
        props.error.errorPage === 'Artists'
        ? <Error data={props.error} />
        :
        <React.Fragment>
            <div className={classes.Artists}>
                {displayedArtists}
            </div>
            <div className={classes.PageNavigation}>
                {props.data.pages.prev
                ? <div className={classes.Prev} onClick={() => props.fetchArtists(props.data.pages.prev)}>Prev</div>
                : null}
                {props.data.pages.next
                ? <div className={classes.Next} onClick={() => props.fetchArtists(props.data.pages.next)}>Next</div>
                : null}
            </div>
        </React.Fragment>
    )
}

export default Artists;