import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
      value: [],
      item: { name: "" },
      loading: false
};

export const fetchProduct = createAsyncThunk('product/fetchProduct', async (id) => {
      const response = await fetch('https://641c0fe79b82ded29d5f1a7e.mockapi.io/name/' + id)
      const data = await response.json()
      return data
});

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
      const response = await fetch('https://641c0fe79b82ded29d5f1a7e.mockapi.io/name')
      const data = await response.json()
      return data
});
export const createProduct = createAsyncThunk(
      'product/create',
      async (product, { dispatch }) => {
            const requestOptions = {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify(product)
            };
            const response = await fetch('https://641c0fe79b82ded29d5f1a7e.mockapi.io/name/', requestOptions).then(
                  (data) => data.json()
            )
            const data = response
            return data;
      }
)
// export const updateProduct = createAsyncThunk('product/update', async (product) => {
//       const response = await fetch('https://641c0fe79b82ded29d5f1a7e.mockapi.io/name/' + product.id, {
//             method: "PUT",
//             headers: {
//                   "Content-Type": "application/json"
//             },
//             body: JSON.stringify(product)
//       })
//       const data = await response.json()
//       return data
// });
export const updateProduct = createAsyncThunk(
      'product/update',
      async (product, { dispatch }) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        };
        const response =  await fetch('https://641c0fe79b82ded29d5f1a7e.mockapi.io/name/' + product.id,requestOptions).then(
            (data) => data.json()
        )
        const data = response
            return data;
       }
    )
     
    
export const deleteProduct = createAsyncThunk(
      'product/delete',
      async (product, { dispatch }) => {
            const requestOptions = {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(product)
            };
            const response = await fetch('https://641c0fe79b82ded29d5f1a7e.mockapi.io/name/' + product.id, requestOptions).then(
                  (data) => data.json()
            )
            const data = response
            return data;
      }
)

const productSlice = createSlice({
      name: "product",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
            // Fetch
            builder.addCase(fetchProducts.pending, (state) => {
                  state.loading = true
            })
            builder.addCase(fetchProducts.fulfilled, (state, action) => {
                  state.value = action.payload
                  state.loading = false;
            })

            // Add
            builder.addCase(createProduct.fulfilled, (state, action) => {
                  state.value.push(action.payload)
                  state.loading = false;
            })
            // Get
            builder.addCase(fetchProduct.fulfilled, (state, action) => {
                  state.item = action.payload
                  state.loading = false;
            })
            // Update
            builder.addCase(updateProduct.fulfilled, (state, action) => {
                  state.value = state.value.map(item => item.id === action.payload.id ? action.payload : item)
                  state.loading = false;
            })

          
            //Delete
            builder.addCase(deleteProduct.fulfilled, (state, action) => {
                  const index = state.value.findIndex(product => product.id === action.payload);
                  state.value.splice(index, 1);
            })
      }
});

export default productSlice.reducer;