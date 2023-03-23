import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { createProduct, fetchProduct, updateProduct } from "../slice/product";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const ProductEdit = () => {
    const { id } = useParams();
    const { item } = useSelector((state) => state.product);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onHandleSubmit = (data) => {
        dispatch(updateProduct({ id: item.id, ...data }));
        navigate('/')
    };

    useEffect(() => {
        dispatch(fetchProduct(id));
    }, []);
    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit(onHandleSubmit)}>
            <h1 className="">Update</h1>
                <input
                    type="text"
                    className='p-3 my-2  border-gray-700 border-[1px] outline-none rounded'
                    defaultValue={item.name}
                    {...register("name", { required: true })}
                />
                {errors.name && <span>This field is required</span>}

                <button className="bg-green-600 w-[90px] rounded block">Submit</button>
            </form>
        </div>
    );
};

export default ProductEdit;