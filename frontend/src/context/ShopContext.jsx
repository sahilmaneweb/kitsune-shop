import { createContext, useEffect, useState } from "react";
import productData from "../assets/productData";
import axios from "axios";
import toast from "react-hot-toast";
export const ShopContext = createContext();

export const ShopContextProvider = ({children}) => {

    const [order, setOrder] = useState([]);
    const [token, setToken] = useState(false);

    
    const [cart, setCart ] = useState({});
    const [itemLength, setItemLength] = useState(0);
    const [totalAmount, setTotalAmount ] = useState(0);


    async function loadCart(tat){
        const response = await axios.get('http://localhost:8080/cart/getCart',{headers: {"token" : tat}}).then((res) => res.data).catch((err)=> {console.log(err)});
        console.log(response);
        setCart(response.items);
    }
    async function loadOrder(token){
        if(token){
        const response = await axios.get('http://localhost:8080/order/userOrder',{headers : {token : token}}).then(res => res.data).catch(err => console.log(err));
        if(response.success){
          setOrder(response.data);
          console.log('working');
          console.log(response.data);
        }
        }
      }
    async function loadData(){
    let t = localStorage.getItem("authToken");
    console.log("t",t);
    if(t){
        setToken(t);
        await loadCart(t);
        await loadOrder(t);

    }
    }

    useEffect(()=>{
        
        loadData();
    },[]);

    useEffect(() => {
        let tempItem = 0;
        let tempTotal = 0;
        for(const items in cart){
            const product = productData.find((product) => product.id === items);
            for(const item in cart[items]){
              if(cart[items][item] > 0){
                tempItem += cart[items][item];
                tempTotal += cart[items][item] * product.newPrice;
              }
            }
        }
        tempTotal += 20;
        setItemLength(tempItem);
        setTotalAmount(tempTotal);

    }, [cart]);
    

    const addProduct = async(productId, size, quantity) => {
        // setCart((prev) => {
        //     const newCart = {...prev};

        //     if(!newCart[productId]){
        //         newCart[productId] = {};
        //     }        
        //     newCart[productId][size] = Math.min( quantity, 9 );
        //     return newCart;
        // });
        const data = {
            productId,
            size,
            quantity
        };
        const response = await axios.post('http://localhost:8080/cart/addToCart',data,{headers : {token}}).then((res) => res.data).catch(err => console.log(err));
        console.log(response);
        if(response.success){
            setCart(response.cart);
            toast.success(response.message);
        }else{
            console.log(response.message);
        }
    };


    const incrementProduct = async(productId, size, operation) => {

        // const newCart = {...cart};

        //     switch (operation) {
        //         case "increment":
        //             newCart[productId][size] = Math.min( newCart[productId][size] + 1, 9 );
        //             break;
                
        //         case "decrement" :
        //             newCart[productId][size] = Math.max(newCart[productId][size] - 1, 0);
        //             break;

        //         default:
        //             break;
        //     }

        //     if(newCart[productId][size] === 0){
        //         delete newCart[productId][size];

        //         if(Object.keys(newCart[productId]).length === 0){
        //             delete newCart[productId];
        //         }
        //     }
            
        // setCart(newCart);
        const data = {
            productId,
            size,
            operation
        };
        const response = await axios.post('http://localhost:8080/cart/incrementProduct',data,{headers : {token}}).then((res) => res.data).catch(err => console.log(err));
        if(response.success){
            setCart(response.cart);
        }else{
            console.log(response.message);
        }
        

    }

    const clearCart = async() => {
        const response = await axios.post('http://localhost:8080/cart/clearCart',{},{headers : {token : token}}).then((res) => res.data).catch(err => console.log(err));
        if(response.success){
            setCart(response.cart);
            toast.success(response.message);
        }else{
            console.log(response.message);
        }
    }

    const removeProduct = async (productId, size) => {
        // setCart((prev) => {
        //     const newCart = {...prev};

        //         delete newCart[productId][size];

        //         if(Object.keys(newCart[productId]).length === 0){
        //             delete newCart[productId];
        //         }

        //     return newCart;
        // });

        const data = {
            productId,
            size
        };
        const response = await axios.post('http://localhost:8080/cart/removeFromCart',data,{headers : {token}}).then((res) => res.data).catch(err => console.log(err));
        if(response.success){
            setCart(response.cart);
        }else{
            console.log(response.message);
        }

    };

    const values = {productData, order, setOrder, token, setToken ,itemLength, totalAmount ,cart, setCart , addProduct, incrementProduct ,removeProduct, clearCart};

    return(
        <ShopContext.Provider value={values}>
            {children}
        </ShopContext.Provider>
    )
}