import React, { Fragment } from "react";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
}));

const SkeletonItem = () => {
  const classes = useStyles();
  return (
    <div className={classes.skeleton}>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
    </div>
  );
};

export const MySkeleton = () => {
  return (
    <Fragment>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </Fragment>
  );
};
