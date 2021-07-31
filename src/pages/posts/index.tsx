import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom'

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';

type Post = {
  slug: string,
  title: string,
  excerpt: string,
  updatedAt: string
}
interface PostProps {
  posts: Post[]
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
          <title>Posts | My Ignews</title>
      </Head>

      <main className={styles.postsContainer}>
        <div className={styles.postsContent}>
          { posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          )) }
        </div>
      </main>
    </>  
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.predicates.at('document.type','post')
  ], {
    fetch: ['publication:title','publication:content'],
    pageSize: 10
  });

  //console.log('Posts api:', JSON.stringify(response, null, 2))

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return { 
    props: {
      posts
    },
 }
} 