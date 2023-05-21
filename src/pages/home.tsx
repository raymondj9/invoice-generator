import styled from "styled-components";
import MainLayout from "../components/layouts/MainLayout";
import InvoiceForm from "../components/reusables/Forms/InvoiceForm";

const Home = () => {
  return (
    <>
      <MainLayout showLoader={true}>
        <PageWrapper className="pb-4">
          <section className="">
            <div className="!pb-8">
              <div>
                <h1 className="text-center font-thin text-5xl uppercase lg:tracking-widest mb-4">
                  Invoice Generator
                </h1>
                <div>
                  <InvoiceForm />
                </div>
              </div>
            </div>
          </section>
        </PageWrapper>
      </MainLayout>
    </>
  );
};

export default Home;

const PageWrapper = styled.div``;
