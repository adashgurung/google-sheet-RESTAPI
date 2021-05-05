import { Button, Input, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useRef, useEffect } from "react";
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

  const [tableData, setTableData] = useState([]);

  const [totalSalaries, setTotalSalaries] = useState(0);

  useEffect(() => {
    const total = tableData.reduce(
      (total, row) => (total = total + Number(row.salary)),
      0
    );
    setTotalSalaries(total);
  }, [tableData]);

  //react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const fetchData = () => {
    axios
      .get("https://sheet.best/api/sheets/92dee5f0-71fb-4d7b-b939-934c9f9f6352")
      .then((response) => {
        setTableData(response.data);
        console.log("excel sheet data>>", response);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  //submit button
  const submitForm = (data) => {
    console.log("data");

    const { name, age, salary, hobby, email, gender } = data;

    const formData = {
      //same key and value
      name,
      age,
      salary,
      hobby,
      email: email,
      gender,
    };

    axios
      .post(
        "https://sheet.best/api/sheets/92dee5f0-71fb-4d7b-b939-934c9f9f6352",
        formData
      )
      .then((response) => {
        alert("Row successfully added");
        setTableData([...tableData, data]);
        console.log(response);
      })
      .catch((error) => alert(error.message));
  };

  /*   const { onChange, ...rest } = register("name", { required: true }); */

  return (
    <div className="form">
      <h2>Annual expenses £ {totalSalaries}</h2>
      <table>
        <tbody>
          {tableData.map(({ age, hobby, name, salary, email, gender }) => (
            <tr>
              <td>{name}</td>
              <td>{age}</td>
              <td>{salary}</td>
              <td>{hobby}</td>
              <td>{email}</td>
              <td>{gender}</td>
            </tr>
          ))}
        </tbody>
      </table>

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

            validate: (value) =>
              typeof value === "number" || "salary must be in numbers",

            valueAsNumber: true,
          })}
          /* helperText={
            errors.salary?.type === "required" && "The Salary is required"
          } */

          helperText={
            (errors.salary?.type === "validate" && "*value must be a number") ||
            (errors.salary?.type === "required" && "*salary is required")
          }
          label="Salary"
          variant="outlined"
          error={errors.salary}
        />

        {errors.salary?.type && <small>{errors.salary.message}</small>}

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
        <input type="submit" />
        {/* <Button type="submit" variant="contained" color="primary">
          Submit
        </Button> */}
      </form>
    </div>
  );
}

export default Form;
