"use client"

import { useState } from 'react';
import { X, Minus, Plus, TrashIcon, Trash2Icon } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { formatPrice } from '@/lib/utils';
// import type { Product } from '@/lib/data';
import { deleteCartitemsApi, updateCartitemsApi } from '@/api-endpoints/CartsApi';
import { InvalidateQueryFilters, useQueryClient } from '@tanstack/react-query';
import { formatPrice } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
// import { toast } from 'sonner';

interface CartItemProps {
  // product: Product;
  product: any;
  quantity: number;
}

export default function CartItem({ product, quantity: initialQuantity }: CartItemProps) {
  const queryClient = useQueryClient();
  const { convertPrice } = useCurrency();

  const handleUpdateCart = async (id: any, type: any, qty: any) => {
    try {
      if (qty === 1) {
        const updateApi = await deleteCartitemsApi(`${id}`)
        if (updateApi) {
          toast.success('Product removed!')
          queryClient.invalidateQueries(['getCartitemsData'] as InvalidateQueryFilters);
        }
      } else {
        const response = await updateCartitemsApi(`${id}/${type}/`)
        if (response) {
          toast.success('Product updated in cart!')
          queryClient.invalidateQueries(['getCartitemsData'] as InvalidateQueryFilters);
        }
      }

    } catch (error) {

    }
  }
  const handleRemoveItem = async (id: any) => {
    try {
      const updateApi = await deleteCartitemsApi(`${id}`)
      toast.success('Product removed!')
      if (updateApi) {
        queryClient.invalidateQueries(['getCartitemsData'] as InvalidateQueryFilters);
      }
    } catch (error: any) {
      // toast.error(error?.response?.data?.error)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
      <div className="w-full sm:w-24 h-24 bg-white rounded-md overflow-hidden flex-shrink-0">

        <Image
          src={
            product?.image_urls?.[0] ||
            product?.product_variant_image_urls?.[0] ||
            "https://semantic-ui.com/images/wireframe/image.png"
          }
          alt={product.name}
          className="w-full h-full object-cover"
          width={100}
          height={100}
        />
        {/* <img
          src={
            product?.image_urls?.[0] ||
            product?.product_variant_image_urls?.[0] ||
            "https://semantic-ui.com/images/wireframe/image.png"
          }
          alt={product.name}
          className="w-full h-full object-cover"
          width={100}
          height={100}
        /> */}


      </div>

      <div className="flex-grow">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold"> {product?.name || product?.product_variant_title || product?.product_size || ''}</h3>
            <p className="text-sm font-bold text-muted-foreground py-1">
              Price: {convertPrice(Number(product?.price))}
            </p>
            {/* {product.variants && product.variants.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Price: {product.variants[0].size}
              </p>
            )} */}
          </div>

          <button className="h-8 w-8 text-muted-foreground"
            onClick={() => handleRemoveItem(product?.cartId)}
          >
            <Trash2Icon className="h-4 w-4 hover:text-red-500" />
          </button>
        </div>

        <div className="flex justify-between items-end mt-2">
          <div className="flex items-center border-2 border-border rounded-md">
            <button
              className="h-8 w-8 rounded-r-none pl-2"
              onClick={() => handleUpdateCart(product?.cartId, 'decrease', product?.cartQty)}
            // disabled={product?.cartQty <= 1}
            >
              <Minus className="h-3 w-3" />
            </button>

            <div className="w-10 text-center text-sm font-medium  border-x-2">
              {product?.cartQty}
            </div>

            <button
              className="h-8 w-8 rounded-l-none pl-2"
              onClick={() => handleUpdateCart(product?.cartId, 'increase', '')}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <div className="font-semibold">

            <div className="font-semibold">
              {convertPrice(Number(product?.price))} X {product?.cartQty}
            </div>

            {convertPrice(Number(product?.price * product?.cartQty))}
          </div>
        </div>
      </div>
    </div>
  );
}