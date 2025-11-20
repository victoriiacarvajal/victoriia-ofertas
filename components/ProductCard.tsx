
import React, { useState } from 'react';
import { Product } from '../types';
import { formatPrice, parsePrice } from '../utils/formatters';
import { PlusIcon, MinusIcon } from './Icons';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const price = parsePrice(product.Precio_Catálogo);

    const handleQuantityChange = (amount: number) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        } else if (e.target.value === '') {
            setQuantity(1);
        }
    };


    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_10px_20px_rgba(220,38,38,0.25)]">
            <div className="relative pb-[100%]">
                <img
                    className="absolute h-full w-full object-contain p-2"
                    src={product.URL_Imagen_Alta_Res}
                    alt={product.Nombre}
                    loading="lazy"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-sm font-semibold text-gray-800 flex-grow" title={product.Nombre}>{product.Nombre}</h3>
                <p className="text-xs text-gray-500 mt-1">{product.Marca}</p>
                 <p className="text-lg font-bold text-green-700 my-2">{formatPrice(price)}</p>
                <div className="mt-auto flex flex-col gap-3">
                     <div className="flex items-center justify-center space-x-2">
                        <button onClick={() => handleQuantityChange(-1)} className="p-2 border rounded-full text-gray-600 hover:bg-gray-200 transition-colors"><MinusIcon className="h-4 w-4" /></button>
                        <input type="number" value={quantity} onChange={handleInputChange} className="w-12 text-center font-bold text-lg border-x-0 border-t-0 border-b-2 border-gray-300 focus:ring-0 focus:border-red-500"/>
                        <button onClick={() => handleQuantityChange(1)} className="p-2 border rounded-full text-gray-600 hover:bg-gray-200 transition-colors"><PlusIcon className="h-4 w-4" /></button>
                    </div>
                    <button
                        onClick={() => onAddToCart(product, quantity)}
                        className="w-full bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Agregar al pedido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;