/**
 * @file 购物车页面
 */

import React, { useCallback, useState, useMemo } from 'react';

import type { ProductItem } from './interface';
import { Category } from './interface';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SearchBar } from './SearchBar';
import { ProductList } from './ProductList';

export interface SearchInfo {
    searchText: string;
    onlyShowInStock: boolean;
};

const allShoppingCartProducts: ProductItem[] = [
    // 新鲜水果 (FreshFruit)
    {
        id: '001',
        name: 'Apple',
        category: Category.FreshFruit,
        price: 8.5,
        stock: 100,
        description: 'Fresh red apples from Fuji'
    },
    {
        id: '002',
        name: 'Orange',
        category: Category.FreshFruit,
        price: 6.0,
        stock: 0,
        description: 'Sweet navel oranges'
    },
    {
        id: '003',
        name: 'Banana',
        category: Category.FreshFruit,
        price: 4.5,
        stock: 120,
        description: 'Organic bananas'
    },
    // 肉禽蛋 (MeatEggs)
    {
        id: '004',
        name: 'Chicken Breast',
        category: Category.MeatEggs,
        price: 25.0,
        stock: 50,
        description: 'Boneless chicken breast'
    },
    {
        id: '005',
        name: 'Eggs (12 pack)',
        category: Category.MeatEggs,
        price: 15.0,
        stock: 200,
        description: 'Farm fresh eggs'
    },
    {
        id: '006',
        name: 'Pork Loin',
        category: Category.MeatEggs,
        price: 35.0,
        stock: 40,
        description: 'Lean pork loin chops'
    },
    // 蔬菜 (Vegetables)
    {
        id: '007',
        name: 'Broccoli',
        category: Category.Vegetables,
        price: 7.0,
        stock: 60,
        description: 'Fresh green broccoli'
    },
    {
        id: '008',
        name: 'Carrots',
        category: Category.Vegetables,
        price: 3.5,
        stock: 150,
        description: 'Organic carrots'
    },
    {
        id: '009',
        name: 'Tomatoes',
        category: Category.Vegetables,
        price: 5.0,
        stock: 90,
        description: 'Ripe red tomatoes'
    },
    // 其他 (Others)
    {
        id: '010',
        name: 'Milk',
        category: Category.Others,
        price: 12.0,
        stock: 100,
        description: 'Fresh whole milk'
    },
    {
        id: '011',
        name: 'Bread',
        category: Category.Others,
        price: 8.0,
        stock: 70,
        description: 'Whole wheat bread'
    },
    {
        id: '012',
        name: 'Rice',
        category: Category.Others,
        price: 15.0,
        stock: 200,
        description: 'Premium jasmine rice'
    }
];

export const ShoppingCart: React.FC = () => {
    const [searchInfo, setSearchInfo] = useState<SearchInfo>({
        searchText: '',
        onlyShowInStock: false
    });
    console.log('state:', searchInfo);

    // 使用 useMemo 缓存过滤后的商品列表
    // useMemo 的作用：
    // 1. 避免在每次渲染时都进行过滤操作，提高性能
    // 2. 只有当 searchInfo 发生变化时，才会重新计算过滤后的商品列表
    const filteredProducts = useMemo(() => {
        return allShoppingCartProducts.filter((product: ProductItem) => {
            const nameMatch = product.name.toLowerCase().includes(searchInfo.searchText.toLowerCase());
            const stockMatch = searchInfo.onlyShowInStock ? product.stock > 0 : true;
            return nameMatch && stockMatch;
        });
    }, [searchInfo]);

    const onSearch = useCallback((value: SearchInfo) => {
        console.log('onSearch in ShoppingCart', value);
        setSearchInfo(value);
    }, [searchInfo]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">购物车</h3>
                <SearchBar
                    placeholder="搜索商品"
                    searchInfo={searchInfo}
                    onSearch={onSearch}
                />
                <div className="mt-8">
                    <ProductList products={filteredProducts} />
                </div>
            </main>
            <Footer />
        </div>
    );
}