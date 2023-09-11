import "./Contact.css";
import { useRef, useState } from "react";
import { contactImg } from "../../assets";
import ActionBtn from "../ActionBtn/ActionBtn";
import emailjs from "@emailjs/browser";

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  })
  const form = useRef(null);

  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        "resinArt_contact",
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        (result) => {
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            message: "",
          })
        },
        (error) => {
          console.error("Error:", error);
        },
      );
  };

  function handleChange(event) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  return (
    <div className="contact_container">
      <img src={contactImg} alt="resin art" className="about_img contact_img" />
      <div className="contact_sub_container">
        <h2 className="main_para_styling contact_heading">
          Get in touch
        </h2>
        <span className="sub_para_styling contact_para">
          If you would like to book a workshop or commission a
          piece of art to your specific requirements please
          contact Mahi on 000-xxxx-000.
          <p
            className="sub_para_styling contact_para"
          >
            Email adamhalls@gmail.com
          </p>
          <p
            className="sub_para_styling contact_para"
          >
            Or please complete the enquiry form below.
          </p>
        </span>
        <form
          ref={form}
          onSubmit={sendEmail}
        >
          <div>
            <p className="sub_para_styling contact_form_label">
              Name *
            </p>
            <div className="name_input_container">
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                className="contact_form_fields"
                onChange={handleChange}
                value={formData.first_name}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                className="contact_form_fields"
                onChange={handleChange}
                value={formData.last_name}
              />
            </div>
          </div>
          <div>
            <p className="sub_para_styling contact_form_label">
              Email *
            </p>
            <input
              type="email"
              name="email"
              id=""
              className="contact_form_fields"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div>
            <p className="sub_para_styling contact_form_label">
              Message *
            </p>
            <textarea
              name="message"
              id=""
              cols="30"
              rows="6"
              className="contact_form_fields"
              onChange={handleChange}
              value={formData.message}
            />
          </div>
          <div style={{ paddingTop: "16px" }}>
            <ActionBtn text="Submit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactComponent
