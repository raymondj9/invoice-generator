import { useRef, useState } from "react";
import TextArea from "../Input/TextArea";
import Section from "../Sections/Section";
import Input from "../Input/Input";
import Icon from "../Atoms/Icon";
import Tile from "../Tile/Tile";
import Button from "../Button/Button";
import jsPDF from "jspdf";

type ITem = {
  name: string;
  quantity: any;
  price: string;
};

const InvoiceForm = () => {
  const doc = new jsPDF("p", "pt", "letter");
  const reportTemplateRef = useRef<HTMLDivElement>(null);
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
    billed_by: {
      name: "",
      address: "",
      country: "",
      state: "",
      zip_code: "",
      phone: "",
    },
    billed_to: {
      name: "",
      address: "",
      country: "",
      state: "",
      zip_code: "",
      phone: "",
    },
    payment_terms: "",
    payment_details: "",
    tax: 0,
    discount: 0,
    shipping: 0,
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
        billed_by: {
          ...data.billed_by,
          ...{ [event.target.name]: [event.target.value] },
        },
      });
    } else {
      setData({
        ...data,
        billed_to: {
          ...data.billed_to,
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

  const sumTotal = () => {
    return data.items
      .map((item) => parseInt(item.price) * item.quantity)
      .reduce((prev, next) => prev + next);
  };

  const handleGeneratePdf = () => {
    // reportTemplateRef?.current?.style.width = "100px";
    // const doc = new jsPDF({
    //     format: "a4",
    //     unit: "in",
    // });

    // Adding the fonts.
    doc.setFont("Inter-Regular", "normal");
    // doc.addFont("ComicSansMS", "Comic Sans", "normal");
    // doc.setFont("Comic Sans");
    doc.setFontSize(12);

    // @ts-ignore
    doc.html(reportTemplateRef?.current, {
      async callback(doc) {
        doc.save("invoice");
      },
      margin: [10, 10, 10, 10],
      autoPaging: "text",
      width: 200,
      html2canvas: {
        allowTaint: true,
        dpi: 300,
        letterRendering: true,
        logging: false,
        scale: 0.6,
        // windowWidth: 1500,
        // removeContainer: true,
        // async: true,
        width: 900,
      },
    });
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
                placeholder="A00011"
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

            <div
              className="mt-4 p-2 md:p-3 border-dashed border-2 cursor-pointer items-center flex justify-center text-lg"
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
                  value={data.billed_by.name}
                  className="block w-full"
                  placeholder="Your Business/Freelancer Name "
                  handleChange={(e: any) => onHandleDetailsChange(e, 1)}
                />
                <Input
                  id="address"
                  name="address"
                  input_style="flat"
                  type="text"
                  value={data.billed_by.address}
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
                    value={data.billed_by.state}
                    className="block w-full"
                    placeholder="City, State"
                    handleChange={(e: any) => onHandleDetailsChange(e, 1)}
                  />
                  <Input
                    id="country"
                    name="country"
                    input_style="flat"
                    type="text"
                    value={data.billed_by.country}
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
                  value={data.billed_by.zip_code}
                  className="block w-full"
                  placeholder="Zip Code"
                  handleChange={(e: any) => onHandleDetailsChange(e, 1)}
                />
                <Input
                  id="phone"
                  name="phone"
                  input_style="flat"
                  type="text"
                  value={data.billed_by.phone}
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
                  value={data.billed_to.name}
                  className="block w-full"
                  placeholder="Client Business Name"
                  handleChange={(e: any) => onHandleDetailsChange(e, 2)}
                />
                <Input
                  id="price"
                  name="address"
                  input_style="flat"
                  type="text"
                  value={data.billed_to.address}
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
                    value={data.billed_to.state}
                    className="block w-full"
                    placeholder="City, State"
                    handleChange={(e: any) => onHandleDetailsChange(e, 2)}
                  />
                  <Input
                    id="country"
                    name="country"
                    input_style="flat"
                    type="text"
                    value={data.billed_to.country}
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
                  value={data.billed_to.zip_code}
                  className="block w-full"
                  placeholder="Zip Code"
                  handleChange={(e: any) => onHandleDetailsChange(e, 2)}
                />
                <Input
                  id="phone"
                  name="phone"
                  input_style="flat"
                  type="text"
                  value={data.billed_to.phone}
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
                value={data.payment_terms}
                cols={3}
                rows={4}
                onChange={onHandleInputChange}
              ></TextArea>
              <TextArea
                label="Payment details"
                value={data.payment_details}
                cols={3}
                rows={4}
                onChange={onHandleInputChange}
              ></TextArea>
            </div>
          </Section>

          <Section header={""}>
            <div className="flex flex-col md:flex-row gap-8 grid-cols-2">
              <Input
                id="tax"
                name="tax"
                type="text"
                value={data.tax}
                label="Tax(%)"
                className="block w-full col-span-3"
                handleChange={(e: any) => onHandleInputChange(e)}
              />
              <Input
                id="discount"
                name="discount"
                type="text"
                value={data.discount}
                label="Discount"
                className="block w-full col-span-3"
                handleChange={(e: any) => onHandleInputChange(e)}
              />
              <Input
                id="shipping"
                name="shipping"
                type="text"
                value={data.shipping}
                label="Shipping Fee"
                className="block w-full col-span-3"
                handleChange={(e: any) => onHandleInputChange(e)}
              />
            </div>
          </Section>
        </Tile>

        {data.items.length > 0 && data.items[0].price != "" && (
          <Tile className="md:col-span-2 mt-14">
            <h2 className="text-2xl font-bold">Invoice Preview</h2>
            <Section>
              <div className="overflow-x-auto">
                <div
                  className="grid gap-4 min-w-[990px]"
                  ref={reportTemplateRef}
                >
                  <h2 className="text-2xl">Invoice</h2>
                  <div className="grid gap-20">
                    <div className="flex gap-16">
                      <div>
                        <h3>INVOICE NUMBER</h3>
                        <div>{data.invoice_number}</div>
                      </div>

                      <div>
                        <h3>DATE OF ISSUE</h3>
                        <div>{data.date}</div>
                      </div>

                      <div>
                        <h3>DUE DATE</h3>
                        <div>{data.due_date}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-16">
                      <div className="bg-gray-300/10 p-2 rounded-md">
                        <h3>BILLED BY</h3>
                        <div>{data.billed_by.name}</div>
                        <div>{data.billed_by.address}</div>
                        <div>
                          {data.billed_by.state} {data.billed_by.country}
                        </div>
                        <div>{data.billed_by.zip_code}</div>
                        <div>{data.billed_by.phone}</div>
                      </div>

                      <div className="bg-gray-300/10 p-2 rounded-md">
                        <h3>BILLED TO</h3>
                        <div>{data.billed_to.name}</div>
                        <div>{data.billed_to.address}</div>
                        <div>
                          {data.billed_to.state} {data.billed_by.country}
                        </div>
                        <div>{data.billed_to.zip_code}</div>
                        <div>{data.billed_to.phone}</div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="mt-10 border-b pb-10 bg-gray-300/10">
                      <div className="grid grid-cols-5 bg-gray-500/20 p-2">
                        <h3 className="col-span-2">Item Name</h3>
                        <h3>Unit cost </h3>
                        <h3>QTY</h3>
                        <h3>Amount</h3>
                      </div>
                      <div className="mt-2 p-2">
                        {data.items.map((item: ITem) => (
                          <div className="grid grid-cols-5 mt-2">
                            <div className="col-span-2">{item.name}</div>
                            <div>${item.price}</div>
                            <div>{item.quantity}</div>
                            <div>
                              ${parseInt(item.price) * parseInt(item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between border-b pb-10 mt-8">
                      <div>
                        <h3>Payment Details</h3>
                        <div className="whitespace-pre">
                          {data.payment_details}
                        </div>
                      </div>
                      <div className="w-[200px]">
                        <div className="flex justify-between">
                          <h3>SUBTOTAL: </h3>
                          <div>
                            $
                            {data.items
                              .map(
                                (item) => parseInt(item.price) * item.quantity
                              )
                              .reduce((prev, next) => prev + next)}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <h3>Tax(%):</h3>
                          <div>{data.tax}</div>
                        </div>
                        <div className="flex justify-between">
                          <h3>Shipping:</h3>
                          <div>{data.shipping}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
            <div className="mt-4">
              <Button onClick={handleGeneratePdf}>Download Invoice</Button>
            </div>
          </Tile>
        )}
      </div>
    </form>
  );
};
export default InvoiceForm;
