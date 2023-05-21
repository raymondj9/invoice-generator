import styled from "styled-components";
import { useState } from "react";
// import { dialog } from "../../utils/loaders";
// import axios from "../../config/axios";
import Button from "../components/reusables/Button/Button";
import Modal from "../components/reusables/Modals/Modal/Modal";
import Input from "../components/reusables/Input/Input";
import MainLayout from "../components/layouts/MainLayout";
import InvoiceForm from "../components/reusables/Forms/InvoiceForm";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  let timeObject = new Date();
  let milliseconds = 864000 * 1000;
  timeObject = new Date(timeObject.getTime() + milliseconds);
  let ends_in = timeObject.getTime() / 1000;

  const [endIn, setEndIn] = useState(ends_in);

  function closeModal() {
    setShowModal(false);
  }

  function addMail(e: any) {
    
  }

  return (
    <>
      <MainLayout showLoader={true}>
        <PageWrapper className="pb-4">
          <section className="">
            <div className="!pb-8">
              <div>
                <h1 className="text-center font-thin text-5xl uppercase tracking-widest mb-4">
                  Invoice Generator
                </h1>
                <div>
                    <InvoiceForm/>
                </div>
              </div>
            </div>
          </section>
        </PageWrapper>

        <Modal
          title="Enter your details"
          show={showModal}
          onModalClose={closeModal}
        >
          <div className="text-2xl">
            <form
              onSubmit={addMail}
              className="bg-white rounded-2xl text-left"
              method="post"
            >
              <section className="py-6">
                <div className="">
                  <Input
                    placeholder="John Doe"
                    name="fullname"
                    label="Full Name"
                    value={fullname}
                    id="fullname"
                    onChange={(e) => {
                      setFullname(e.target.value);
                    }}
                    type="text"
                    required
                  />
                </div>

                <div className="mt-10">
                  <Input
                    placeholder="example@example.com"
                    name="email"
                    label="Email Address"
                    value={email}
                    id="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    required
                  />
                </div>

                <div className="mt-10">
                  <Button
                    type="submit"
                    className="px-16 py-4 rounded-lg !text-white"
                  >
                    Join Waitlist
                  </Button>
                </div>
              </section>
            </form>
          </div>
        </Modal>
      </MainLayout>
    </>
  );
};

export default Home;

const PageWrapper = styled.div``;
