import React from "react";
import { useForm } from "react-hook-form";
import { createProduct } from "../slice/product";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onHandleSubmit = (data) => {
        dispatch(createProduct(data)).then(() => {
            navigate("/");
        });
    };
    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit(onHandleSubmit)}>
            <h1 className="">Add New</h1>
                <input className='p-3 my-2  border-gray-700 border-[1px] outline-none rounded' type="text" {...register("name", { required: true })} />
                {errors.name && <span>This field is required</span>}
                <button className="bg-green-600 w-[90px] rounded block">Submit</button>
            </form>
        </div>
    );
};

export default ProductAdd;