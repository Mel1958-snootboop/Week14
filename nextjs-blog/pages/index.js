//They bring in components and styles needed to build and style the homepage.
 import Head from 'next/head';

// Imports the Layout component for consistent page structure and the siteTitle variable for setting the page title.
 import Layout, { siteTitle } from '../components/layout';

 import { getSortedList } from '../lib/data/vaporwave/products';

 import Link from "next/link";
 
// Runs at build time to fetch data needed to pre-render this page.
// Calls `getSortedPostsData()` to read and sort post metadata and
// returns the posts as `allPostsData` inside `props` for the page component.
export async function getStaticProps() {
  const allData = await getSortedList();
  return {
    props: {
      allData
    }
  }
}
//It creates and styles the homepage, showing an introduction and a tutorial link.
export default function Home({ allData }) {
  return (

    <Layout home>
        <Head>
        <title>{siteTitle}</title>
        <title>{siteTitle}</title>
        <title>{siteTitle}</title>
      </Head>
        <h1>List of Contacs</h1>
        <h2>List of Products</h2>
        <h3>List of Vaporwave</h3>
        <div className="list-group">
            {allData.map(({ id, name }) => (
                <Link key={id} href={`/${id}`} 
                className="list-group-item list-group-item-action">
                {name} </Link>
            ))}
            
        </div>
    </Layout>
  );
}