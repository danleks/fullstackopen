import React from "react";
import axios from "axios";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import {setDiagnoses, setPatientList, useStateValue} from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import { Typography } from "@material-ui/core";
import IndividualPatientlInfo from "./components/IndividualPatientInfo";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get(`${apiBaseUrl}/diagnoses`)
        console.log(diagnosesFromApi)
        dispatch(setDiagnoses(diagnosesFromApi));
      } catch (e) {
        console.error(e)
      }
    }

    void fetchPatientList();
    void fetchDiagnoses();
  }, [dispatch]);


  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="patients/:id" element={<IndividualPatientlInfo />} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
