// Layout provides consistent page structure (header/footer and common meta)
// used to wrap pages so they share the same site chrome.
import Layout from '../../components/layout';

// Helpers for static generation: `getAllPostIds()` is used by
// `getStaticPaths` to list all post IDs, and `getPostData(id)` fetches and
// parses a single post's content/metadata (used in `getStaticProps`).
import { getAllPostIds, getPostData } from '../../lib/posts';

// Next.js `Head` lets you modify the document <head> for the page
// (useful for setting the title, meta tags, etc.).
import Head from 'next/head';

// Small component that formats a date string and renders it for display
// (used to show the post's published date).
import Date from '../../components/date';

// Utility CSS module styles for common layout and typographic styles
import utilStyles from '../../styles/utils.module.css';
 
export async function getStaticProps({ params }) {

  // `getPostData()` is async, so it returns a Promise that needs to be awaited.
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);
 
  return {
    props: {
      postData,
    },
  };
}

// Page component that renders a single blog post.
// Receives `postData` (title, date, contentHtml) from getStaticProps
// and displays the title, formatted date, and HTML content inside the
// shared site `Layout`.
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// `getStaticPaths` tells Next.js which dynamic routes to pre-render
// based on the data returned by `getAllPostIds()`.

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}