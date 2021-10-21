import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    Chip
} from '@material-ui/core'
// import MovieIcon from '@material-ui/icons/Movie';
import BookIcon from '@material-ui/icons/Book';
// import PersonIcon from '@material-ui/icons/Person';
import StarIcon from '@material-ui/icons/Star';
import CreateIcon from '@material-ui/icons/Create';


const ScoreCard = ({current}) => {


    return(
        <List className="scorecard">
            {/* score */}
            <ListItem>
                <ListItemAvatar>
                    <Avatar><StarIcon/></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Our score" secondary={current.score} className="rating"/>
            </ListItem>
            <Divider variant="inset" component="li"/>

            {/* actor */}
            <ListItem>
                <ListItemAvatar>
                    <Avatar><BookIcon/></Avatar>
                </ListItemAvatar>
                <div>
                    { current.actors.map((item,index)=>(
                        <Chip
                            key={`${index+item}`}
                            item={item}
                            label={item}
                            clickable
                            color="primary"
                            className="chip"
                        />
                    ))
                    }
                </div>
            </ListItem>
            <Divider variant="inset" component="li"/> 
            {/* director */}
            <ListItem>
                <ListItemAvatar>
                    <Avatar><CreateIcon/></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Author" secondary={current.director}/>
            </ListItem>
        </List>
    )
}


export default ScoreCard;