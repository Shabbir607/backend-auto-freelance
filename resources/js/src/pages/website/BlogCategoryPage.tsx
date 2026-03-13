import { useParams } from 'react-router-dom';
import BlogPage from './BlogPage';

export default function BlogCategoryPage() {
    const { slug } = useParams<{ slug: string }>();
    return <BlogPage categorySlug={slug} />;
}
