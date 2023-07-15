import {useQueryClient, useQuery, useMutation} from "@tanstack/react-query";
import { useAuthContext } from '../contexts/AuthContext';
import { addOrUpdateToCart, deleteFromCart, getCart } from '../api/firebase';

export function useCart() {
    const queryClient = useQueryClient();
    const {uid} = useAuthContext();

    const cartQuery = useQuery(["carts",uid],()=>getCart(uid),{staleTime:1000 * 60 * 3, enabled: !!uid});

    const updateCart = useMutation((product)=>{addOrUpdateToCart(uid,product)},{onSuccess: () => queryClient.invalidateQueries(["carts",uid])});

    const removeCart = useMutation((productId)=>{deleteFromCart(uid,productId)},{onSuccess: () => queryClient.invalidateQueries(["carts",uid])});

    return({uid, cartQuery, updateCart, removeCart});
}