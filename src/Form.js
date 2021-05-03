import { Button, Input, TextField } from "@material-ui/core";
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
  const classes = useStyles();

  const [gender, setGender] = useState("");

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  //react-hook-form
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm();

  //submit button
  const submitForm = (data) => {
    console.log("data");

    const { name, age, salary, hobby, email, gender } = data;

    const formData = {
      //same key and value
      name: name,
      age: age,
      salary,
      hobby,
      email,
      gender,
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
      .catch((error) => alert(error.message));
  };

  /*   const { onChange, ...rest } = register("name", { required: true }); */

  return (
    <div className="form">
      <form
        //react-hook-form
        onSubmit={handleSubmit(submitForm)}
        className={classes.root}
        //  noValidate
        // autoComplete="off"
      >
        {/*  TextField materialUI component <TextField/> uses inputRef NOT ref (useRef) */}
        <h1>React Hook Form Version-7</h1>

        {!watch("name") && <h5>Please fill out the form.</h5>}

        <lable htmlFor="name">Name:</lable>
        <TextField
          {...register("name", { required: "name is required" })}
          id="name"
          label="Name"
          variant="outlined"
          //required
          error={errors.name}
          helperText={errors.name && "* This field is empty"}
        />
        {errors.name && <small>{errors.name.message}</small>}

        <TextField
          {...register("age", {
            required: "age is required",
            maxLength: { value: 2, message: "you exeeded the maximum length" },
            //valueAsNumber: true,
            min: { value: 18, message: "you must be at least 18" },
            /*    max: 99, */
          })}
          placeholder="Age"
          type="number"
          variant="outlined"
          error={errors.age}
        />
        {errors.age && <small>{errors.age.message}</small>}

        <TextField
          {...register("salary", {
            required: true,

            validate: (value) => typeof value === "number" || "must be number",

            /*  validate: (value) => typeof value === "number" || "must be number", */
            //valueAsNumber: true,
          })}
          /*  helperText={
            (errors.salary?.type === "validate" && "*value must be a number") ||
            (errors.salary?.type === "required" && "*salary is required")
          } */
          label="Salary PA"
          variant="outlined"
          error={errors.salary}
        />

        {errors.salary && <small>{errors.salary.message}</small>}

        <TextField
          {...register("hobby", { required: true })}
          label="Profession"
          variant="outlined"
        />
        <TextField
          type="email"
          {...register("email", { required: true })}
          label="Email Address"
          variant="outlined"
          //watch example
          helperText={watch("email") && "* Email accepted"}
        />
        <TextField
          {...register("gender", { required: true })}
          select
          label="Select"
          value={gender}
          onChange={handleGender}
          helperText="Please select your gender"
          variant="outlined"
        >
          {sex.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {/*   <input type="submit" /> */}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Form;
