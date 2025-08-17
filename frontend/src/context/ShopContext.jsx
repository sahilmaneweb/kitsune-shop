import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import CustomCartToast from "../components/CustomCartToast";

const ShopContext = createContext();

export const useShopContext = () => useContext(ShopContext);

export const ShopContextProvider = ({ children }) => {
    // Authentication States
    const [userToken, setUserToken] = useState(localStorage.getItem('kitsuneUserToken') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Cart States
    const [cartItems, setCartItems] = useState(null);
    const [itemLength, setItemLength] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    // Order States
    const [userOrders, setUserOrders] = useState(null);

    // --- Helper function to recalculate cart totals ---
    const recalculateTotals = (items) => {
        if (!items || !Array.isArray(items)) {
            setItemLength(0);
            setTotalAmount(0);
            return;
        }
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const total = items.reduce((sum, item) => sum + (item.productId.offerPrice * item.quantity), 0);
        setItemLength(totalItems);
        setTotalAmount(total);
    };

    // --- Authentication Functions ---
    const login = async (email, password) => {
        try {
            const response = await api.post('/user/loginUser', { email, password });
            if (response.data.success) {
                const { token } = response.data;
                localStorage.setItem('kitsuneUserToken', token);
                setUserToken(token);
                setIsAuthenticated(true);
            } else {
                toast.error(response.data.message);
            }
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed.');
        }
    };

    const logout = () => {
        localStorage.removeItem('kitsuneUserToken');
        setUserToken(null);
        setIsAuthenticated(false);
        setCartItems(null);
        setItemLength(0);
        setTotalAmount(0);
        setUserOrders(null);
        toast.success('Logged out successfully.');
    };

    const verifyUser = async () => {
        const token = localStorage.getItem('kitsuneUserToken');
        if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }
        console.log("Verifying user with token:", token);
        try {
            await api.get('/user/verifyUser');
            setUserToken(token);
            setIsAuthenticated(true);
            await loadCart();
            await loadUserOrders();
        } catch (error) {
            localStorage.removeItem('kitsuneUserToken');
            setUserToken(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    // --- Cart Functions ---
  // --- Cart Functions ---

const loadCart = async () => {
  if (!userToken) return;
  try {
    const response = await api.get('/cart/getCart');
    if (response.data.success) {
      setCartItems(response.data.items);
    }
  } catch (error) {
    console.error('Failed to load cart:', error);
  }
};

const addToCart = async (productId, size, quantity) => {
    if (!isAuthenticated) {
        toast.error("Please log in to add items to your cart.");
        return;
    }
    const data = { productId, size, quantity };
    try {
        const response = await api.post('/cart/addToCart', data);
        if (response.data.success) {
            const updatedItem = response.data.item;
            setCartItems(prevItems => {
                if (!prevItems) return [updatedItem];
                const existingItemIndex = prevItems.findIndex(item => item.productId._id === updatedItem.productId._id && item.size === updatedItem.size);
                if (existingItemIndex !== -1) {
                    const newItems = [...prevItems];
                    newItems[existingItemIndex] = updatedItem;
                    return newItems;
                }
                return [...prevItems, updatedItem];
            });
            
            // Show custom toast with product details
            toast.custom((t) => (
                <CustomCartToast 
                    productName={updatedItem.productId.name} 
                    productImage={updatedItem.productId.productUrl} 
                    message="Added to cart successfully!" 
                    t={t} 
                />
            ));

        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        toast.error('Failed to add product.');
    }
};
const updateCartQuantity = async (productId, size, operation) => {
  if (!isAuthenticated) return;
  const data = { productId, size, operation };
  try {
    const response = await api.patch('/cart/updateCartQuantity', data);
    if (response.data.success) {
      const updatedItem = response.data.item;
      if (updatedItem) {
        setCartItems(prevItems =>
          prevItems.map(item =>
            (item.productId._id === productId && item.size === size) ? updatedItem : item
          )
        );
      } else {
        setCartItems(prevItems =>
          prevItems.filter(item =>
            !(item.productId._id === productId && item.size === size)
          )
        );
        toast.success("Item removed from cart.");
      }
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error('Failed to update quantity.');
  }
};

const removeFromCart = async (productId, size) => {
  if (!isAuthenticated) return;
  try {
    const response = await api.delete('/cart/removeFromCart', { data: { productId, size } });
    if (response.data.success) {
      setCartItems(prevItems => prevItems.filter(item => !(item.productId._id === productId && item.size === size)));
      toast.success("Product removed from cart.");
    } else {
      toast.error("Failed to remove product.");
    }
  } catch (error) {
    toast.error('Failed to remove product.');
  }
};

const clearCart = async() => {
  if (!isAuthenticated) return;
  try {
    const response = await api.delete('/cart/clearCart');
    if(response.data.success){
      setCartItems([]);
      toast.success(response.data.message);
    }else{
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error('Failed to clear cart.');
  }
}
    // --- Order Functions ---
    const loadUserOrders = async () => {
        if (!userToken) return;
        try {
            const response = await api.get('/order/getOrders');
            if (response.data.success) {
                setUserOrders(response.data.data);
            }
        } catch (error) {
            console.error('Failed to load orders:', error);
        }
    };

    const addOrder = async (orderData) => {
        if (!isAuthenticated || cartItems.length === 0) return;
        try {
            const response = await api.post('/order/addOrder', orderData);
            if (response.data.success) {
                setUserOrders(prevOrders => [response.data.order, ...prevOrders]);
                setCartItems([]);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to place order.');
        }
    };

    // --- UseEffects for initial load and state updates ---
    useEffect(() => {
        
        verifyUser();
    }, []);

    useEffect(() => {
        if (cartItems) {
            recalculateTotals(cartItems);
        }
    }, [cartItems]);

    const values = {
        userToken, isAuthenticated, loading, cartItems, itemLength, totalAmount, userOrders,
        login, logout, loadCart, addToCart, updateCartQuantity, removeFromCart, clearCart, loadUserOrders, addOrder
    };

    return (
        <ShopContext.Provider value={values}>
            {children}
        </ShopContext.Provider>
    );
};