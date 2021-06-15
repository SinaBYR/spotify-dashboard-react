import React from 'react';
import classes from './Artists.module.css';
import { useEffect } from 'react';
import { BsFillXSquareFill } from 'react-icons/bs';
import ArtistSkeleton from '../../../UI/Skeletons/ArtistSkeleton/ArtistSkeleton';

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
                    {/* {displayedArtists} */}
                    <div className={classes.Avatar}>
                        <img src={artist.images[0].url} alt="cover"/>
                    </div>
                    <div className={classes.Name}>{artist.name}</div>
                    {/* <div className={classes.Options}>
                        <BsFillXSquareFill />
                    </div> */}
                </div>
            )
        })
    }
    return (
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