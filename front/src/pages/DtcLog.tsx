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
import { ErrorEntry } from "../components/ErrorEntry";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 15,
  },
}));

export const DtcLog = ({ id }: { id: number }) => {
  const classes = useStyles();
  const [vehicleErrors, setVehicleErrors] = useState<any[]>();
  const [expanded, setExpanded] = React.useState<boolean | string>(false);

  useEffect(() => {
    instance.get(`/vehicles/vehicle-errors/${id}`).then((response) => {
      console.log(response.data);
      setVehicleErrors(response.data);
    });
  }, []);

  const handleChange = (panel: any) => (event: any, isExpanded: boolean) => {
    console.log(panel, isExpanded);
    setExpanded(isExpanded ? panel : false);
  };

  const renderError = ({ id, ...rest }: any) => {
    const key = `panel${id}`;
    return (
      <ErrorEntry
        panel={key}
        expanded={expanded}
        handleChange={handleChange}
        {...rest}
      />
    );
  };

  if (!vehicleErrors) {
    return <MySkeleton />;
  }

  return (
    <Container className={classes.root}>
      {vehicleErrors.map(renderError)}
    </Container>
  );
};
