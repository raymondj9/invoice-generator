import { useEffect, useState } from "react";
import styled from "styled-components";

type ModalProps = {
  children: React.ReactNode;
  title: string;
  onModalClose?: () => void;
  show?: boolean;
  showTitle?: boolean;
  onSaveHandler?: () => void;
};

const Modal = ({ children, title, onModalClose, show }: ModalProps) => {
  const [showModal, setShowModal] = useState(show);
  useEffect(() => {
    setShowModal(show);
  }, [show]);
  return (
    <Wrapper>
      {showModal ? (
        <>
          <div className="justify-center items-center overflow-x-hidden overflow-y-auto fixed top-0 inset-0 z-50 outline-none focus:outline-none px-4">
            <div className="relative w-auto my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none modal no-scrollbar lg:px-10 px-6 mx-auto">
                {/*header*/}
                <div className="flex items-start justify-between border-blueGray-200 rounded-t py-4">
                  <button
                    className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onModalClose}
                  >
                    <span className="bg-transparent text-gray-600 opacity-8 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <h3 className="text-2xl font-semibold text-center text-black">
                  {title}
                </h3>
                {/*body*/}
                <div className="relative p-6 flex-auto lg:px-20 px-2">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100vw;

  & .modal {
    height: auto;
    max-width: 700px;
  }

  .iu-modal-backdrop {
    background: rgba(0, 0, 0, 0.7);
    z-index: 13000;
    backdrop-filter: blur(0px);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    // height: 100vh;
    // display: flex;
    align-items: center;
    justify-content: center;
  }

  .iu-modal-content {
    position: fixed;
    z-index: 15000;
    left: 50%;
    top: 50%;
    padding: 0;
    // height: 80vh;
    // width: 732px;
    overflow: hidden !important;
    background: #fff;
    transform: translate(-50%, -50%);

    & button {
      width: 135px;
    }

    & button:focus {
      background: transparent;
      color: transparent;
    }

    &::-webkit-scrollbar {
      width: 0.2rem;
      height: 0rem;
      border-radius: 10px;
    }
  }

  .iu-preview:hover {
    color: #2eff7b;
  }
`;

export default Modal;
