import classes from "./ProfileSkeleton.module.css";

const ProfileSkeleton = () => {
    return (
        <div className={classes.Panel}>
            <div className={classes.Content}>
                <div className={classes.Head}>
                    <div className={classes.Image}></div>
                    <div className={classes.Username}></div>
                </div>
                <div className={classes.Main}>

                    <div className={classes.Item}>
                        <p></p>
                        <div></div>
                    </div>

                    <div className={classes.Item}>
                        <p></p>
                        <div></div>
                    </div>

                    <div className={classes.Item}>
                        <p></p>
                        <div></div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfileSkeleton;