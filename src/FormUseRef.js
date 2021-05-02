import React, { useRef } from "react";

function FormUseRef() {
  const nameInputRef = useRef(null);
  const ageInputRef = useRef(null);
  const salaryInputRef = useRef(null);
  const hobbyInputRef = useRef(null);
  const genderInputRef = useRef(null);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("clicked..");

    const formData = {
      name: nameInputRef.current.value,
      age: ageInputRef.current.value,
      salary: salaryInputRef.current.value,
      hobby: hobbyInputRef.current.value,
      gender: genderInputRef.current.value,
    };

    axios
      .post(
        "https://sheet.best/api/sheets/92dee5f0-71fb-4d7b-b939-934c9f9f6352",
        formData
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        {" "}
        {/*  TextField materialUI component uses inputRef NOT ref (useRef) */}
        <TextField
          inputRef={nameInputRef}
          id="standard-basic"
          label="FirstName"
        />
        <TextField
          inputRef={ageInputRef}
          id="filled-basic"
          label="Age"
          variant="filled"
        />
        <TextField
          inputRef={salaryInputRef}
          id="outlined-basic"
          label="Salary"
          variant="outlined"
        />
        <TextField
          inputRef={hobbyInputRef}
          id="outlined-basic"
          label="Hobby"
          variant="outlined"
        />
        <TextField
          inputRef={genderInputRef}
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
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default FormUseRef;
