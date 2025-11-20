export interface Product {
    Nombre: string;
    Código: string;
    Cantidad: number;
    Marca: string;
    Precio_Catálogo: string;
    URL_Imagen_Alta_Res: string;
    URL_Imagen_Carrito: string;
    Categoría: string;
    // FIX: Add missing properties to match the product data.
    Tipo_Producto: string;
    Agotado: string;
    URL_Página: string;
}

export interface CartItem extends Product {
    quantity: number;
}
