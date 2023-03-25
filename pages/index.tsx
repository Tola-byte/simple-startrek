/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable react/jsx-no-comment-textnodes */
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MainApp  from '../components/MainApp/MainApp'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Clayton Task</title>
        <meta name="description" content="Next App" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
       <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet"/>
      </Head>

      <div>
      <MainApp/>
      </div>

    
    </div>
  )
}

export default Home
