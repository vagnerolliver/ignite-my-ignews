import Head from 'next/head'

import styles from './home.module.scss';

export default function Home() {
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
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  )
}