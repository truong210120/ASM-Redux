import React, { useEffect } from "react";
import { fetchProducts } from "../slice/product";
import { deleteProduct } from "../slice/product";
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
const Product = (props) => {
      const dispatch = useDispatch();
      const { value: products, loading } = useSelector((state) => state.product);
      const { item } = useSelector((state) => state.product);
      const navigate = useNavigate();
      useEffect(() => {
            dispatch(fetchProducts());
      }, []);

      if (loading) return <div>Loading...</div>;
      return (
            <div>
            <Link to='/add'>
                  <button className="bg-orange-600">Add New</button>

            </Link>
                  <table className="w-full">
                        <thead>
                              <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">name</th>
                                    <th scope="col">Chức năng</th>
                              </tr>
                        </thead>
                        {
                              products.map((item) =>
                                    <tbody className="text-center">
                                          <tr>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.name}</td>
                                                <td>
                                                <Link to={`/edit/${item.id}`}>
                                                      <button className="bg-red-600 text-[#fff] w-[50px]">Edit</button>
                                                </Link>
                                                      <button className="bg-green-600 text-[#fff] w-[50px] " onClick={()=>dispatch(deleteProduct(item))}>Delete</button>
                                                </td>
                                          </tr>

                                    </tbody>
                              )
                        }
                  </table>
            </div>
      )
};

export default Product;