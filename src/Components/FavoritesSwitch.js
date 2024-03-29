import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function FavoritesSwitch() {
  const [favorites, setFavorites] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setFavorites(history.location.pathname.startsWith("/favorites"));
  }, [history]);

  const handleChange = (event) => {
    setFavorites(event.target.checked);
    favorites ? history.replace("/shop") : history.replace("/favorites");
  };

  return (
    <FormGroup className="favorites-switch">
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>All</Grid>
          <Grid item>
            <AntSwitch checked={favorites} onChange={handleChange} name="checkedC" />
          </Grid>
          <Grid item>Favorites</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
}
