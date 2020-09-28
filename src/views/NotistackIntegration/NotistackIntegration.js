import React from "react";
import { useSnackbar } from "notistack";

//gcloud app logs tail -s default

export const Users = ({ name }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <>
      {(name &&
        enqueueSnackbar("User Created successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })) ||
        " "}
    </>
  );
};

export const DeleteUser = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <>
      {enqueueSnackbar("User Deleted successfully", {
        variant: "info",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      }) || " "}
    </>
  );
};
