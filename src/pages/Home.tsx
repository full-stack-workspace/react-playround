import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';

// 将静态数据移到组件外部，避免每次渲染时重新创建
interface Post {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
}

const POSTS: Post[] = [
    {
        id: 'post-1',
        title: 'Getting Started with Rsbuild',
        excerpt: 'A comprehensive guide to building React applications with Rsbuild, featuring fast development and optimized production builds.',
        date: '2025-12-11',
        tags: ['Rsbuild', 'React', 'Webpack']
    },
    {
        id: 'post-2',
        title: 'Teek Theme Design Philosophy',
        excerpt: 'The minimalist design approach behind the Teek theme, focusing on readability and clean aesthetics.',
        date: '2025-12-10',
        tags: ['Design', 'Theme', 'Minimalism']
    },
    {
        id: 'post-3',
        title: 'Modern React Development Practices',
        excerpt: 'Best practices for building scalable and maintainable React applications in 2025.',
        date: '2025-12-09',
        tags: ['React', 'Best Practices', 'Development']
    }
];

const Home: React.FC = () => {

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <section className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Teek</h1>
                    <p className="text-lg text-gray-600 max-w-3xl">
                        A minimalist personal blog theme built with modern web technologies.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {POSTS.map(post => (
                        <PostCard key={post.id} {...post} />
                    ))}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
