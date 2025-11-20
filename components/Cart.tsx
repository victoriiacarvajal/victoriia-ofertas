
import React from 'react';
import { CartItem } from '../types';
import { formatPrice, parsePrice } from '../utils/formatters';
import { PlusIcon, MinusIcon, TrashIcon, CloseIcon } from './Icons';

interface CartProps {
    items: CartItem[];
    isOpen: boolean;
    onClose: () => void;
    onUpdateQuantity: (productId: string, newQuantity: number) => void;
    onRemoveItem: (productId: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, isOpen, onClose, onUpdateQuantity, onRemoveItem }) => {
    const total = items.reduce((sum, item) => sum + parsePrice(item.Precio_Catálogo) * item.quantity, 0);

    const generateWhatsAppLink = () => {
        // Reemplaza este número con el número de WhatsApp de tu negocio
        const whatsAppNumber = "573118200593"; 
        let message = "Hola, quisiera solicitar un pedido con los siguientes productos:\n\n";

        items.forEach(item => {
            const price = parsePrice(item.Precio_Catálogo);
            message += `*${item.Nombre}*\n`;
            message += `> Código: ${item.Código}\n`;
            message += `> Cantidad: ${item.quantity}\n`;
            message += `> Precio Unitario: ${formatPrice(price)}\n\n`;
        });
        
        message += `*TOTAL DEL PEDIDO: ${formatPrice(total)}*\n\n`;
        message += `¡Gracias!`;

        return `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            ></div>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-heading"
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 bg-red-700 text-white">
                        <h2 id="cart-heading" className="text-xl font-bold">Tu Pedido</h2>
                        <button onClick={onClose} aria-label="Cerrar pedido" className="text-white hover:text-red-200"><CloseIcon /></button>
                    </div>

                    {items.length === 0 ? (
                        <div className="flex-grow flex items-center justify-center">
                            <p className="text-gray-500">Tu pedido está vacío.</p>
                        </div>
                    ) : (
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {items.map(item => (
                                <div key={item.Código} className="flex items-start space-x-4">
                                    <img src={item.URL_Imagen_Carrito} alt={item.Nombre} className="w-20 h-20 object-contain border rounded-md" />
                                    <div className="flex-grow">
                                        <p className="text-sm font-semibold text-gray-800">{item.Nombre}</p>
                                        <p className="text-sm text-green-700 font-bold">{formatPrice(parsePrice(item.Precio_Catálogo))}</p>
                                        <div className="flex items-center mt-2">
                                            <button onClick={() => onUpdateQuantity(item.Código, item.quantity - 1)} aria-label={`Reducir cantidad de ${item.Nombre}`} className="p-1 border rounded-full text-gray-600 hover:bg-gray-100"><MinusIcon className="h-4 w-4" /></button>
                                            <span className="px-3 text-sm font-bold" aria-live="polite">{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(item.Código, item.quantity + 1)} aria-label={`Aumentar cantidad de ${item.Nombre}`} className="p-1 border rounded-full text-gray-600 hover:bg-gray-100"><PlusIcon className="h-4 w-4" /></button>
                                        </div>
                                    </div>
                                    <button onClick={() => onRemoveItem(item.Código)} aria-label={`Eliminar ${item.Nombre} del pedido`} className="text-red-500 hover:text-red-700"><TrashIcon /></button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-gray-800">Total:</span>
                            <span className="text-xl font-bold text-green-800">{formatPrice(total)}</span>
                        </div>
                        <a
                            href={items.length > 0 ? generateWhatsAppLink() : undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full flex items-center justify-center gap-2 text-center py-3 px-4 rounded-lg font-semibold transition-colors duration-300 ${items.length > 0 ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        >
                           <i className="fab fa-whatsapp text-xl"></i>
                            Finalizar y Enviar Pedido
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;