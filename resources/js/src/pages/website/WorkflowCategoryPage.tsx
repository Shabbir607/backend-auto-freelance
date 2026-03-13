import { useParams } from 'react-router-dom';
import WorkflowsPage from './WorkflowsPage';

export default function WorkflowCategoryPage() {
    const { slug } = useParams<{ slug: string }>();
    return <WorkflowsPage categorySlug={slug} />;
}
