import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import DateFnsUtils from "@date-io/date-fns";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";

import MaskedInput from "react-text-mask";

//Formik Material UI
import MuiTextField from "@material-ui/core/TextField";
import {
  fieldToTextField,
  TextField,
  SimpleFileUpload,
} from "formik-material-ui";
import {
  TimePicker,
  DatePicker,
  DateTimePicker,
} from "formik-material-ui-pickers";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Formik, Form, Field } from "formik";
import "./UserProfile.css";

import MenuItem from "@material-ui/core/MenuItem";

import avatar from "assets/img/faces/marc.jpg";
import { CropLandscapeOutlined, EditLocationRounded } from "@material-ui/icons";
import { getDataSuccess } from "../../components/Redux/GetData/getDataAction";

import { fetchCountries } from "../../components/Redux/Country/CountriesAction";
import { postProfile } from "../../components/Redux/Profile/profileAction";
import { imageProfileSuccess } from "../../components/Redux/Images/imageAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import MuiPhoneNumber from "material-ui-phone-number";
import ReCAPTCHA from "react-google-recaptcha";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  input: {
    display: "none",
  },
};

// const phoneNumberMask = [
//   "(",
//   /[070|080|090|081]/,
//   /\d/,
//   /\d/,
//   ")",
//   " ",
//   /\d/,
//   /\d/,
//   /\d/,
//   "-",
//   /\d/,
//   /\d/,
//   /\d/,
//   /\d/,
//   /\d/,
// ];

const useStyles = makeStyles(styles);

function UserProfile({
  fetchcountry,
  country,
  postprofile,
  history,
  imageGetter,
  imageUrl,
  getData,
}) {
  useEffect(() => {
    fetchcountry();
  }, []);

  const [fileInputState, setFileInputState] = React.useState("");
  const [previewSource, setPreviewSource] = React.useState("");
  const [buttonShow, setButtonShow] = React.useState(false);

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      imageGetter(reader.result);
    };
  };

  const recaptcaHandler = (value) => {
    console.log("Captcha value:", value);
    setButtonShow(true);
  };

  // const [selectedDate, setSelectedDate] = React.useState(
  //   new Date("2014-08-18T21:11:54")
  // );
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };
  // const initialValues = {
  //   name: "",
  // };
  // const handleSubmit = (value) => {
  //   alert(JSON.stringify(value));
  // };

  let color = "#a23db7";

  const [phoneNumber, setPhone] = React.useState("");

  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          phone: phoneNumber,
          name: "",
          country: "",
          dateofbirth: new Date("1990-08-18"),
          //file: "",
          avatarUrl: "",
          // time: new Date(),
          //dateTime: new Date(),
          // toggle: [],
          // autocomplete: [],
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "😠 Invalid email address";
          }

          if (!values.name) {
            errors.name = "Required !";
          } else if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/i.test(values.name)) {
            errors.name =
              "😠 Must not be less than 2 characters, must include a Space and a Last Name";
          }

          if (!values.country) {
            errors.country = "Required !";
          }

          return errors;
        }}
        onSubmit={(
          { email, phone, country, dateofbirth, avatarUrl, name },
          { setSubmitting }
        ) => {
          setTimeout(() => {
            setSubmitting(false);
            alert("You are about to submit the records");
            postprofile({
              email,
              phone: phoneNumber,
              country,
              name,
              dateofbirth,
              avatarUrl: imageUrl,
            });

            imageGetter("");

            getData({
              email,
              phone: phoneNumber,
              country,
              name,
              dateofbirth,
              avatarUrl: imageUrl,
            });
            history.push("/admin/table", {
              email,
              phone: phoneNumber,
              country,
              name,
              dateofbirth,
              avatarUrl,
            });
          }, 3000);
        }}
      >
        {({
          submitForm,
          isSubmitting,
          touched,
          errors,
          handleChange,
          handleBlur,
        }) => (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Form>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                  <Card>
                    <CardHeader color="primary">
                      <h4 className={classes.cardTitleWhite}>Create Profile</h4>
                      <p className={classes.cardCategoryWhite}>
                        Complete your profile
                      </p>
                    </CardHeader>
                    <CardBody>
                      <br />
                      <CardAvatar profile className="cardAvatarProfiles">
                        {(previewSource && <img src={previewSource} />) || (
                          <img src="https://firebasestorage.googleapis.com/v0/b/efiberdocs.appspot.com/o/images%2Fno-img.png?alt=media&token=f25f3626-d457-422a-9436-ad42c6dc4973" />
                        )}
                      </CardAvatar>
                      <br />

                      <GridContainer>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          className="inputStyle"
                        >
                          {isSubmitting && <CircularProgress />}
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem></GridItem>
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <input
                            id="icon-button-file"
                            type="file"
                            accept="image/*"
                            className={classes.input}
                            onChange={handleInputChange}
                          />

                          <Field
                            //component={TextField}
                            name="file"
                            accept="image/*"
                            type="file"
                            className={classes.input}
                            onChange={handleInputChange}
                          />

                          <label htmlFor="icon-button-file">
                            <IconButton
                              style={{ color: color }}
                              aria-label="upload picture"
                              component="span"
                            >
                              <PhotoCamera />
                            </IconButton>
                          </label>

                          {/* // <Thumb file={values.file} /> */}
                        </GridItem>
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Field
                            component={TextField}
                            name="name"
                            type="text"
                            label="Full Name"
                            helperText="Please Enter your Fullname"
                            className="inputStyle"
                          />
                        </GridItem>
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Field
                            component={TextField}
                            name="email"
                            type="email"
                            label="Email"
                            helperText="Please Enter your Email"
                            className="inputStyle"
                          />
                        </GridItem>
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Field
                            component={MuiPhoneNumber}
                            label="Phone Number"
                            type="text"
                            name="phone"
                            defaultCountry={"ng"}
                            helperText="Please Enter your Phone Number"
                            className="inputStyle"
                            onChange={(phone) => {
                              setPhone(phone);
                            }}
                            value={phoneNumber}
                          />
                          {/* <Field
                            component={TextField}
                            name="phone"
                            type="text"
                            label="Phone"
                            helperText="Please Enter your Phone Number"
                            className="inputStyle"
                            render={({ field }) => (
                              <MaskedInput
                                {...field}
                                mask={phoneNumberMask}
                                id="phone"
                                placeholder="Enter your phone number"
                                type="text"
                                className={
                                  errors.phone && touched.phone
                                    ? "text-input error"
                                    : "text-input "
                                }
                              />
                            )}
                          /> */}
                          {errors.phone && touched.phone && (
                            <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-filled">
                              {errors.phone}
                            </p>
                          )}{" "}
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <Field
                            component={TextField}
                            type="text"
                            name="country"
                            label="Countries:"
                            select
                            helperText="Please select your country"
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          >
                            {(country &&
                              country.map((option) => (
                                <MenuItem key={option.name} value={option.name}>
                                  {option.name}
                                </MenuItem>
                              ))) ||
                              []}
                          </Field>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <Field
                            component={DatePicker}
                            name="dateofbirth"
                            label="Date of Birth"
                            format="MM/dd/yyyy"
                            className="inputStyleDate"
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <ReCAPTCHA
                            sitekey="6LfyLtEZAAAAANWwtG46yFl0qdixmR-AbvgF95Ix"
                            onChange={recaptcaHandler}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      {(buttonShow && (
                        <Button
                          color="primary"
                          // type="submit"
                          disabled={isSubmitting}
                          onClick={submitForm}
                        >
                          Create Profile
                        </Button>
                      )) ||
                        ""}
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
            </Form>
          </MuiPickersUtilsProvider>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    country: state.country.countries,
    imageUrl: state.image.image,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchcountry: () => dispatch(fetchCountries()),
    postprofile: (id) => dispatch(postProfile(id)),
    imageGetter: (image) => dispatch(imageProfileSuccess(image)),
    getData: (data) => dispatch(getDataSuccess(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserProfile));
