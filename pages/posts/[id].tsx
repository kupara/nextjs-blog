import Head from 'next/head';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

import Date from '../../components/date';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData, PostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

interface Props {
  postData: PostData;
}

export default function Post({ postData }: Props) {
  return (
    <Layout home={false}>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params: {id} }) => {
  const postData = await getPostData(id);
  return {
    props: {
      postData,
    },
  };
}