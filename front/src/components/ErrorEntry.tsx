import React, { useState } from "react";
import {
  AccordionSummary,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import moment from "moment";
import "moment/min/locales";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import { instance } from "../helpers/axios_defaults";
import { useAppState } from "../helpers/use_app_state";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  notFixed: {
    backgroundColor: "#ef5350",
    color: "white",
  },
  fixed: {
    backgroundColor: "#9ccc65",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    marginRight: "auto",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    flex: "1 1 auto",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  actionButton: {
    margin: 10,
  },
  assignButton: {
    margin: 10,
  },
}));

export const ErrorEntry = ({
  description,
  dtc_code,
  occur_date_time,
  status,
  panel,
  handleChange,
  expanded,
}: any) => {
  const classes = useStyles();
  const [reasons, setReasons] = useState<any[]>([]);
  const [disabled, setDisabled] = useState(false);
  const { user } = useAppState();

  console.log("user.role ", user.role);

  const getReasons = () => {
    setDisabled(true);
    instance
      .get(`/vehicles/vehicle-errors/reasons/${dtc_code}`)
      .then((response) => {
        console.log(response.data);
        const { translatedText } = response.data.data.translations;
        const reasonsList = translatedText.split(";");
        console.log(reasonsList);
        setReasons(
          reasonsList.map(
            (value: string, index: number) =>
              `${++index}. ${value.charAt(0).toUpperCase()}${value.slice(1)}`
          )
        );
      })
      .catch(() => {
        setReasons(["Похожих совпадений не найдено"]);
      });
  };

  const renderReason = (value: any) => {
    return (
      <>
        <ListItem>
          <ListItemText primary={value} />
        </ListItem>
        <Divider variant="middle" component="li" />
      </>
    );
  };

  return (
    <Accordion
      expanded={expanded === panel}
      onChange={handleChange(panel)}
      key={panel}
    >
      <AccordionSummary
        className={classes.root}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={classes.heading}>{dtc_code}</Typography>
        <Chip
          label={status === "fixed" ? "Исправлено" : "В работе"}
          className={status === "fixed" ? classes.fixed : classes.notFixed}
        />
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.details}>
          <List>
            <ListItem>
              <ListItemText primary="Дата возник." />
              <Typography gutterBottom variant="caption">
                {moment(occur_date_time).format("LLLL")}
              </Typography>
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem>
              <Typography variant="body1">{description}</Typography>
            </ListItem>

            <Divider variant="middle" component="li" />
            {reasons?.length !== 0 && (
              <Box paddingTop="20px">
                <Typography variant="body1">Возможные причины</Typography>
                <div className={classes.demo}>
                  <List dense>{reasons?.map(renderReason)}</List>
                </div>
              </Box>
            )}
          </List>

          <Box display="flex">
            {reasons.length === 0 && (
              <Button
                size="small"
                variant="contained"
                color="primary"
                disabled={disabled}
                className={classes.actionButton}
                onClick={getReasons}
              >
                Возможные причины
              </Button>
            )}
          </Box>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
