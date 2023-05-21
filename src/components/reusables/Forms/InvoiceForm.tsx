import { useState } from "react";
import TextArea from "../Input/TextArea";
import Section from "../Sections/Section";
import Input from "../Input/Input";
import Icon from "../Atoms/Icon";
import Tile from "../Tile/Tile";
import Button from "../Button/Button";

type ITem = {
  name: string;
  quantity: any;
  price: string;
};

const InvoiceForm = () => {
  const itemDefault: ITem = {
    name: "",
    quantity: "",
    price: "",
  };
  const [data, setData] = useState({
    invoice_number: "",
    purchase_order: "",
    date: "",
    due_date: "",
    your_details: {
      name: "",
      address: "",
      country: "",
      state: "",
      zip_code: "",
      phone: "",
    },
    bill_to: {
      name: "",
      address: "",
      country: "",
      state: "",
      zip_code: "",
      phone: "",
    },
    payment_terms: "",
    payment_details: "",
    tax: "",
    discount: "",
    shipping: "",
    items: [itemDefault],
  });

  const onHandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, ...{ [event.target.name]: [event.target.value] } });
  };

  const onHandleDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: number
  ) => {
    if (type == 1) {
      setData({
        ...data,
        your_details: {
          ...data.your_details,
          ...{ [event.target.name]: [event.target.value] },
        },
      });
    } else {
      setData({
        ...data,
        bill_to: {
          ...data.bill_to,
          ...{ [event.target.name]: [event.target.value] },
        },
      });
    }
  };

  const onHandleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    let newItem = {
      ...data.items[i],
      ...{ [event.target.name]: [event.target.value] },
    };
    let newItems = data.items.map((item, index) => {
      return i == index ? newItem : item;
    });
    setData({ ...data, items: newItems });
  };

  const submit = (e: any) => {
    console.log(e);
  };

  const addItem = () => {
    setData({ ...data, items: [...data.items, itemDefault] });
  };

  const removeItem = (index: number) => {
    let newItems = [...data.items];
    newItems.splice(index, 1);
    setData({ ...data, items: newItems });
  };

  return (
    <form onSubmit={submit}>
      <div className="max-w-6xl mx-auto">
        <Tile className="grid gap-9">
          <Section header={""}>
            <div className="flex flex-col md:flex-row gap-8 grid-cols-2">
              <Input
                id="invoice_number"
                name="invoice_number"
                type="text"
                value={data.invoice_number}
                label="Invoice Number"
                className="block w-full col-span-3"
                placeholder="I0001"
                handleChange={(e: any) => onHandleInputChange(e)}
              />
              <Input
                id="purchase_order"
                name="purchase_order"
                type="text"
                value={data.purchase_order}
                label="Purchase Order"
                className="block w-full col-span-3"
                handleChange={(e: any) => onHandleInputChange(e)}
              />
            </div>
          </Section>
          <Section header={"Date"}>
            <div className="flex flex-col xs:flex-row w-full gap-8">
              <Input
                id="date"
                name="date"
                type="date"
                value={data.date}
                label="Invoice Date"
                className="block w-full col-span-3"
                handleChange={(e: any) => onHandleInputChange(e)}
              />
              <Input
                id="due_date"
                name="due_date"
                type="date"
                value={data.due_date}
                label="Due Date"
                className="block w-full col-span-3"
                handleChange={(e: any) => onHandleInputChange(e)}
              />
            </div>
          </Section>
          <Section header={"Items"}>
            <div className="overflow-x-scroll">
              <div className="w[1000px] overflow-x-scroll">
                {data?.items?.map((_, i) => (
                  <div className="grid grid-cols-12 items-center gap-x-1.5 mb-6 border-b md:border-none pb-8 md:pb-2">
                    <div className="grid md:grid-cols-6 gap-x-4 col-span-11">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={data.items[i].name}
                        label="Item Name"
                        className="block w-full col-span-3"
                        handleChange={(e: any) => onHandleChange(e, i)}
                      />

                      <div className="flex col-span-3 gap-4">
                        <Input
                          id="quantity"
                          name="quantity"
                          type="number"
                          value={data.items[i].quantity}
                          label="Quantity"
                          className="block w-full"
                          handleChange={(e: any) => onHandleChange(e, i)}
                        />

                        <Input
                          id="price"
                          name="price"
                          type="number"
                          value={data.items[i].price}
                          label="Price"
                          className="block w-full"
                          handleChange={(e: any) => onHandleChange(e, i)}
                        />

                        <Input
                          id="price"
                          name="price"
                          type="number"
                          value={data.items[i].price.valueOf()}
                          label="Total"
                          className="block w-full"
                          handleChange={(e: any) => onHandleChange(e, i)}
                        />
                      </div>
                    </div>

                    <div className="col-span-1 flex items-center justify-center h-full">
                      <span
                        className="bg-red-600 rounded-full h-[20px] w-[20px] mt-6 md:mt-5 md:h-11 md:w-11 flex items-center text-white"
                        onClick={() => removeItem(i)}
                      >
                        <Icon icon="close" size={40} className="w-full" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <span>Items Subtotal:</span>
              <strong>$0</strong>
            </div>

            <div
              className="mt-4 p-4 border-dashed border-2 cursor-pointer items-center flex justify-center text-lg"
              onClick={addItem}
            >
              <Icon icon="plus-circle" />
              <span>Add Item</span>
            </div>
          </Section>

          <div className="flex flex-col md:flex-row gap-8 [&>*]:w-full">
            <Section header="Your Details">
              <div className="grid gap-4">
                <Input
                  id="name"
                  name="name"
                  input_style="flat"
                  type="text"
                  value={data.your_details.name}
                  className="block w-full"
                  placeholder="Your Business/Freelancer Name "
                  handleChange={(e: any) => onHandleDetailsChange(e, 1)}
                />
                <Input
                  id="address"
                  name="address"
                  input_style="flat"
                  type="text"
                  value={data.your_details.address}
                  className="block w-full"
                  placeholder="Address"
                  handleChange={(e: any) => onHandleDetailsChange(e, 1)}
                />
                <div className="flex gap-6">
                  <Input
                    id="state"
                    name="state"
                    input_style="flat"
                    type="text"
                    value={data.your_details.state}
                    className="block w-full"
                    placeholder="City, State"
                    handleChange={(e: any) => onHandleDetailsChange(e, 1)}
                  />
                  <Input
                    id="country"
                    name="country"
                    input_style="flat"
                    type="text"
                    value={data.your_details.country}
                    className="block w-full"
                    placeholder="Country"
                    handleChange={(e: any) => onHandleDetailsChange(e, 1)}
                  />
                </div>
                <Input
                  id="zip_code"
                  name="zip_code"
                  input_style="flat"
                  type="text"
                  value={data.your_details.zip_code}
                  className="block w-full"
                  placeholder="Zip Code"
                  handleChange={(e: any) => onHandleDetailsChange(e, 1)}
                />
                <Input
                  id="phone"
                  name="phone"
                  input_style="flat"
                  type="text"
                  value={data.your_details.phone}
                  className="block w-full"
                  placeholder="Phone"
                  handleChange={(e: any) => onHandleDetailsChange(e, 1)}
                />
              </div>
            </Section>

            <Section header="Client Details">
              <div className="grid gap-4">
                <Input
                  id="price"
                  name="name"
                  input_style="flat"
                  type="text"
                  value={data.bill_to.name}
                  className="block w-full"
                  placeholder="Client Business Name"
                  handleChange={(e: any) => onHandleDetailsChange(e, 2)}
                />
                <Input
                  id="price"
                  name="address"
                  input_style="flat"
                  type="text"
                  value={data.bill_to.address}
                  className="block w-full"
                  placeholder="Address"
                  handleChange={(e: any) => onHandleDetailsChange(e, 2)}
                />
                <div className="flex gap-6">
                  <Input
                    id="state"
                    name="state"
                    input_style="flat"
                    type="text"
                    value={data.bill_to.state}
                    className="block w-full"
                    placeholder="City, State"
                    handleChange={(e: any) => onHandleDetailsChange(e, 2)}
                  />
                  <Input
                    id="country"
                    name="country"
                    input_style="flat"
                    type="text"
                    value={data.bill_to.country}
                    className="block w-full"
                    placeholder="Country"
                    handleChange={(e: any) => onHandleDetailsChange(e, 2)}
                  />
                </div>
                <Input
                  id="zip_code"
                  name="zip_code"
                  input_style="flat"
                  type="text"
                  value={data.bill_to.zip_code}
                  className="block w-full"
                  placeholder="Zip Code"
                  handleChange={(e: any) => onHandleDetailsChange(e, 2)}
                />
                <Input
                  id="phone"
                  name="phone"
                  input_style="flat"
                  type="text"
                  value={data.bill_to.phone}
                  className="block w-full"
                  placeholder="Phone"
                  handleChange={(e: any) => onHandleDetailsChange(e, 2)}
                />
              </div>
            </Section>
            {/* <TextArea label="Your Details" placeholder="" value="" cols={3} rows={4}></TextArea> */}
            {/* <TextArea label="Bill to" value="" cols={3} rows={4}></TextArea> */}
          </div>

          <Section>
            <div className="flex flex-col md:flex-row gap-8">
              <TextArea
                label="Payment terms"
                value=""
                cols={3}
                rows={4}
              ></TextArea>
              <TextArea
                label="Payment details"
                value=""
                cols={3}
                rows={4}
              ></TextArea>
            </div>
          </Section>

          <Section header={""}>
            <div className="flex flex-col md:flex-row gap-8 grid-cols-2">
              <Input
                id="invoice_number"
                name="invoice_number"
                type="text"
                value={data.invoice_number}
                label="Tax(%)"
                className="block w-full col-span-3"
                handleChange={(e: any) => onHandleInputChange(e)}
              />
              <Input
                id="purchase_order"
                name="purchase_order"
                type="text"
                value={data.purchase_order}
                label="Discount"
                className="block w-full col-span-3"
                handleChange={(e: any) => onHandleInputChange(e)}
              />
              <Input
                id="purchase_order"
                name="purchase_order"
                type="text"
                value={data.purchase_order}
                label="Shipping Fee"
                className="block w-full col-span-3"
                handleChange={(e: any) => onHandleInputChange(e)}
              />
            </div>
          </Section>
        </Tile>

        <Tile className="md:col-span-2 mt-14">
          <h2 className="text-2xl font-bold">Invoice Preview</h2>
          <div></div>
          <div className="mt-4">
            <Button>Generate Invoice</Button>
          </div>
        </Tile>
      </div>
    </form>
  );
};
export default InvoiceForm;
