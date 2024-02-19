import { Helmet } from 'react-helmet-async';

interface MetaProps {
    title?: string;
    description?: string;
    keywords?: string;
}

function Meta({ title, description, keywords}: MetaProps) {

    
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content= {description}/>
        <meta name="keywords" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Welcome to Gebeya Tech Mart',
    description: 'We sell the best products for cheap',
    keywords: 'electronics, buy electronics, cheap electronics'
}

export default Meta