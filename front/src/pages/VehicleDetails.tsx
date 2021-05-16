import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import moment from "moment";
import "moment/locale/ru";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    flexGrow: 1,
  },
  tabStyle: {
    textTransform: "none",
  },
}));

const ProgressIcon = ({ value }: any) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={value} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};

const TABS = ["Текущее состояние", "О машине", "История ошибок"];

export const VehicleDetails = () => {
  const classes = useStyles();
  const location = useLocation();
  const vehicle = (location as any).state.detail;
  const [tabNum, setTabNum] = useState(1);

  const handleChange = (event: any, newValue: any) => setTabNum(newValue);

  const getRow = (
    key: number,
    name: string,
    value: string,
    component?: any
  ) => {
    return (
      <React.Fragment key={key}>
        <ListItem>
          <ListItemText primary={`${name}: `} />
          {component ? (
            component
          ) : (
            <Typography gutterBottom variant="button">
              {value}
            </Typography>
          )}
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    );
  };

  const getGeneralInfoList = ({
    mark,
    model,
    vin_code,
    production_year,
    engine_volume,
    transmission,
    drive_unit,
    engine_type,
    imei_code,
  }: {
    drive_unit: "full" | "front" | "back";
    [key: string]: any;
  }) => {
    const list = [];

    const driveUnit = { full: "Полный", front: "Передний", back: "Задний" };

    list.push(getRow(1, "Марка", mark));
    list.push(getRow(2, "Модель", model));
    list.push(getRow(3, "VIN код", vin_code));
    list.push(
      getRow(
        4,
        "Дата выпуска",
        moment(production_year).locale("ru ").format("LLL")
      )
    );
    list.push(getRow(5, "Объем двигателя", `${engine_volume} л.`));
    list.push(
      getRow(
        6,
        "Коробка передач",
        transmission === "auto" ? "Автоматическая" : "Механическая"
      )
    );
    list.push(getRow(7, "Привод", driveUnit[drive_unit]));
    list.push(getRow(8, "Тип двигателя", engine_type));
    list.push(getRow(9, "IMEA код модема", imei_code));

    return list;
  };

  const getCurrentStateList = ({
    engine_state,
    mileage,
    remaining_fuel,
    battery_voltage,
    engine_volume,
    transmission,
    drive_unit,
    engine_type,
    imei_code,
  }: any) => {
    const list = [];

    list.push(getRow(1, "Зажигание", engine_state === "on" ? "Вкл." : "Выкл"));
    list.push(getRow(2, "Пробег", `${mileage} тыс. км.`));
    list.push(
      getRow(
        3,
        "Топливо",
        remaining_fuel,
        <ProgressIcon value={remaining_fuel} />
      )
    );
    list.push(getRow(4, "Аккумулятор", `${battery_voltage} В`));

    return list;
  };

  const getTabs = () => {
    return TABS.map((name) => (
      <Tab
        className={classes.tabStyle}
        label={<Typography variant="body1">{name}</Typography>}
      />
    ));
  };

  return (
    <React.Fragment>
      <Paper className={classes.tabsRoot}>
        <Tabs
          value={tabNum}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {getTabs()}
        </Tabs>
      </Paper>

      {tabNum === 0 && (
        <List className={classes.root}>{getCurrentStateList(vehicle)}</List>
      )}
      {tabNum === 1 && (
        <List className={classes.root}>{getGeneralInfoList(vehicle)}</List>
      )}
    </React.Fragment>
  );
};
