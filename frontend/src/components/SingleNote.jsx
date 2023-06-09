import React from 'react'
import { Card, CardActions, CardContent, Typography, Button, ButtonBase, CardMedia } from '@mui/material';
import { likePost, deletePost } from '../actions/notes';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useNavigate } from 'react-router-dom'
import moment from 'moment';

const classes = {
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
}

const Note = ({post, setCurrentId} ) => {
  // console.log({ post, setCurrentId })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  // const userId = user?.result.googleId || user?.result?._id;

  const openPost = (e) => {
    navigate(`/posts/${post._id}`);
  };


  return (
    <Card sx={{padding:'1rem'}}>
      <ButtonBase
        component="span"
        name="test"
        onClick={openPost}
        className={classes.cardAction}
      >
        <CardMedia  image={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post?.title} />

        <div>
          <Typography variant="h6">{post?.name}</Typography>
          <Typography variant="body2">{moment(post?.createdAt).fromNow()}</Typography>
        </div>

        <div >
          <Typography variant="body2" color="textSecondary" component="h2">{post?.tags.map((tag) => `#${tag} `)}</Typography>
        </div>

        <Typography  gutterBottom variant="h5" component="h2">Title : {post?.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post?.message}</Typography>
        </CardContent>
      </ButtonBase>
        <CardActions style={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpOffAltIcon fontSize="small" /> Like {post?.likes?.length} </Button>
          {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
            <div>
          <Button size="small" color="primary" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="small" /> Update </Button>
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /></Button>
          </div>
           )}
        </CardActions>
     
    </Card>
  )
}

export default Note
