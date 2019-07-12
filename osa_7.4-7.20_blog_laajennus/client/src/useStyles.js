import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  appBar: {
    flexGrow: 1,
    paddingBottom: theme.spacing(2)
  },
  appBarTitle: {
    flexGrow: 1
  },
  divRoot: {
    margin: theme.spacing(1)
  },
  blogSummary: {
    justifyContent: 'space-between',
    paddingRight: theme.typography.pxToRem(15)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  likeButtonDiv: {
    display: 'flex'
  },
  likes: {
    marginRight: '1em',
    alignSelf: 'center'
  },
  deleteIcon: {
    marginLeft: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  }
}))
