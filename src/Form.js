import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useRef } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { useForm } from "react-hook-form";
import "./Form.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
}));

const sex = [
  {
    value: "male",
    label: "Male 👱‍♂️",
  },
  {
    value: "female",
    label: "Female 👩",
  },
  {
    value: "other",
    label: "Other",
  },
];

function Form() {
  //react-hook-form
  const { register, handleSubmit, watch, errors } = useForm();

  const classes = useStyles();

  /*   const nameInputRef = useRef(null);
  const ageInputRef = useRef(null);
  const salaryInputRef = useRef(null);
  const hobbyInputRef = useRef(null);
  const genderInputRef = useRef(null); */

  /* const [gender, setGender] = useState("");

  const handleGender = (e) => {
    setGender(e.target.value);
  }; */

  //submit button
  const submitForm = (data) => {
    // e.preventDefault();
    console.log("data");

    const { name, age, salary, hobby } = data;

    const formData = {
      name,
      age,
      salary,
      hobby,
    };

    axios
      .post(
        "https://sheet.best/api/sheets/92dee5f0-71fb-4d7b-b939-934c9f9f6352",
        formData
      )
      .then((response) => {
        alert("Row successfully added");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form">
      <form
        //react-hook-form
        onSubmit={handleSubmit(submitForm)}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        {/*  TextField materialUI component uses inputRef NOT ref (useRef) */}
        <TextField
          name="name"
          inputRef={register}
          id="standard-basic"
          label="FirstName"
        />
        <TextField
          name="age"
          inputRef={register}
          id="filled-basic"
          label="Age"
          variant="filled"
        />
        <TextField
          name="salary"
          inputRef={register("exampleRequired", { required: true })}
          id="outlined-basic"
          label="Salary"
          variant="outlined"
        />
        <TextField
          name="hobby"
          inputRef={register}
          id="outlined-basic"
          label="Hobby"
          variant="outlined"
        />

        {/*        <TextField
          name="gender"
          inputRef={register}
          id="filled-select-currency"
          select
          label="Select"
          value={gender}
          onChange={handleGender}
          helperText="Please select your gender"
          variant="filled"
        >
          {sex.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField> */}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Form;
