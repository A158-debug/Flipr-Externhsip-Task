import React from 'react'
import { Card, CardActions, CardContent, Typography, Button, ButtonBase } from '@mui/material';
import { likePost, deletePost,getPost } from '../actions/notes';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useNavigate } from 'react-router-dom'
import moment from 'moment';

const classes = {
  media: {
    // height: 0,
    // paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // backgroundBlendMode: 'darken',
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

const ImageURL = 'https://images.unsplash.com/photo-1686226347032-b82efa11af93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60'

const Note = ({post, setCurrentId} ) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const openPost = (e) => {
    dispatch(getPost(post._id));
    navigate(`/posts/${post._id}`);
  }


  return (
    <Card sx={{padding:'0.5rem'}}>
      <ButtonBase
        component="span"
        name="test"
        onClick={openPost}
        style={classes.cardAction}
      >
        <img  src={post?.selectedFile || ImageURL} alt={post?.title} style={classes.media} />
  
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
