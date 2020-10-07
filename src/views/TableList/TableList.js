import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import "./TableList.css";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";

import RefreshIcon from "@material-ui/icons/Refresh";
import { forwardRef } from "react";
import { SnackbarProvider } from "notistack";
import {
  Users,
  DeleteUser,
} from "../NotistackIntegration/NotistackIntegration";

import { getDataSuccess } from "../../components/Redux/GetData/getDataAction";
import { connect } from "react-redux";
import { useConfirm } from "material-ui-confirm";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const api = axios.create({
  baseURL: `https://strapi-resources.herokuapp.com/profiles/`,
});

function validateEmail(email) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

const useStyles = makeStyles(styles);

function TableList({ getData, location, giveData, history }) {
  const tableRef = React.createRef();

  const confirm = useConfirm();

  React.useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        window.history.replaceState(null, "");
      }
    }
  }, []);
  const [value, setValue] = React.useState(0);
  const [deleteNotification, setDeleteNotification] = React.useState(false);
  const [assignedN, setAssignedN] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const classes = useStyles();

  var columns = [
    {
      title: "Picture",
      field: "picture",
      render: (rowData) => (
        <img
          src={
            rowData.avatarUrl
              ? rowData.avatarUrl
              : "https://firebasestorage.googleapis.com/v0/b/efiberdocs.appspot.com/o/images%2Fno-img.png?alt=media&token=f25f3626-d457-422a-9436-ad42c6dc4973"
          }
          style={{ width: 50, borderRadius: "50%" }}
        />
      ),
    },

    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Country", field: "country" },
    { title: "Phone", field: "phone" },
    { title: "DOB", field: "dateofbirth" },
  ];
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        setData(res.data);
        if (res.data) {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error");
      });
    setDeleteNotification(false);
  }, []);

  const handleDeleteRows = (event, rowData, resolve) => {
    confirm({
      description: `This will permanently delete the records. `,
    }).then(() => {
      setIsLoading(true);
      let _data = [...data];
      setDeleteNotification(true);

      rowData.forEach((rd) => {
        api
          .delete("/" + rd.id)

          .then((res) => {
            const dataDelete = [...data];
            const index = rowData.tableData.id;
            dataDelete.splice(index, 1);

            setData([...dataDelete]);

            //resolve();
          })
          .catch((error) => {
            setErrorMessages(["Delete failed! Server error"]);
            setIserror(true);
            // resolve();
          });

        _data = _data.filter((t) => t.tableData.id !== rd.tableData.id);
      });

      setData(_data);

      const count = rowData.length;
      setTimeout(() => {
        console.log(typeof rowData.length);
        setIsLoading(false);
      }, 1000 * count);
    });
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.first_name === "") {
      errorList.push("Please enter first name");
    }
    if (newData.last_name === "") {
      errorList.push("Please enter last name");
    }
    if (newData.email === "" || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email");
    }

    if (errorList.length < 1) {
      api
        .patch("/" + newData.id, newData)
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData.first_name === undefined) {
      errorList.push("Please enter first name");
    }
    if (newData.last_name === undefined) {
      errorList.push("Please enter last name");
    }
    if (newData.email === undefined || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email");
    }

    if (errorList.length < 1) {
      //no error
      api
        .post("/", newData)
        .then((res) => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch((error) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    window.history.replaceState(null, "");
    setDeleteNotification(true);

    api
      .delete("/" + oldData.id)

      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <SnackbarProvider preventDuplicate>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Users` Table</h4>
              <p className={classes.cardCategoryWhite}>
                Here is the list of the Users` Profile
              </p>
            </CardHeader>

            <div className="App">
              <>
                {" "}
                <Users name={location.state} />
                {(deleteNotification && <DeleteUser />) || " "}
              </>
            </div>

            <CardBody data-test="tableContent">
              <MaterialTable
                tableRef={tableRef}
                title="Profile"
                columns={columns}
                data={data}
                isLoading={isLoading}
                icons={tableIcons}
                editable={{
                  //   onRowUpdate: (newData, oldData) =>
                  //     new Promise((resolve) => {
                  //       handleRowUpdate(newData, oldData, resolve);
                  //     }),
                  //   onRowAdd: (newData) =>
                  //     new Promise((resolve) => {
                  //       handleRowAdd(newData, resolve);
                  //     }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      handleRowDelete(oldData, resolve);
                      {
                        console.log(oldData);
                      }
                    }),
                }}
                options={{
                  selection: true,
                  // loadingType: "linear",
                }}
                actions={[
                  {
                    tooltip: "Remove All Selected",
                    icon: () => <DeleteOutline />,
                    onClick: handleDeleteRows,
                  },
                  {
                    icon: () => <RefreshIcon />,
                    tooltip: "Refresh Data",
                    isFreeAction: true,
                    onClick: () => {
                      history.push("/admin/user");
                    },
                  },
                ]}
                // onSelectionChange={(rows) =>
                //   alert("You selected " + rows. + " rows")
                // }
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </SnackbarProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    giveData: state.data.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (data) => dispatch(getDataSuccess(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableList);
