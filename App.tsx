import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Product, CartItem } from './types';
import { products } from './constants/products';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { CartIcon } from './components/Icons';

const Snowfall: React.FC = () => (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" aria-hidden="true">
        {Array.from({ length: 50 }).map((_, i) => (
            <div
                key={i}
                className="snowflake"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 10 + 5}s`,
                    animationDelay: `${Math.random() * 5}s`,
                    fontSize: `${Math.random() * 10 + 10}px`,
                    opacity: Math.random() * 0.7 + 0.3,
                }}
            >
                ❅
            </div>
        ))}
    </div>
);

const Star: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <svg style={style} className="absolute text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);

const App: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    const [isCartAnimating, setIsCartAnimating] = useState(false);
    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsCategoriesExpanded(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const handleAddToCart = useCallback((product: Product, quantity: number) => {
        setCartItems(prevItems => {
            const itemInCart = prevItems.find(item => item.Código === product.Código);
            if (itemInCart) {
                return prevItems.map(item =>
                    item.Código === product.Código
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
        if (!isCartAnimating) {
            setIsCartAnimating(true);
            setTimeout(() => setIsCartAnimating(false), 820);
        }
    }, [isCartAnimating]);

    const handleUpdateQuantity = useCallback((productId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            handleRemoveFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.Código === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    }, []);

    const handleRemoveFromCart = useCallback((productId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.Código !== productId));
    }, []);

    const toggleCart = () => setIsCartOpen(prev => !prev);
    
    const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

    const categories = useMemo(() => ['Todos', ...Array.from(new Set(products.map(p => p.Categoría.replace(/^- /, '')))).sort()], []);

    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'Todos') {
            return products;
        }
        return products.filter(p => p.Categoría.replace(/^- /, '') === selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="min-h-screen bg-[#FFFBF2] font-sans">
            <div>
                <Snowfall />
                 <header className="sticky top-0 z-30 shadow-md bg-white/80 backdrop-blur-md">
                     <div className="h-2 bg-repeat-x" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='20' viewBox='0 0 40 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 L20 0 L40 10 L20 20 Z' fill='%23C53030'/%3E%3C/svg%3E")`}}/>
                     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                        <h1 className="text-2xl md:text-3xl font-display text-red-700 tracking-wider">Catálogo Navideño</h1>
                     </div>
                </header>
                
                <main className="container mx-auto p-4 md:p-8 relative z-10">
                    <div className="relative text-center mb-12 p-8 rounded-lg overflow-hidden bg-red-700">
                        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://images.unsplash.com/photo-1577997924545-21295dc3a105?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}></div>
                        <div className="relative">
                            <Star style={{ width: '20px', height: '20px', top: '20%', left: '15%' }} />
                            <Star style={{ width: '15px', height: '15px', top: '30%', left: '80%' }} />
                            <Star style={{ width: '25px', height: '25px', top: '70%', left: '10%' }} />
                            <Star style={{ width: '18px', height: '18px', top: '65%', left: '90%' }} />
                            <h2 className="text-5xl md:text-7xl font-display text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>CATÁLOGO</h2>
                            <h3 className="text-4xl md:text-6xl font-display text-green-300 italic" style={{ transform: 'rotate(-5deg)', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Navideño</h3>
                            <p className="text-3xl md:text-4xl font-display text-white mt-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>2030</p>
                        </div>
                    </div>

                    <div className="mb-8 sticky top-[68px] z-20 bg-[#FFFBF2]/90 backdrop-blur-md rounded-lg shadow-sm border border-gray-200">
                        <button
                            onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                            className="w-full flex justify-between items-center p-4 text-left font-display text-xl text-green-800"
                            aria-expanded={isCategoriesExpanded}
                            aria-controls="category-list"
                        >
                            <span>Filtrar por Categoría</span>
                            <i className={`fas fa-chevron-down transition-transform duration-300 ${isCategoriesExpanded ? 'rotate-180' : ''}`}></i>
                        </button>
                        <div
                            id="category-list"
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${isCategoriesExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="p-4 pt-0 flex flex-wrap justify-center gap-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                                            selectedCategory === category
                                                ? 'bg-red-600 text-white shadow-md'
                                                : 'bg-white text-gray-700 hover:bg-red-100 border border-red-200'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {selectedCategory === 'Todos' ? (
                        <div className="space-y-12">
                            {categories.filter(c => c !== 'Todos').map(category => (
                                <section key={category} className="mb-12">
                                    <h2 className="text-2xl font-display text-green-800 border-b-2 border-red-200 pb-2 mb-6 tracking-wide">{category}</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                        {products.filter(p => p.Categoría.replace(/^- /, '') === category).map(product => (
                                            <ProductCard key={product.Código} product={product} onAddToCart={handleAddToCart} />
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.Código} product={product} onAddToCart={handleAddToCart} />
                            ))}
                        </div>
                    )}
                </main>

                 <footer className="mt-12">
                     <div className="h-2 bg-repeat-x" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='20' viewBox='0 0 40 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 L20 0 L40 10 L20 20 Z' fill='%23C53030'/%3E%3C/svg%3E")`}}/>
                    <div className="bg-red-800 text-white py-6 text-center">
                        <p className="font-display text-xl tracking-wider">¡Felices Fiestas y Próspero Año Nuevo!</p>
                        <p className="text-sm text-red-200 mt-1">Tu Catálogo Navideño Corporativo</p>
                    </div>
                </footer>
            </div>

            <button
                onClick={toggleCart}
                className={`fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-transform duration-300 hover:scale-110 z-40 ${isCartAnimating ? 'shake' : ''}`}
                aria-label={`Abrir pedido, ${totalItemsInCart} items`}
            >
                <CartIcon className="h-8 w-8" />
                {totalItemsInCart > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                        {totalItemsInCart}
                    </span>
                )}
            </button>

            <Cart 
                items={cartItems} 
                isOpen={isCartOpen} 
                onClose={toggleCart} 
                onUpdateQuantity={handleUpdateQuantity} 
                onRemoveItem={handleRemoveFromCart}
            />
        </div>
    );
};

export default App;
