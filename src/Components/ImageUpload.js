// imports the React Javascript Library
import React from "react";
//Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";

import red from "@material-ui/core/colors/red";
import SearchIcon from "@material-ui/icons/Search";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

// Search
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

//Tabs
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800],
    },
  },
  cardHeader: {
    textalign: "center",
    align: "center",
    backgroundColor: "white",
  },
  input: {
    display: "none",
  },
  title: {
    color: "rgb(41,98,117)",
    fontWeight: "bold",
    fontFamily: "Montserrat",
    align: "center",
  },
  button: {
    color: "rgb(41,98,117)",
    margin: 10,
  },
  secondaryButton: {
    color: "gray",
    margin: 10,
  },
  typography: {
    margin: theme.spacing.unit * 2,
    backgroundColor: "default",
  },

  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  searchIconButton: {
    padding: 10,
  },
  searchDivider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

class ImageUploadCard extends React.Component {
  handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.props.setImageState({ ...this.props.imageState, selectedFile: [reader.result] });
    }.bind(this);

    this.props.setImageState({ ...this.props.imageState, mainState: "uploaded", selectedFile: event.target.files[0], imageUploaded: 1 });
    this.props.getTheImage(event.target.files[0]);
  };

  handleSearchClick = (event) => {
    this.props.setImageState({ ...this.props.imageState, mainState: "search" });
  };

  renderInitialState() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CardContent>
          <Grid container justify="center" alignItems="center">
            <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file" onChange={this.handleUploadClick} />
            <label htmlFor="contained-button-file">
              <Fab component="span" className={classes.button}>
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
            <Fab className={classes.button} onClick={this.handleSearchClick}>
              <SearchIcon />
            </Fab>
          </Grid>
        </CardContent>
      </React.Fragment>
    );
  }

  handleSearchURL = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.props.setImageState({ ...this.props.imageState, selectedFile: [reader.result] });
    }.bind(this);

    this.props.setImageState({ ...this.props.imageState, selectedFile: event.target.files[0], imageUploaded: 1 });
  };

  handleImageSearch(url) {
    var filename = url.substring(url.lastIndexOf("/") + 1);
    this.props.setImageState({ ...this.props.imageState, mainState: "uploaded", imageUploaded: true, selectedFile: url, fileReader: undefined, filename: filename });

    this.props.getTheImage(url);
  }

  handleSeachClose = (event) => {
    this.props.setImageState({ ...this.props.imageState, mainState: "initial" });
  };

  renderSearchState() {
    const { classes } = this.props;

    return (
      <Paper className={classes.searchRoot} elevation={1}>
        <InputBase
          className={classes.searchInput}
          placeholder="Image URL"
          value={this.props.imageState.searchURL}
          onChange={(e) => {
            this.props.setImageState({ ...this.props.imageState, searchURL: e.target.value });
          }}
        />
        <IconButton className={classes.button} aria-label="Search" disabled={this.props.imageState.searchURL === ""} onClick={() => this.handleImageSearch(this.props.imageState.searchURL)}>
          <SearchIcon />
        </IconButton>
        <Divider className={classes.searchDivider} />
        <IconButton color="primary" className={classes.secondaryButton} aria-label="Close" onClick={this.handleSeachClose}>
          <CloseIcon />
        </IconButton>
      </Paper>
    );
  }

  handleAvatarClick(value) {
    var filename = value.url.substring(value.url.lastIndexOf("/") + 1);
    this.props.setImageState({ ...this.props.imageState, mainState: "uploaded", imageUploaded: true, selectedFile: value.url, fileReader: undefined, filename: filename });
  }

  renderUploadedState() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CardActionArea onClick={this.imageResetHandler}>
          <img width="100%" className={classes.media} src={this.props.imageState.selectedFile} alt="broken" />
        </CardActionArea>
      </React.Fragment>
    );
  }

  imageResetHandler = (event) => {
    this.props.setImageState({ ...this.props.imageState, mainState: "initial", selectedFile: null, imageUploaded: 0 });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Card className={this.props.cardName}>
            {(this.props.imageState.mainState === "initial" && this.renderInitialState()) ||
              (this.props.imageState.mainState === "search" && this.renderSearchState()) ||
              (this.props.imageState.mainState === "uploaded" && this.renderUploadedState())}
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);
