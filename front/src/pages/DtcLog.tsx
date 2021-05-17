import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container } from "@material-ui/core";
import { instance } from "../helpers/axios_defaults";
import { MySkeleton } from "../components/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 15,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export const DtcLog = ({ id }: { id: number }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<boolean | string>(false);
  const [vehicleErrors, setVehicleErrors] = useState<any[]>();

  useEffect(() => {
    instance.get(`/vehicles/vehicle-errors/${id}`).then((response) => {
      console.log(response.data);
      // setVehicleErrors()
    });
  }, []);

  const handleChange = (panel: any) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderErrors = () => {
    return (
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>General settings</Typography>
          <Typography className={classes.secondaryHeading}>
            I am an accordion
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  };

  if (!vehicleErrors) {
    return <MySkeleton />;
  }

  return <Container className={classes.root}>{renderErrors()}</Container>;
};
