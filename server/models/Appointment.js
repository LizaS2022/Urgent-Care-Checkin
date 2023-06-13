const { Schema, model} = require("mongoose");
const appointmentSchema = new Schema({
    appt_date: {
        type: Date,
        default: Date.now,
    },
    appt_time: {
        type: Date,
        // added
        required: true,
    },
    //Parisa's suggestion
    // I dont think we dont need it MB
    // timeSlot: {
    //     type: Date,
    //     required: true,
    // },
    //End Parisa's suggestion
    //   appoitment ID id the phone number
    referencePhoneNumber: {
        type: String,
        required: true,
    }
    // ITHINK WE HAVE TO UPDATE DEF LINE 62 WITH REFERENCEid
});

// Parisa's suggestion
const Appointment = mongoose.model("Appointment", appointmentSchema);
// End Parisa's suggestion

module.exports = Appointment;
