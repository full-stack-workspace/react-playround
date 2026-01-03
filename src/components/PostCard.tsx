import React from 'react';

interface PostCardProps {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

const PostCard: React.FC<PostCardProps> = ({ title, excerpt, date, tags }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>{date}</span>
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer">
        {title}
      </h2>
      <p className="text-gray-700 mb-4 line-clamp-3">{excerpt}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-full hover:bg-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
