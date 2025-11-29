// Layout provides consistent page structure (header/footer and common meta)
// used to wrap pages so they share the same site chrome.
import Layout from '../../components/layout';

// Helpers for static generation: `getAllPostIds()` is used by
// `getStaticPaths` to list all post IDs, and `getPostData(id)` fetches and
// parses a single post's content/metadata (used in `getStaticProps`).
import { getAllIds, getData } from '../../lib/data';

// Next.js `Head` lets you modify the document <head> for the page
// (useful for setting the title, meta tags, etc.).
import Head from 'next/head';
 
export async function getStaticProps({ params }) {
  const itemData = await getData(params.id);
 // console.log
  return {
    props: {
      itemData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllIds();
  return {
    paths,
    fallback: false
  };
}

// Page component that renders a single blog post.
// Receives `postData` (title, date, contentHtml) from getStaticProps
// and displays the title, formatted date, and HTML content inside the
// shared site `Layout`.
export default function Entry({ itemData }) {
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
         <h5 className="card-title">{itemData.post_title}</h5>
         <h6 className="card-subtitle mb-2 text-muted">{itemData.user_login}</h6>
         <div className="card-text" dangerouslySetInnerHTML={{__html: itemData.post_content}} />
        </div>
      </article>
    </Layout>
  );
}