import { v4 as uuid } from 'uuid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImageIcon from '@mui/icons-material/Image';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: 'transparent',
    boxShadow: 'none',
  }
}));

const products = [
  {
    id: uuid(),
    name: 'Arek',
  },
  {
    id: uuid(),
    name: 'Darek',
  },
  {
    id: uuid(),
    name: 'Marek',
  },
  {
    id: uuid(),
    name: 'Jarek',
  },

];

const Contacts = ({props}) => {

  const classes = useStyles();

  return (
    <>
      <List>
        {products.map((product, i) => (
          <ListItem
            divider={i < products.length - 1}
            key={product.id}
            className={classes.card}
          >
            <ListItemAvatar>
              <Avatar>
                <ImageIcon 
                style={{
                  height: 48,
                  width: 48
                }}/>
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={product.name}
            />

            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      </>  )
  };

export default Contacts;