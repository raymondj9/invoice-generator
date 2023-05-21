import { ReactNode, useEffect, useState } from "react";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import TextInput from "../TextInput";
import PrimaryButton from "../PrimaryButton";
import SelectInputDropdown from "../Input/SelectInputDropdown";
import TextArea from "../Input/TextArea";
import ImageUploader from "../Input/ImageUploader";
import Section from "../Sections/Section";
import { setModals } from "../../store/slices/app.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Icon from "../Atoms/Icon";
import request from "../../Utils/request";

interface ITem {
    product_code: string;
    quantity: any;
    product_name: string;
    price: number;
    total_cost: number;
}

type ISuggestions = {
    sku: "";
    name: "";
    qty_in_stock: 0;
    product_name: "";
    price: 0;
}

function ProductsForm() {
    const dispatch = useDispatch();
    const { props } = usePage();
    const [showPassword, setShowPassword] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const { modals } = useSelector((state: RootState) => state.app);
    const itemDefault: ITem = {
        product_code: "",
        quantity: 1,
        product_name: "",
        price: 0,
        total_cost: 0,
    };
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        items: [itemDefault],
    });
    const {
        data: orderData,
        setData: setOrderData,
        post: postOrderData,
        processing: processOrderData,
        errors: orderDataErrors,
    } = useForm({
        payment_channel: "cash",
        items: [itemDefault],
    });
    const [suggestions, setSuggestions] = useState<any>([]);
    const [suggestionsAlt, setSuggestionsAlt] = useState<ISuggestions[]>([]);
    const [items, setItems] = useState([{}]);
    const [item, setItem] = useState<ISuggestions>();
    const [orderItems, setOrderItems] = useState<ITem[]>([]);

    const onHandleChange = (event: any, i: number) => {
        let key = event.target.name;
        let val = event.target.value;
        if (key == "product_code") {
            getSuggestions(val);
        }
        let newItems = {
            ...data.items[i],
            ...{ [key]: val },
        };
        data.items[i] = newItems;
        setData("items", data.items);
    };

    useEffect(() => {
        let list: any = [];
        suggestionsAlt.forEach((item) => {
            list.push(item.sku + " [" + item.name + "]");
        });
        setSuggestions(list);
    }, [suggestionsAlt]);

    const getSuggestions = (code: any) => {
        request.post(`/check-product/${code}`).then(function (response: any) {
            setSuggestionsAlt(response.data.data);
        });
    };

    const submit = (e: any) => {
        e.preventDefault();
        if (modals.createProduct.actionId !== undefined) {
            post("/products/update");
        } else {
            post("/products/create");
        }
    };

    const addItem = () => {
        let total = item!.price * parseInt(data.items[0].quantity);
        let itm = {
            product_code: item?.sku,
            quantity: data.items[0].quantity,
            product_name: item?.name,
            price: item?.price,
            total_cost: total,
        };
        const check = orderItems.find(
            (itm: any, i) => itm.product_code === item?.sku
        );
        // console.log(check)
        if (!check) {
            let nOrderItems = [...orderItems, itm as ITem];
            setOrderItems(nOrderItems);
        } else {
            // const index = orderItems.findIndex(
            //     (itm: any, i) => itm.product_code === item?.sku
            // );
            // check.quantity =
            //     parseInt(check.quantity) + parseInt(data.items[0].quantity);
            // check.total_cost = check.price * check.quantity;
            // orderItems[index] = check;
            // let nOrderItems = [...orderItems];
            // setOrderItems(nOrderItems);
        }

        setData("items", [{ product_code: "", quantity: 1 } as ITem]);
    };

    useEffect(() => {
        let totalAmt = orderItems.reduce(
            (n, { total_cost }) => n + total_cost,
            0
        );
        setTotalAmount(totalAmt);
        setOrderData({ items: orderItems, payment_channel: "cash" });
    }, [orderItems]);

    const removeItem = (index: any) => {
        orderItems.splice(index, 1);
        let nOrderItems = [...orderItems];
        setOrderItems(nOrderItems);
    };

    const handleChange = (e: any) => {};

    const handleSuggectClick = (e: any) => {
        const suggestion = suggestionsAlt.find((suggestion: any, i) => i === e);
        setItem(suggestion);
    };

    const checkout = () => {
        postOrderData("/order/create");
    };

    return (
        <div className="flex flex-col gap-y-8">
            <div className="grid gap-9">
                <Section header={"Add Item"}>
                    <form onSubmit={addItem}>
                        {data.items.map((item, i) => (
                            <div className="md:grid grid-cols-12 items-center gap-x-1.5 mb-6">
                                <div className="flex flex-col md:flex-row gap-x-4 gap-y-6 col-span-11">
                                    <TextInput
                                        id="name"
                                        name="product_code"
                                        type="text"
                                        value={data.items[i].product_code}
                                        label="Product Code"
                                        className="block w-full"
                                        isFocused={true}
                                        handleChange={(e) =>
                                            onHandleChange(e, i)
                                        }
                                        suggest
                                        suggestions={suggestions}
                                        errors={errors}
                                        placeholder={`ex: SK-${i + 1}`}
                                        handleSuggectClick={handleSuggectClick}
                                        autoComplete={'off'}
                                    />

                                    {/* <TextInput
                                        id="name"
                                        name="product_code"
                                        type="text"
                                        value={data.items[i].product_name}
                                        label="Product Name"
                                        className="block w-full"
                                        isFocused={true}
                                        handleChange={(e) =>
                                            onHandleChange(e, i)
                                        }
                                        disabled
                                    /> */}

                                    <TextInput
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        value={data.items[i].quantity}
                                        label="Quantity"
                                        className="block w-full"
                                        isFocused={true}
                                        handleChange={(e) =>
                                            onHandleChange(e, i)
                                        }
                                        errors={errors}
                                    />
                                </div>

                                <div className="col-span-1 flex items-center justify-center h-full">
                                    <span
                                        className="bg-green-600 rounded-full h-10 w-10 mt-6 md:mt-5 md:h-11 md:w-11 flex items-center text-white"
                                        onClick={() => addItem()}
                                    >
                                        <Icon
                                            icon="plus"
                                            size={40}
                                            className="w-full"
                                        />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </form>
                </Section>
            </div>

            <Section header={"Order Details"} className="w-full">
                <div className="">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product Code
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Cost Per Item
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total Cost
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        .....
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item: any, i) => (
                                    <tr
                                        key={item.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="px-6 py-4">
                                            {item.product_code}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.product_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.quantity}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.total_cost}
                                        </td>
                                        <td className="flex items-center px-6 py-4 space-x-3">
                                            <Icon
                                                icon="trash-alt"
                                                size={40}
                                                color="red"
                                                className="w-full"
                                                onClick={() => removeItem(i)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>

            <Section header={"Customer"}>
                <TextInput
                    id="name"
                    name="customer_name"
                    type="text"
                    value={""}
                    label="Customer's Name"
                    className="block w-full"
                    isFocused={true}
                    handleChange={(e) => {}}
                />
            </Section>

            <Section header={"Order Summary"} className="w-full">
                <div className="w-40 my-3">
                    <SelectInputDropdown
                        selectOption={handleChange}
                        label="Payment Method"
                        id={"status"}
                    >
                        <SelectInputDropdown.Option value={"bank_tranfer"}>
                            Bank Transfer
                        </SelectInputDropdown.Option>
                        <SelectInputDropdown.Option value={"cash"}>
                            Cash
                        </SelectInputDropdown.Option>
                        <SelectInputDropdown.Option value={"card"}>
                            Card
                        </SelectInputDropdown.Option>
                    </SelectInputDropdown>
                </div>
                <div className="flex items-center gap-x-2">
                    <div className="text-lg font-bold">Total: </div>
                    <div>{totalAmount}</div>
                </div>
                <div className="mt-4">
                    <PrimaryButton
                        processing={processOrderData}
                        className="!w-auto"
                        onClick={checkout}
                    >
                        Checkout
                    </PrimaryButton>
                </div>
            </Section>
        </div>
    );
}

export default ProductsForm;
