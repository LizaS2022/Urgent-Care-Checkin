import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
// calling the mutation fom the mutatuion folder
import { DELETE_APPT } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";
import { VIEW_APPOINTMENT } from "../../utils/queries";

const CancelAppt = () => {
  const navigate = useNavigate();

  const [confirmationInput, setConfirmationInput] = useState({
    referencenumber: "",
  });

  const [deleteAppointment] = useMutation(DELETE_APPT);

  const [deleteAppointment] =  useMutation(DELETE_APPT);


  const { data, loading, error, refetch } = useQuery(VIEW_APPOINTMENT, {
    variables: { appointmentId: confirmationInput.referencenumber },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Did the state update?", confirmationInput);
    setConfirmationInput({ ...confirmationInput, [name]: value });
    refetch({ appointmentId: value });
    console.log(confirmationInput);
  };

  const deleteFormSubmit = async (e) => {
    e.preventDefault();
    console.log("deleting appointment with id:", confirmationInput.name);

    if (!data || !data.appointment) {
      alert("there is no appointment with this confirmation number!");
      return;
    }
    try {
      const response = await deleteAppointment({
        variables: { appointmentId: confirmationInput.referencenumber },
      });
      console.log(response);
      console.log("delete worked", confirmationInput);


      return navigate("/");
    } catch (err) {
      console.log(err);
      return navigate("/");

      return navigate(`/canceledAppointment/${data.appointment.patient}`);

    } 
  };

  return (
    <div>
      <Navbar />
      <div className="page-title bg-1 bgSerg">
        <div className="overlay" />
      </div>
      <section className="appoinment section ">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="mt-3">
                <div className="feature-icon mb-3">
                  <i className="icofont-support text-lg" />
                </div>
                <span className="h3">Call for an Emergency Service!</span>
                <h2 className="text-color mt-3">+84 789 1256 </h2>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="appoinment-wrap mt-5 mt-lg-0 pl-lg-5">
                <h2 className="mb-2 title-color">Cancel your appoitnment</h2>
                <p className="mb-4">
                  We understand that things happen! Just know that you can also
                  reschedule you appoitment!
                </p>

                <form onSubmit={deleteFormSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Enter your confirmation number:{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="referencenumber"
                      value={confirmationInput.referencenumber}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button className="btn btn-main btn-round-full" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CancelAppt;
