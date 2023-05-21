import { ReactNode, useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import SelectInputDropdown from "../Input/SelectInputDropdown";
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
    items: [itemDefault],
  });

  const onHandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, ...{ [event.target.name]: [event.target.value] } });
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

  const submit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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
            <div className="lg:flex gap-4 grid-cols-2">
              <Input
                id="invoice_number"
                name="invoice_number"
                type="text"
                value={data.invoice_number}
                label="Invoice Number"
                className="block w-full col-span-3"
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
            <div className="lg:flex w-full gap-4">
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
            {data?.items?.map((item, i) => (
              <div className="grid grid-cols-12 items-center gap-x-1.5 mb-6">
                <div className="grid grid-cols-6 gap-x-4 col-span-11">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={data.items[i].name}
                    label="Item Description"
                    className="block w-full col-span-3"
                    handleChange={(e: any) => onHandleChange(e, i)}
                  />

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
                    value={data.items[i].price * data.items[i].quantity}
                    label="Total"
                    className="block w-full"
                    handleChange={(e: any) => onHandleChange(e, i)}
                  />
                </div>

                <div className="col-span-1 flex items-center justify-center h-full">
                  <span
                    className="bg-red-600 rounded-full h-6 w-6 mt-6 md:mt-5 md:h-11 md:w-11 flex items-center text-white"
                    onClick={() => removeItem(i)}
                  >
                    <Icon icon="close" size={40} className="w-full" />
                  </span>
                </div>
              </div>
            ))}

            <div className="mt-4 flex gap-2">
              <span>Items Subtotal:</span>
              <strong>0</strong>
            </div>

            <div
              className="mt-4 p-4 border-dashed border-2 cursor-pointer items-center flex justify-center text-lg"
              onClick={addItem}
            >
              <Icon icon="plus-circle" />
              <span>Add Item</span>
            </div>
          </Section>

          <Section>
            <div className="lg:flex gap-4">
              <TextArea label="Your Details" placeholder=""></TextArea>
              <TextArea label="Bill to"></TextArea>
            </div>
          </Section>

          <Section>
            <div className="lg:flex gap-4">
              <TextArea label="Payment terms"></TextArea>
              <TextArea label="Payment details"></TextArea>
            </div>
          </Section>

          <Section header={""}>
            <div className="lg:flex gap-4 grid-cols-2">
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
