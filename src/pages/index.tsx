import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  } 
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      
      <main className={styles.homeContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>News about the <span>React</span> world</h1>
          <p>
            Get access to the publications <br />
            <span>for $9,90 month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1JGKN7LDCRFNguZrflmZfTwz', {
    expand: ['product']
  })

  const product = {
    product: price.product, // informações do produto
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100,)
  }

  return { 
     props: {
      product
     }
  }
}