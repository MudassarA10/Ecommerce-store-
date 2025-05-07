import { useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { TextField, Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message Sent! We will get back to you soon.", {
      position: "top-center",
      autoClose: 3000,
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50  mb-12">
      {/* Banner Section */}
      <ToastContainer />
      <div className=" relative w-full h-56 bg-cover bg-center flex  justify-center text-white text-4xl font-bold bg-[url('/src/assets/contact-banner.jpg')]">
        <h1 className="relative text-white z-50 mt-4 lg:mt-0   opacity-40 text-5xl">
          Contact Us
        </h1>
      </div>
      <div className="absolute h-[18.1rem] inset-0 bg-black bg-opacity-50"></div>
      {/* Contact Section */}
      <div className="px-5 container mx-auto mt-5 flex flex-col lg:flex-row justify-evenly gap-6">
        <div className="bg-white shadow-2xl rounded-xl px-8 py-5 w-full lg:max-w-96">
          <div className="space-y-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-5">
                <span className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center">
                  <IoCallOutline className="text-2xl text-white" />
                </span>
                <h4 className="font-bold text-lg">Call To Us</h4>
              </div>
              <div className="">
                <p className="text-gray-600">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="font-semibold">Phone: (+92)880161122</p>
              </div>
            </div>
            <hr />
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-5">
                <span className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center">
                  <MdOutlineEmail className="text-2xl text-white" />
                </span>
                <h4 className="font-bold text-lg">Write To US</h4>
              </div>
              <div className="">
                <p className="text-gray-600  max-w-xs">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="font-semibold flex flex-col sm:flex-row">
                  Email:
                  <span>customer@exclusive.com</span>
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
        </div>
        <div className="bg-white shadow-2xl rounded-xl px-8 py-5 w-full lg:max-w-[60%]">
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Your Email"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Your Phone Number"
                name="phone"
                type="number"
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <TextField
              fullWidth
              label="Your Message"
              name="message"
              multiline
              rows={4}
              variant="outlined"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              className="py-2 text-white font-bold rounded-lg"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
