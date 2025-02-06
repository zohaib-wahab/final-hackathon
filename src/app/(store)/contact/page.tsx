import ContactUs from "@/components/contact-components/contactus";
import Office from "@/components/contact-components/office";
import Footer from "@/components/team-components/footer";
import Header from "@/components/team-components/header";
import React from "react";

const ContactPage = () => {
  return (
    <>
        <Header />
      <ContactUs />
      <Office />
      <Footer />
    </>
  );
};

export default ContactPage;
